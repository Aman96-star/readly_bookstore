'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCurrentUser, getUserProfile } from '@/lib/auth-actions';
import Header from '@/components/Header';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        const profile = await getUserProfile();
        if (profile?.role !== 'admin') {
          router.push('/');
          return;
        }

        setUser(authUser);

        // Fetch orders
        const supabase = createClient();
        const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (data) setOrders(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);

    if (!error) {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Manage Orders</h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-semibold">Order ID</th>
                  <th className="text-left p-4 text-foreground font-semibold">Customer</th>
                  <th className="text-left p-4 text-foreground font-semibold">Amount</th>
                  <th className="text-left p-4 text-foreground font-semibold">Status</th>
                  <th className="text-left p-4 text-foreground font-semibold">Date</th>
                  <th className="text-left p-4 text-foreground font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted">
                    <td className="p-4 text-foreground">{order.id.slice(0, 8)}</td>
                    <td className="p-4 text-foreground">User #{order.user_id.slice(0, 8)}</td>
                    <td className="p-4 text-foreground">${order.total_amount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-2 py-1 border border-input rounded bg-background text-foreground text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
