# Readly Bookstore

A modern, full-featured online bookstore platform built with Next.js 15, TypeScript, and Supabase. This application provides a seamless shopping experience for customers and powerful management tools for administrators.

## Features

### Customer Features
- **User Authentication**: Sign up and login with secure Supabase Auth
- **Book Browsing**: Explore all available books with detailed information
- **Search & Filter**: Find books by title, author, or category
- **Shopping Cart**: Add/remove books and manage quantities
- **Checkout**: Complete purchases with order management
- **Order History**: Track all past orders and their status
- **User Profile**: Manage account information

### Admin Features
- **Dashboard**: Overview of key metrics (total books, orders, users)
- **Book Management**: Add, edit, and delete books from the catalog
- **Category Management**: Create and organize book categories
- **Order Management**: View all orders and update delivery status
- **User Management**: View all users and manage admin roles

### Technical Highlights
- **Role-Based Access Control**: Secure separation of customer and admin features
- **Row Level Security (RLS)**: Database-level security policies
- **Type-Safe**: Built entirely with TypeScript
- **Modern UI**: Responsive design with Tailwind CSS
- **Server Components**: Leverages Next.js 15 App Router

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Next.js API Routes
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with RLS policies
- **Deployment**: Vercel

## Project Structure

```
readly-bookstore/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── auth/
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Sign up page
│   ├── books/
│   │   ├── page.tsx              # Books listing
│   │   └── [id]/page.tsx         # Book details (can be added)
│   ├── cart/page.tsx             # Shopping cart
│   ├── checkout/page.tsx         # Checkout page
│   ├── orders/page.tsx           # Order history
│   ├── admin/
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── books/page.tsx        # Manage books
│   │   ├── orders/page.tsx       # Manage orders
│   │   ├── categories/page.tsx   # Manage categories
│   │   └── users/page.tsx        # Manage users
│   └── globals.css               # Global styles
├── components/
│   └── Header.tsx                # Navigation header
├── lib/
│   ├── supabase.ts              # Supabase client setup
│   └── auth-actions.ts          # Authentication utilities
├── middleware.ts                 # Next.js middleware for auth
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Database Schema

### Tables

#### `users`
- `id` (UUID): Primary key from auth.uid()
- `email` (TEXT): Unique email address
- `full_name` (TEXT): User's full name
- `role` (TEXT): 'customer' or 'admin'
- `created_at` (TIMESTAMP): Account creation date
- `updated_at` (TIMESTAMP): Last update date

#### `categories`
- `id` (UUID): Primary key
- `name` (TEXT): Category name
- `slug` (TEXT): URL-friendly slug
- `description` (TEXT): Category description
- `created_at` (TIMESTAMP): Creation date

#### `books`
- `id` (UUID): Primary key
- `title` (TEXT): Book title
- `author` (TEXT): Book author
- `description` (TEXT): Book description
- `price` (DECIMAL): Book price
- `category_id` (UUID): FK to categories
- `image_url` (TEXT): Book cover image URL
- `stock` (INTEGER): Available quantity
- `isbn` (TEXT): ISBN number
- `published_date` (DATE): Publication date
- `created_at` (TIMESTAMP): Creation date
- `updated_at` (TIMESTAMP): Last update date

#### `orders`
- `id` (UUID): Primary key
- `user_id` (UUID): FK to users
- `total_amount` (DECIMAL): Order total
- `status` (TEXT): 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
- `created_at` (TIMESTAMP): Order date
- `updated_at` (TIMESTAMP): Last update date

#### `order_items`
- `id` (UUID): Primary key
- `order_id` (UUID): FK to orders
- `book_id` (UUID): FK to books
- `quantity` (INTEGER): Quantity ordered
- `price` (DECIMAL): Price at purchase time
- `created_at` (TIMESTAMP): Creation date

#### `cart_items`
- `id` (UUID): Primary key
- `user_id` (UUID): FK to users
- `book_id` (UUID): FK to books
- `quantity` (INTEGER): Quantity in cart
- `created_at` (TIMESTAMP): Creation date
- `updated_at` (TIMESTAMP): Last update date

## Installation & Setup

### 1. Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (https://supabase.com)

### 2. Clone the Repository
```bash
git clone https://github.com/Aman96-star/Readly-Bookstore.git
cd Readly-Bookstore
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Settings" → "API"
4. Copy the URL and anon key

### 5. Database Setup

The database schema is automatically created through Supabase SQL editor using the `scripts/init-database.sql` file. The migration creates all necessary tables with proper RLS policies.

