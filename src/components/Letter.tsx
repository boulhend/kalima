import { useState, useEffect } from "react";
interface Props {
  letter: string;
  bgColor: string;
}

const LetterCompoenet = ({ letter, bgColor }: Props) => {
  const textColor = bgColor === "bg-white" ? "text-gray-900" : "text-white";
  const borderColor =
    letter === "" && bgColor === "bg-white"
      ? "border-[#d3d6da]"
      : "border-gray-600";
  const borderWidth = bgColor !== "bg-white" ? "border-none" : "border-2";
  return (
    <div
      className={`w-16 h-16 ${borderWidth} ${borderColor}  m-[0.18rem] flex justify-center items-center text-4xl  ${
        letter && "animate-letter"
      } ${textColor} ${bgColor}`}
    >
      {letter}
    </div>
  );
};

export default LetterCompoenet;
