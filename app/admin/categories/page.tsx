'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCurrentUser, getUserProfile } from '@/lib/auth-actions';
import Header from '@/components/Header';

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

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
        const { data } = await supabase.from('categories').select('*');
        if (data) setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.from('categories').insert(formData);

    if (!error) {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
      setFormData({ name: '', slug: '', description: '' });
    }
  };

  const deleteCategory = async (id: string) => {
    if (confirm('Are you sure?')) {
      const supabase = createClient();
      await supabase.from('categories').delete().eq('id', id);
      setCategories(categories.filter((c) => c.id !== id));
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Manage Categories</h1>

          <form onSubmit={handleAddCategory} className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                required
              />
              <input
                type="text"
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90"
            >
              Add Category
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-semibold">Name</th>
                  <th className="text-left p-4 text-foreground font-semibold">Slug</th>
                  <th className="text-left p-4 text-foreground font-semibold">Description</th>
                  <th className="text-left p-4 text-foreground font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-border hover:bg-muted">
                    <td className="p-4 text-foreground">{cat.name}</td>
                    <td className="p-4 text-foreground">{cat.slug}</td>
                    <td className="p-4 text-foreground">{cat.description}</td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
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
