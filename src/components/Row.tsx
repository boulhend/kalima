import { useState, useEffect } from "react";
import Letter from "./Letter";

interface Props {
  word: Array<string>;
  wordColors: Array<string>;
  error: boolean;
}

const Row = ({ word, wordColors, error }: Props) => {
  const defaultBgColor = "bg-white";
  const [bgColors, setBgColors] = useState<Array<string>>([]);

  useEffect(() => {
    if (wordColors.length === 5) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          setBgColors((state) => [...state, wordColors[i]]);
        }, 100 * i);
      }
    }
  }, [wordColors]);
  return (
    <div className={`grid grid-cols-5 ${error && "animate-vibrate"}`} dir="rtl">
      {[0, 1, 2, 3, 4].map((lett) => (
        <Letter key={lett} letter={word[lett] ?? ""} bgColor={bgColors[lett] ?? defaultBgColor} />
      ))}
    </div>
  );
};
export default Row;
