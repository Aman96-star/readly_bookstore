import BestSellers from "@/components/BestSellers/BestSellers";
import BookCarousel from "@/components/BookCarousel/BookCarousel";
import BookExplorer from "@/components/BookExplorer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// favicon
export default function Home() {
  return (
  <>
  

    <BookCarousel/>
    <BestSellers
  // onShowAll={() => router.push("/books")}
  // onAddToBag={(book) => addToCart(book)}
/>
<Footer/>
  </>
  );
}