### 6. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000 in your browser.

## Usage Guide

### For Customers

#### 1. **Sign Up**
- Click "Sign Up" on the homepage
- Enter email, password, and full name
- Create your account

#### 2. **Browse Books**
- Visit the "Books" page to see all available books
- Use search to find specific titles or authors
- Filter by category

#### 3. **Shopping**
- Click on any book to view details
- Click "Add to Cart" to add to your cart
- Manage cart quantities or remove items

#### 4. **Checkout**
- Visit your cart
- Click "Proceed to Checkout"
- Enter shipping and payment information
- Complete your order

#### 5. **Orders**
- Visit "Orders" page to see all your purchases
- Track order status (Pending → Confirmed → Shipped → Delivered)

### For Admins

#### 1. **Access Admin Panel**
- Your user account must have the 'admin' role
- Click "Admin" in the header navigation
- You'll see the admin dashboard

#### 2. **Manage Books**
- Click "Manage Books" on the dashboard
- Click "Add Book" to create a new book entry
- Fill in title, author, price, stock, and other details
- Delete books using the Delete button in the table

#### 3. **Manage Categories**
- Click "Manage Categories" on the dashboard
- Create new categories with name, slug, and description
- Delete categories as needed

#### 4. **Manage Orders**
- Click "Manage Orders" on the dashboard
- View all customer orders
- Update order status using the dropdown selector
- Statuses: Pending → Confirmed → Shipped → Delivered

#### 5. **Manage Users**
- Click "Manage Users" on the dashboard
- View all registered users and their roles
- Promote customers to admin using "Make Admin" button

## Authentication & Security

### Authentication Flow
1. Users sign up with email and password
2. Supabase Auth handles password hashing and storage
3. A user profile is created in the `users` table with role 'customer'
4. JWT tokens are used for session management
5. Middleware protects admin routes based on user role

### Row Level Security (RLS)
All tables have RLS policies enforcing:
- Customers can only view books and their own orders/cart
- Admins can view and modify all data
- User-specific data (cart, orders) is protected
- Only authenticated users can access protected features

### Protected Routes
- `/auth/login` and `/auth/signup` - Public routes
- `/cart`, `/checkout`, `/orders` - Requires customer authentication
- `/admin/*` - Requires admin role

## API Endpoints

All data operations go through Supabase client library. No custom API routes are exposed; all access is controlled through RLS policies.

## Styling

The project uses Tailwind CSS with custom design tokens defined in `globals.css`:

- **Primary Color**: Used for buttons and highlights
- **Background**: Main page background
- **Card**: Component background
- **Foreground**: Text color
- **Muted**: Secondary text and backgrounds
- **Border**: Component borders

Customize colors in `app/globals.css` to match your brand.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting service

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never expose secret keys in these variables.

## Common Issues & Troubleshooting

### 1. "Not authenticated" Error
- Make sure you're logged in
- Check that Supabase environment variables are set correctly
- Clear browser cookies and try again

### 2. Admin Routes Inaccessible
- Ensure your user account has 'admin' role
- Ask another admin to promote your account using the user management panel
- Check Supabase database that your user has role = 'admin'

### 3. Books Not Displaying
- Verify books exist in Supabase `books` table
- Check RLS policies are enabled
- Review browser console for error messages

### 4. Cart Items Disappearing
- Ensure you're logged in (cart is user-specific)
- Check database connection is working
- Verify RLS policies allow cart access

## Development Tips

### Debugging
- Check browser console for frontend errors
- Review Next.js terminal output for server errors
- Use Supabase dashboard to inspect database directly

### Adding Features
1. Define database schema changes
2. Create/update Supabase tables
3. Create React components
4. Add necessary page routes
5. Test thoroughly

### Code Organization
- Keep components in `/components`
- Use `/lib` for utility functions
- Place pages in `/app` following Next.js conventions
- Keep auth logic in `lib/auth-actions.ts`

## Future Enhancements

- Book detail pages with reviews
- Advanced search with Algolia
- Email notifications for orders
- Payment integration (Stripe)
- Wishlist functionality
- Book recommendations
- Analytics dashboard
- Multi-language support

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check this README thoroughly
2. Review Supabase documentation: https://supabase.com/docs
3. Check Next.js documentation: https://nextjs.org/docs
4. Open an issue on GitHub with detailed description

## Contact

For more information, visit:
- GitHub: https://github.com/Aman96-star/Readly-Bookstore
- Supabase: https://supabase.com
- Next.js: https://nextjs.org

---

Built with Next.js 15 + TypeScript + Supabase
