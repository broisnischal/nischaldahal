"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

async function getImages(): Promise<string[]> {
  const response = await fetch("/api/images");

  const images = await response.json();

  return images;
}

export default function Images() {
  const [images, setImage] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const images = await getImages();
      setImage(images);
      console.log(images);
    }

    fetchImages();

    return () => {};
  }, []);

  return (
    <div className="">
      {images?.map((item, index) => {
        return (
          <Image
            width={100}
            height={100}
            src={`${item}`}
            alt={index.toString()}
            key={index}
          ></Image>
        );
      })}
    </div>
  );
}
