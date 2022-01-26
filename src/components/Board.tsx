import Row from "./Row";
import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import { compare } from "../utils/compare";
import { wordsList } from "../data/words-list";

function Board() {
  let wordIndexRef = useRef(0);
  const [boardWords, setBoardWords] = useState<Array<any>>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [wordColors, setWordColors] = useState<Array<any>>([]);
  const [isErrors, setIsErrors] = useState<Array<boolean>>([]);
  const rightWord = "تفاحة".split("");
  useEffect(() => {
    const currentWord = boardWords[wordIndexRef.current];
    const listener = (e: KeyboardEvent) => {
      if (
        /[\u0600-\u06FF]/i.test(e.key) &&
        e.key.length === 1 &&
        currentWord.length < 5
      ) {
        const newBoardWords = [...boardWords];
        newBoardWords[wordIndexRef.current].push(e.key);
        setBoardWords(newBoardWords);
      }
      if (e.key === "Backspace" && currentWord.length > 0) {
        const newBoardWords = [...boardWords];
        newBoardWords[wordIndexRef.current].pop();
        setBoardWords(newBoardWords);
      }
      if (e.key === "Enter" && currentWord.length === 5) {
        const enterdWord = currentWord.slice(0, 5).join("");
        if (wordsList.includes(enterdWord)) {
          const newWordColors = [...wordColors];
          newWordColors.push(compare(enterdWord.split(""), rightWord));
          setWordColors(newWordColors);
          wordIndexRef.current++;
        } else {
          toast.error("لا توجد في لائحة الكلمات");
          const newErrors = [...isErrors];
          newErrors[wordIndexRef.current] = true;
          setIsErrors(newErrors);
        }
      } else if (e.key === "Enter" && currentWord.length < 5) {
        toast.error("عدد الحروف غير كاف");
        const newErrors = [...isErrors];
        newErrors[wordIndexRef.current] = true;
        setIsErrors(newErrors);
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  });
  useEffect(() => {
    if (isErrors[wordIndexRef.current]) {
      setTimeout(() => {
        const newErrors = [...isErrors];
        newErrors[wordIndexRef.current] = false;
        setIsErrors(newErrors);
      }, 400);
    }
  }, [isErrors]);

  return (
    <div className="grid grid-rows-6" dir="rtl">
      <Row
        word={boardWords[0]}
        wordColors={wordColors[0] ?? []}
        error={isErrors[0] ?? false}
      />
      <Row
        word={boardWords[1]}
        wordColors={wordColors[1] ?? []}
        error={isErrors[1] ?? false}
      />
      <Row
        word={boardWords[2]}
        wordColors={wordColors[2] ?? []}
        error={isErrors[2] ?? false}
      />
      <Row
        word={boardWords[3]}
        wordColors={wordColors[3] ?? []}
        error={isErrors[3] ?? false}
      />
      <Row
        word={boardWords[4]}
        wordColors={wordColors[4] ?? []}
        error={isErrors[4] ?? false}
      />
      <Row
        word={boardWords[5]}
        wordColors={wordColors[5] ?? []}
        error={isErrors[5] ?? false}
      />
    </div>
  );
}

export default Board;
