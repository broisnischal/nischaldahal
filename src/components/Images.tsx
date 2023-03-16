"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import styles from "@/styles/Imagegrid.module.css";

async function getImages(): Promise<string[]> {
  const response = await fetch("/api/images");

  const images = await response.json();

  return images;
}

export default function Images() {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    500: 3,
  };

  const [images, setImage] = useState<string[]>([]);
  const [pop, setPop] = useState<boolean>(false);

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
    <div className="w-full flex">
      <div className="m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={`${styles.masonryGrid}`}
          columnClassName={styles.masonryGridColumn}
        >
          {images?.map((item, index) => {
            return (
              <Image
                className="skeleton mb-10"
                width={300}
                height={300}
                src={`${item}`}
                alt={index.toString()}
                key={index}
              ></Image>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
}
