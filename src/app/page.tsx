// "use client";

import Hero from "@/components/Home";
import Images from "@/components/Images";

export default function Home() {
  // const res = await getImages();

  return (
    <div>
      <p className="text-4xl text-center p-10">Welcome!</p>
      <Hero />
      <Images />
    </div>
  );
}
