'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import Header from '@/components/Header';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image_url: string | null;
  description: string;
  category_id: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Get user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);

      // Fetch categories
      const { data: categoryData } = await supabase.from('categories').select('*');
      if (categoryData) setCategories(categoryData);

      // Fetch books
      const { data: bookData } = await supabase.from('books').select('*');
      if (bookData) {
        setBooks(bookData);
        setFilteredBooks(bookData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (selectedCategory) {
      filtered = filtered.filter((book) => book.category_id === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchQuery, books]);

  return (
    <>
      <Header user={user} />
      <main className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">All Books</h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
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
                      <div className="text-muted-foreground">No image</div>
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
              <p className="text-muted-foreground text-lg">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
