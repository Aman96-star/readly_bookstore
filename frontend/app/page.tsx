import BestSellers from "@/components/BestSellers/BestSellers";
import BookCarousel from "@/components/BookCarousel/BookCarousel";
import BookExplorer from "@/components/BookExplorer";
import Footer from "@/components/Footer";
import Horror_cat from "@/components/List/Horror_cat";
import Selfhelp from "@/components/List/Selfhelp";
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
    <Horror_cat/>
    <Selfhelp/>
<Footer/>
  </>
  );
}
