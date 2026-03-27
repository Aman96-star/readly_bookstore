'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth-actions';
import Header from '@/components/Header';

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        setUser(authUser);

        const supabase = createClient();
        const { data } = await supabase
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

        if (data) {
          setCartItems(data as any);
          const sum = (data as any).reduce(
            (acc: number, item: any) => acc + item.book.price * item.quantity,
            0
          );
          setTotal(sum);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [router]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw new Error(orderError.message);

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        book_id: item.book_id,
        quantity: item.quantity,
        price: item.book.price,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

      if (itemsError) throw new Error(itemsError.message);

      // Clear cart
      const { error: clearError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearError) throw new Error(clearError.message);

      router.push(`/orders?message=Order placed successfully!`);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {loading ? 'Processing...' : 'Complete Order'}
              </button>
            </form>

            <div className="bg-card border border-border rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-foreground">
                    <span>
                      {item.book.title} x {item.quantity}
                    </span>
                    <span>${(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-bold text-foreground mb-2">
                  <span>Total:</span>
                  <span className="text-primary text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
