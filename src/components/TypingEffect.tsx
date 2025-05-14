import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  onTypingDone?: () => void; // <-- Add this line
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 18, onTypingDone }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        if (i >= text.length) {
          clearInterval(interval);
          if (onTypingDone) onTypingDone(); // <-- Call callback here
          return text;
        }
        const next = prev + text[i];
        i++;
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onTypingDone]);

  return <span>{displayed}</span>;
};

export default TypingEffect;