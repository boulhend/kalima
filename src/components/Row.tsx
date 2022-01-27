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
        }, 200 * i);
      }
    }
  }, [wordColors]);
  return (
    <div className={`grid grid-cols-5 ${error && "animate-vibrate"}`} dir="rtl">
      <Letter letter={word[0] ?? ""} bgColor={bgColors[0] ?? defaultBgColor} />
      <Letter letter={word[1] ?? ""} bgColor={bgColors[1] ?? defaultBgColor} />
      <Letter letter={word[2] ?? ""} bgColor={bgColors[2] ?? defaultBgColor} />
      <Letter letter={word[3] ?? ""} bgColor={bgColors[3] ?? defaultBgColor} />
      <Letter letter={word[4] ?? ""} bgColor={bgColors[4] ?? defaultBgColor} />
    </div>
  );
};
export default Row;
