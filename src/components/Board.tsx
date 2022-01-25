import Letter from "./Letter";
import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import { compare } from "../utils/compare";
import { wordsList } from "../data/words-list";

function Board() {
  let indexRef = useRef(0);
  const [boardWords, setBoardWords] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [word, setWord] = useState<string[]>(() => {
    const boardData = localStorage.getItem("boardData");
    return boardData
      ? JSON.parse(boardData)
          .map((word: string) => word.split(""))
          .flat(1)
      : [];
  });
  const [colors, setColors] = useState<string[]>([]);
  const rightWord = "تفاحة".split("");
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (
        /[\u0600-\u06FF]/i.test(e.key) &&
        e.key.length === 1 &&
        word.length < 5 + indexRef.current
      ) {
        setWord((state) => [...state, e.key]);
      }
      if (e.key === "Backspace" && word.length > indexRef.current) {
        const newWord = [...word];
        newWord.pop();
        setWord(newWord);
      }
      if (e.key === "Enter" && word.length === 5 + indexRef.current) {
        const enterdWord = word
          .slice(indexRef.current, 5 + indexRef.current)
          .join("");
        if (wordsList.includes(enterdWord)) {
          /* const boardData = localStorage.getItem("boardData");
          const newBordData = boardData
            ? JSON.parse(boardData).push(enterdWord)
            : [enterdWord];
          setBoardWords([...boardWords, enterdWord]);
          
          localStorage.setItem("boardData", JSON.stringify(newBordData)); */
          indexRef.current += 5;
          setColors([...colors, ...compare(enterdWord.split(""), rightWord)]);
        } else {
          toast.error("لا توجد في لائحة الكلمات");
          setIsError(true);
        }
      } else if (e.key === "Enter" && word.length < 5 + indexRef.current) {
        toast.error("عدد الحروف غير كاف");
        setIsError(true);
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  });

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 400);
    }
  }, [isError]);
  return (
    <div className="grid grid-cols-5" dir="rtl">
      {[...Array(30).keys()].map((i) => (
        <Letter
          key={i}
          id={i}
          isError={isError}
          currentIndex={indexRef.current}
          letter={word[i] ?? ""}
          color={colors[i] ?? "bg-white"}
        />
      ))}
    </div>
  );
}

export default Board;
