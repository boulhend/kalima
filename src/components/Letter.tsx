import { useState, useEffect } from "react";
interface Props {
  id: number;
  currentIndex: number;
  isError: boolean;
  letter: string;
  color: string;
  children?: React.ReactNode;
}

const LetterCompoenet = ({
  id,
  isError,
  currentIndex,
  letter,
  color,
  children,
}: Props) => {
  const [key, setKey] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>(color);

  const vibrationCondition =
    isError && id >= currentIndex && id < currentIndex + 5;
  const letterAnimationCondition =
    key !== "Enter" && letter && !vibrationCondition;
  const letterResultAnimation =
    key === "Enter" && letter && !vibrationCondition && color !== "bg-white";
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      setKey(e.key);
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  });

  useEffect(() => {
    if (letterResultAnimation) {
      setTimeout(() => {
        setBgColor(color);
      }, 500);
    }
  }, [color]);

  return (
    <div
      className={`w-16 h-16 border-2 ${
        letter ? "border-gray-500" : "border-gray-300"
      } ${vibrationCondition ? "animate-vibrate" : ""} ${
        letterAnimationCondition ? "animate-letter" : ""
      } m-[0.18rem] flex justify-center items-center text-4xl ${
        letterResultAnimation &&
        bgColor !== "bg-white" &&
        `${bgColor} animate-rotate-out text-white  `
      } ${
        letterResultAnimation &&
        bgColor === "bg-white" &&
        "animate-rotate-in bg-white text-black"
      }`}
    >
      {letter}
    </div>
  );
};

export default LetterCompoenet;
