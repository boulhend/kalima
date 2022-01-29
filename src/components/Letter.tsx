import { useState, useEffect } from "react";
import { letterColors } from "../data/letters-list";
interface Props {
  letter: string;
  bgColor: string;
}

const LetterCompoenet = ({ letter, bgColor }: Props) => {
  const { letterInitial } = letterColors;
  const [animateBgColor, setAnimateBgColor] = useState(letterInitial);
  const textColor = animateBgColor === letterInitial ? "text-gray-900" : "text-white";
  const borderColor = letter === "" && animateBgColor === letterInitial ? "border-[#d3d6da]" : "border-gray-600";
  const borderWidth = animateBgColor !== letterInitial ? "border-none" : "border-2";

  useEffect(() => {
    if (bgColor !== letterInitial) {
      setTimeout(() => {
        setAnimateBgColor(bgColor);
      }, 300);
    }
  }, [bgColor, letterInitial]);

  return (
    <div
      className={`w-[3.6rem] h-[3.6rem] ${borderWidth} ${borderColor}  m-[0.2rem] flex justify-center items-center text-4xl 
      ${letter && "animate-letter"} ${textColor} ${bgColor === letterInitial && letterInitial}  ${
        bgColor !== letterInitial && animateBgColor === letterInitial && `animate-rotate-in`
      } ${bgColor !== letterInitial && animateBgColor !== letterInitial && `${bgColor} animate-rotate-out`}`}
    >
      {letter}
    </div>
  );
};

export default LetterCompoenet;
