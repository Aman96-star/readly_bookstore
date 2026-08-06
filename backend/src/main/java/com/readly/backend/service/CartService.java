package com.readly.backend.service;

import com.readly.backend.dto.request.CartItemRequest;
import com.readly.backend.dto.request.CartRequest;
import com.readly.backend.dto.response.CartResponse;
import com.readly.backend.entity.Book;
import com.readly.backend.entity.Cart;
import com.readly.backend.entity.CartItem;
import com.readly.backend.entity.User;
import com.readly.backend.exception.BadRequestException;
import com.readly.backend.exception.ResourceNotFoundException;
import com.readly.backend.repository.BookRepository;
import com.readly.backend.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ============================================================================
 * CartService — business logic behind /api/cart/*.
 * ============================================================================
 * Design choice: each User has exactly ONE server-side Cart (created lazily
 * on first use). "Saving the cart" (POST /api/cart) means: replace its
 * contents with whatever the frontend's local store/store.tsx currently
 * holds — this is how a guest's cart gets synced up once they log in.
 * ============================================================================
 */
@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;

    /** Fetches the current user's cart, creating an empty one if it doesn't exist yet. */
    @Transactional
    public Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
    }

    /** GET /api/cart — returns the current user's cart contents. */
    public CartResponse getCart(User user) {
        Cart cart = getOrCreateCart(user);
        return CartResponse.fromEntity(cart);
    }

    /**
     * POST /api/cart — replaces the entire cart with the given items
     * (this is the "save server-side cart" flow described in the spec).
     */
    @Transactional
    public CartResponse saveCart(User user, CartRequest request) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().clear(); // orphanRemoval=true means these rows get deleted on save

        for (CartItemRequest itemReq : request.getItems()) {
            cart.getItems().add(buildCartItem(cart, itemReq));
        }

        return CartResponse.fromEntity(cartRepository.save(cart));
    }

    /** PUT /api/cart/:cartId — updates quantities (also replaces the item list, same as save). */
    @Transactional
    public CartResponse updateCart(User user, Long cartId, CartRequest request) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

        assertOwnership(cart, user);

        cart.getItems().clear();
        for (CartItemRequest itemReq : request.getItems()) {
            cart.getItems().add(buildCartItem(cart, itemReq));
        }

        return CartResponse.fromEntity(cartRepository.save(cart));
    }

    /** DELETE /api/cart/:cartId/items/:itemId — removes a single line item. */
    @Transactional
    public CartResponse deleteItem(User user, Long cartId, Long itemId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

        assertOwnership(cart, user);

        boolean removed = cart.getItems().removeIf(item -> item.getId().equals(itemId));
        if (!removed) {
            throw new ResourceNotFoundException("Cart item not found with id: " + itemId);
        }

        return CartResponse.fromEntity(cartRepository.save(cart));
    }

    private CartItem buildCartItem(Cart cart, CartItemRequest itemReq) {
        Book book = bookRepository.findById(itemReq.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + itemReq.getBookId()));

        if (itemReq.getQty() > book.getStock()) {
            throw new BadRequestException("Only " + book.getStock() + " unit(s) of \"" + book.getTitle() + "\" in stock");
        }

        return CartItem.builder()
                .cart(cart)
                .book(book)
                .qty(itemReq.getQty())
                .priceAtAdd(book.getPrice())
                .build();
    }

    /** Security check: a user may only touch their own cart, never someone else's by guessing an id. */
    private void assertOwnership(Cart cart, User user) {
        if (!cart.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Cart not found");
        }
    }
}
