'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Header from '@/components/Header';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image_url: string | null;
  description: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Check if user is logged in
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);

      // Fetch books
      const { data, error } = await supabase.from('books').select('*').limit(12);

      if (!error && data) {
        setBooks(data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header user={user} />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Readly</h1>
            <p className="text-xl mb-8 opacity-90">Discover millions of books at your fingertips</p>
            {!user && (
              <div className="flex gap-4 justify-center">
                <Link
                  href="/auth/login"
                  className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="border-2 border-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Books Section */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Featured Books</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="bg-card rounded-lg overflow-hidden shadow hover:shadow-lg transition group"
                >
                  <div className="bg-muted h-48 flex items-center justify-center overflow-hidden">
                    {book.image_url ? (
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="text-muted-foreground text-sm">No image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                    <p className="text-primary font-bold mt-2">${book.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No books available yet.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
