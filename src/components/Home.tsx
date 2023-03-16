"use client";

import React from "react";
import TextEffect from "./Texteffect";

const Hero = () => {
  const message =
    "Hi there! My name is Nischal Dahal 😁 and I'm a full-stack developer. I'm not your typical developer. In fact, I like to think of myself as a bit of a enthusiast learning ideas not syntax. I'm constantly pushing the boundaries and exploring new ways to get into the newer technologies that are coming new days. When I'm not working on, you can usually find me stalking own profile 😅, dancing, singing, writing, editing, videography, or hacking 🐈‍⬛. I believe in living a balanced life and making time for the things that bring us joy. One thing that sets me apart from others in my field is my unique perspective of learning How things works? 🔥 I have a approach that allows me to think gracefully, remember shutting your server? This has led me to some pretty amazing ideas that i gain through. I'm passionate about new tech in industry and talking about Revolution. That's why I'm constantly working on learning, even when it's tough. If you're interested in learning more about me or working together, feel free to reach out via my another others portfolios. I can also design a cup of psd for very low prices. PM for works 🚀";

  return (
    <>
      <div className="h-full mb-32 mt-12 mx-44">
        <h1>About Me</h1>
        <TextEffect className="text-2xl" message={message} />
      </div>
    </>
  );
};

export default Hero;
