"use client";

import React, { useState, useEffect } from "react";

interface Props {
  message: string;
  thinkingDelay?: number;
  minTypingDelay?: number;
  maxTypingDelay?: number;
  className?: string;
}


const TextEffect: React.FC<Props> = ({
  message,
  thinkingDelay = 2000,
  minTypingDelay = 50,
  maxTypingDelay = 400,
  className,
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [thinking, setThinking] = useState<boolean>(true);

  useEffect(() => {
    const wordsArray = message.split(" ");
    setWords(wordsArray);
  }, [message]);


  useEffect(() => {
    if (index < words.length) {
      const word = words[index];
      const wordLength = word.length;
      let typingDelay = Math.floor(
        Math.random() * (maxTypingDelay - minTypingDelay) + minTypingDelay
      );
      if (wordLength > 10) {
        typingDelay = Math.floor(typingDelay * 1.5);
      } else if (wordLength < 5) {
        typingDelay = Math.floor(typingDelay / 2);
      }
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + word + " ");
        setIndex((prev) => prev + 1);
        setThinking(false);
      }, typingDelay);
      return () => clearTimeout(timeout);
    }
  }, [index, words, maxTypingDelay, minTypingDelay]);

  useEffect(() => {
    if (index === 0) {
      const timeout = setTimeout(() => {
        setThinking(false);
      }, thinkingDelay);
      return () => clearTimeout(timeout);
    }
    if (index < words.length) {
      const timeout = setTimeout(() => {
        setThinking(false);
      }, thinkingDelay);
      return () => clearTimeout(timeout);
    }
  }, [index, words, thinkingDelay]);

  useEffect(() => {
    if (thinking) {
      const timeout = setTimeout(() => {
        setThinking(false);
      }, thinkingDelay);
      return () => clearTimeout(timeout);
    }
  }, [thinking, thinkingDelay]);

  useEffect(() => {
    if (!thinking && index < words.length) {
      const timeout = setTimeout(() => {
        setThinking(true);
      }, thinkingDelay);
      return () => clearTimeout(timeout);
    }
  }, [thinking, thinkingDelay, index, words]);

  return <p className={className}>{displayText}</p>;
};

export default TextEffect;
