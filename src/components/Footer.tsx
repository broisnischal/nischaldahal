"use client";

import React from "react";

const Footer = () => {
  const links: string[] = [
    "https://dahal-nischal.com.np",
    "https://nischal-dahal.netlify.app",
    "http://nees.eu5.net",
    "http://neeschal.eu5.net",
    "https://neeswebservices.business.site",
  ];

  return (
    <>
      <footer className="m-32 text-center">
        {links.map((item, index) => (
          <a href={item} key={index} target="_blank" className="m-10">
            {item}
          </a>
        ))}
        <p className="text-center m-10">Jesus, I created this website in 10 minutes!</p>
      </footer>
    </>
  );
};

export default Footer;
