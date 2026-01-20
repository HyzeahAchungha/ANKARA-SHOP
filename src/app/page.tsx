import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Review } from "@/types/review.types";
import { ankaraProducts } from "@/lib/data/products";

// Get new arrivals (first 4 products)
export const newArrivalsData = ankaraProducts.slice(0, 4);

// Get top selling (highest rated products)
export const topSellingData = ankaraProducts
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);

// Reviews data
export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Amina K.",
    content:
      '"Finding beautiful Ankara dresses that align with my personal style used to be a challenge until I discovered this shop. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
    rating: 5,
    date: "December 14, 2024",
  },
  {
    id: 2,
    user: "Fatima M.",
    content: `"I'm blown away by the quality and style of the Ankara dresses I received. From casual wear to elegant gowns, every piece I've bought has exceeded my expectations."`,
    rating: 5,
    date: "December 20, 2024",
  },
  {
    id: 3,
    user: "Chioma R.",
    content: `"These Ankara dresses are a must-have! The vibrant prints and perfect fit caught my eye. I can see the designer's touch in every aspect of these beautiful pieces."`,
    rating: 5,
    date: "January 5, 2025",
  },
  {
    id: 4,
    user: "Grace N.",
    content: `"As someone who values African fashion, I appreciate the authenticity and quality. These dresses not only look stunning but also feel great to wear. Highly recommended!"`,
    rating: 5,
    date: "January 10, 2025",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}