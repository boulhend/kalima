import { useState, useEffect } from "react";
interface Props {
  letter: string;
  bgColor: string;
}

const LetterCompoenet = ({ letter, bgColor }: Props) => {
  const [animateBgColor, setAnimateBgColor] = useState("bg-white");
  const textColor =
    animateBgColor === "bg-white" ? "text-gray-900" : "text-white";
  const borderColor =
    letter === "" && animateBgColor === "bg-white"
      ? "border-[#d3d6da]"
      : "border-gray-600";
  const borderWidth =
    animateBgColor !== "bg-white" ? "border-none" : "border-2";

  useEffect(() => {
    if (bgColor !== "bg-white") {
      setTimeout(() => {
        setAnimateBgColor(bgColor);
      }, 700);
    }
  }, [bgColor]);

  return (
    <div
      className={`w-[3.6rem] h-[3.6rem] ${borderWidth} ${borderColor}  m-[0.2rem] flex justify-center items-center text-4xl 
      ${letter && "animate-letter"} ${textColor} ${
        bgColor === "bg-white" && "bg-white"
      }  ${
        bgColor !== "bg-white" &&
        animateBgColor === "bg-white" &&
        `animate-rotate-in`
      } ${
        bgColor !== "bg-white" &&
        animateBgColor !== "bg-white" &&
        `${bgColor} animate-rotate-out`
      }`}
    >
      {letter}
    </div>
  );
};

export default LetterCompoenet;
