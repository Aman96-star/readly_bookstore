'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCurrentUser, getUserProfile } from '@/lib/auth-actions';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
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
        setUserProfile(profile);

        // Fetch stats
        const supabase = createClient();

        const { count: booksCount } = await supabase
          .from('books')
          .select('*', { count: 'exact', head: true });

        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });

        const { count: usersCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalBooks: booksCount || 0,
          totalOrders: ordersCount || 0,
          totalUsers: usersCount || 0,
        });
      } catch (error) {
        console.error('Admin check error:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Admin Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-muted-foreground text-sm font-semibold mb-2">Total Books</h3>
              <p className="text-4xl font-bold text-primary">{stats.totalBooks}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-muted-foreground text-sm font-semibold mb-2">Total Orders</h3>
              <p className="text-4xl font-bold text-primary">{stats.totalOrders}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-muted-foreground text-sm font-semibold mb-2">Total Users</h3>
              <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/books"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition group"
            >
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition mb-2">
                Manage Books
              </h2>
              <p className="text-muted-foreground">Add, edit, and delete books from the catalog</p>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition group"
            >
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition mb-2">
                Manage Orders
              </h2>
              <p className="text-muted-foreground">View and update order statuses</p>
            </Link>

            <Link
              href="/admin/categories"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition group"
            >
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition mb-2">
                Manage Categories
              </h2>
              <p className="text-muted-foreground">Create and organize book categories</p>
            </Link>

            <Link
              href="/admin/users"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition group"
            >
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition mb-2">
                Manage Users
              </h2>
              <p className="text-muted-foreground">View and manage user accounts</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
