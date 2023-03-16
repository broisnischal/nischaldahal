"use client";

import Hero from "@/components/Home";
import Images from "@/components/Images";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <p className="text-4xl text-center p-10 mt-32">Welcome!</p>
      <Hero />
      <Images />
      <Footer />
    </>
  );
}
