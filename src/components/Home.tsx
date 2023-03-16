import Image from "next/image";
import React from "react";
import TextEffect from "./Texteffect";

const Hero = () => {
  const message = `Hi there! My name is Nischal Dahal and I'm a full-stack developer based in Nepal.
  I'm not your typical developer. In fact, I like to think of myself as a bit of a enthusiast in coding. I'm constantly pushing the boundaries and exploring new ways to tech.
  
  When I'm not working on web and android development, you can usually find me reading, coding, dancing, singing, writing, editing, videography, or hacking. I believe in living a balanced life and making time for the things that bring us joy.
  
  One thing that sets me apart from others in my field is my unique perspective. I have a [Your Perspective] approach that allows me to think. This has led me to some pretty amazing ideas that i gain through.
  
  I'm passionate about new tech in industry and talking about Artificial Intelligence and believe that AI will revolutinize the future. That's why I'm constantly working on learning, even when it's tough.
  
  If you're interested in learning more about me or working together, feel free to reach out.
  
  `;

  return (
    <div className="h-full m-10">
      <h1>About Me</h1>
      <TextEffect className="text-2xl" message={message} />
    </div>
  );
};

export default Hero;
