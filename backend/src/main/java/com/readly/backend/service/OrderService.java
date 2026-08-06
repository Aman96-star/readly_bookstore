package com.readly.backend.service;

import com.readly.backend.dto.request.CartItemRequest;
import com.readly.backend.dto.request.CheckoutRequest;
import com.readly.backend.dto.response.CheckoutResponse;
import com.readly.backend.dto.response.OrderResponse;
import com.readly.backend.entity.*;
import com.readly.backend.entity.embeddable.Address;
import com.readly.backend.entity.embeddable.PaymentInfo;
import com.readly.backend.exception.BadRequestException;
import com.readly.backend.exception.ResourceNotFoundException;
import com.readly.backend.repository.BookRepository;
import com.readly.backend.repository.CartRepository;
import com.readly.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ============================================================================
 * OrderService — business logic behind /api/orders/*.
 * ============================================================================
 * checkout() is the most important transaction in the whole app: it
 *   1) validates every book in the cart still has enough stock,
 *   2) snapshots each item's price into OrderItem (protects order history
 *      from future price changes),
 *   3) decrements Book.stock,
 *   4) creates the Order with billing/shipping/payment embedded,
 *   5) clears the user's server-side cart.
 * All of this happens inside one @Transactional method — if anything fails
 * partway through, the whole thing rolls back (no half-placed orders, no
 * stock silently vanishing).
 * ============================================================================
 */
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final CartRepository cartRepository;

    @Transactional
    public CheckoutResponse checkout(User user, CheckoutRequest request) {
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        // Step 1 + 2: validate stock and build snapshot line items.
        for (CartItemRequest itemReq : request.getCartItems()) {
            Book book = bookRepository.findById(itemReq.getBookId())
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + itemReq.getBookId()));

            if (book.getStock() < itemReq.getQty()) {
                throw new BadRequestException("Insufficient stock for \"" + book.getTitle() + "\" (only " + book.getStock() + " left)");
            }

            // Step 3: decrement stock now, inside the same transaction.
            book.setStock(book.getStock() - itemReq.getQty());
            bookRepository.save(book);

            BigDecimal lineTotal = book.getPrice().multiply(BigDecimal.valueOf(itemReq.getQty()));
            total = total.add(lineTotal);

            orderItems.add(OrderItem.builder()
                    .book(book)
                    .qty(itemReq.getQty())
                    .price(book.getPrice())
                    .build());
        }

        // Step 4: build and persist the order.
        Order order = Order.builder()
                .user(user)
                .billing(toAddress(request.getBillingInfo()))
                .shipping(toAddress(request.getShippingInfo()))
                .payment(PaymentInfo.builder().method(request.getPaymentMethod()).transactionId(null).build())
                .totalAmount(total)
                .status(OrderStatus.PENDING)
                .build();

        // Link each item back to its parent order before saving (JPA needs both sides set).
        orderItems.forEach(oi -> oi.setOrder(order));
        order.setItems(orderItems);

        Order saved = orderRepository.save(order);

        // Step 5: clear the user's server-side cart now that checkout succeeded.
        cartRepository.findByUser(user).ifPresent(cart -> {
            cart.getItems().clear();
            cartRepository.save(cart);
        });

        return CheckoutResponse.builder()
                .orderId(saved.getId())
                .status(saved.getStatus().name())
                // No external payment gateway wired up — integrate one (Razorpay/
                // Stripe/PayPal) here and return its redirect URL instead of null.
                .paymentUrl(null)
                .build();
    }

    public OrderResponse getOrderById(User user, Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        // Non-admins may only view their own orders.
        if (user.getRole() != Role.ADMIN && !order.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Order not found with id: " + id);
        }

        return OrderResponse.fromEntity(order);
    }

    public List<OrderResponse> getOrderHistory(User user) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    private Address toAddress(com.readly.backend.dto.request.AddressRequest req) {
        return Address.builder()
                .name(req.getName())
                .addressLine(req.getAddressLine())
                .city(req.getCity())
                .zip(req.getZip())
                .country(req.getCountry())
                .build();
    }
}
