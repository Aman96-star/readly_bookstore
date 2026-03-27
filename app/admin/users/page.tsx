'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCurrentUser, getUserProfile } from '@/lib/auth-actions';
import Header from '@/components/Header';

export default function AdminUsersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
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

        const supabase = createClient();
        const { data } = await supabase.from('users').select('*');
        if (data) setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  const promoteToAdmin = async (userId: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('users').update({ role: 'admin' }).eq('id', userId);

    if (!error) {
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: 'admin' } : u)));
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Manage Users</h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-semibold">Email</th>
                  <th className="text-left p-4 text-foreground font-semibold">Full Name</th>
                  <th className="text-left p-4 text-foreground font-semibold">Role</th>
                  <th className="text-left p-4 text-foreground font-semibold">Joined</th>
                  <th className="text-left p-4 text-foreground font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border hover:bg-muted">
                    <td className="p-4 text-foreground">{u.email}</td>
                    <td className="p-4 text-foreground">{u.full_name || '-'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-foreground">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => promoteToAdmin(u.id)}
                          className="text-primary hover:opacity-80 font-semibold"
                        >
                          Make Admin
                        </button>
                      )}
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
