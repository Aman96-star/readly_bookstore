'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logOut } from '@/lib/auth-actions';

export default function Header({ user }: { user: any }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Readly
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/books" className="text-foreground hover:text-primary transition">
            Books
          </Link>
          <Link href="/categories" className="text-foreground hover:text-primary transition">
            Categories
          </Link>

          {user ? (
            <>
              <Link href="/cart" className="text-foreground hover:text-primary transition">
                Cart
              </Link>
              <Link href="/orders" className="text-foreground hover:text-primary transition">
                Orders
              </Link>
              {user.user_metadata?.role === 'admin' && (
                <Link href="/admin" className="text-primary font-semibold hover:opacity-80">
                  Admin
                </Link>
              )}
              <div className="relative group">
                <button className="text-foreground hover:text-primary transition">
                  {user.email}
                </button>
                <div className="absolute right-0 w-48 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-foreground hover:bg-muted transition w-full text-left"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block px-4 py-2 text-foreground hover:bg-muted transition w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-foreground hover:text-primary transition">
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-16 right-4 bg-card border border-border rounded-lg shadow-lg md:hidden w-48 z-20">
            <Link href="/books" className="block px-4 py-2 text-foreground hover:bg-muted">
              Books
            </Link>
            <Link href="/categories" className="block px-4 py-2 text-foreground hover:bg-muted">
              Categories
            </Link>
            {user ? (
              <>
                <Link href="/cart" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Cart
                </Link>
                <Link href="/orders" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Orders
                </Link>
                {user.user_metadata?.role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-2 text-primary font-semibold">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogOut}
                  className="block px-4 py-2 text-foreground hover:bg-muted w-full text-left"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Log In
                </Link>
                <Link href="/auth/signup" className="block px-4 py-2 text-primary font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
