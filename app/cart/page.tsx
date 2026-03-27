'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth-actions';
import Header from '@/components/Header';

interface CartItem {
  id: string;
  book_id: string;
  quantity: number;
  book: {
    id: string;
    title: string;
    price: number;
    author: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        setUser(authUser);

        const supabase = createClient();
        const { data, error } = await supabase
          .from('cart_items')
          .select(
            `
            id,
            book_id,
            quantity,
            book:books(id, title, price, author)
          `
          )
          .eq('user_id', authUser.id);

        if (!error && data) {
          setCartItems(data as any);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const updateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartId);
      return;
    }

    const supabase = createClient();
    await supabase.from('cart_items').update({ quantity: newQuantity }).eq('id', cartId);

    setCartItems(
      cartItems.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (cartId: string) => {
    const supabase = createClient();
    await supabase.from('cart_items').delete().eq('id', cartId);

    setCartItems(cartItems.filter((item) => item.id !== cartId));
  };

  const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

          {loading ? (
            <div className="text-muted-foreground">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
              <Link href="/books" className="text-primary hover:underline font-semibold">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.book.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.book.author}</p>
                      <p className="text-primary font-bold mt-2">${item.book.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-muted hover:bg-muted/80 rounded text-foreground"
                      >
                        -
                      </button>
                      <span className="px-3 text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-muted hover:bg-muted/80 rounded text-foreground"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-6 h-fit">
                <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/books"
                  className="block text-center mt-4 text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
