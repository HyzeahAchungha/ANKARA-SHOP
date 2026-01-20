"use client";

import { useState } from "react";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { ankaraProducts } from "@/lib/data/products";
import CartSidebar from "@/components/layout/CartSidebar";

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productData = ankaraProducts.find(
    (product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  // Get related products from the same category
  const relatedProducts = ankaraProducts
    .filter(
      (p) =>
        p.category === productData.category && p.id !== productData.id
    )
    .slice(0, 4);

  return (
    <main>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} onAddToCart={() => setIsCartOpen(true)} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProducts} />
      </div>
    </main>
  );
}