'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCurrentUser, getUserProfile } from '@/lib/auth-actions';
import Header from '@/components/Header';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  category_id: string;
}

export default function AdminBooksPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    isbn: '',
  });

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

        // Fetch books
        const supabase = createClient();
        const { data } = await supabase.from('books').select('*');
        if (data) setBooks(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.from('books').insert({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    });

    if (!error) {
      const { data } = await supabase.from('books').select('*');
      if (data) setBooks(data);
      setFormData({
        title: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        isbn: '',
      });
      setShowForm(false);
    }
  };

  const deleteBook = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      const supabase = createClient();
      await supabase.from('books').delete().eq('id', id);
      setBooks(books.filter((b) => b.id !== id));
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Manage Books</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
            >
              {showForm ? 'Cancel' : 'Add Book'}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleAddBook}
              className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                  required
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                  required
                />
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                  required
                />
                <input
                  type="text"
                  placeholder="ISBN"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90"
              >
                Add Book
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-semibold">Title</th>
                  <th className="text-left p-4 text-foreground font-semibold">Author</th>
                  <th className="text-left p-4 text-foreground font-semibold">Price</th>
                  <th className="text-left p-4 text-foreground font-semibold">Stock</th>
                  <th className="text-left p-4 text-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-border hover:bg-muted">
                    <td className="p-4 text-foreground">{book.title}</td>
                    <td className="p-4 text-foreground">{book.author}</td>
                    <td className="p-4 text-foreground">${book.price.toFixed(2)}</td>
                    <td className="p-4 text-foreground">{book.stock}</td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteBook(book.id)}
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
