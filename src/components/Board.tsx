import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { compare } from "../utils/compare";
import { wordsList } from "../data/words-list";
import { lettersList } from "../data/letters-list";
import Row from "./Row";

function Board() {
  let wordIndexRef = useRef(0);
  const [keyboardLetters, setKeyboardLetters] = useState(() =>
    lettersList.map((letter) => ({
      letter,
      bgColor: "bg-gray-300",
      textColor: "text-black",
    }))
  );
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
  const currentWord = boardWords[wordIndexRef.current];
  const enterdWord = currentWord.slice(0, 5).join("");
  const fullRightWord = "تفاحة";
  const rightWord = fullRightWord.split("");

  const handleErrorInWord = (): void => {
    const newErrors = [...isErrors];
    newErrors[wordIndexRef.current] = true;
    setIsErrors(newErrors);
  };

  const addLetterToBoard = (key: string): void => {
    const newBoardWords = [...boardWords];
    newBoardWords[wordIndexRef.current].push(key);
    setBoardWords(newBoardWords);
  };
  const deleteLetterFromBoard = (): void => {
    const newBoardWords = [...boardWords];
    newBoardWords[wordIndexRef.current].pop();
    setBoardWords(newBoardWords);
  };

  const handleEnter = (): void => {
    if (currentWord.length === 5) {
      if (wordsList.includes(enterdWord)) {
        const newWordColors = [...wordColors];
        newWordColors.push(compare(enterdWord.split(""), rightWord));
        setWordColors(newWordColors);
        wordIndexRef.current++;
      } else {
        toast.error("لا توجد في لائحة الكلمات");
        handleErrorInWord();
      }
    } else if (currentWord.length < 5) {
      toast.error("عدد الحروف غير كاف");
      handleErrorInWord();
    }
  };
  const handleKeyboardClick = (eTarget: string) => {
    if (
      /[\u0600-\u06FF]/i.test(eTarget) &&
      currentWord.length < 5 &&
      boardWords[wordIndexRef.current - 1]?.join("") !== fullRightWord
    ) {
      addLetterToBoard(eTarget);
    }
    if (eTarget === "Backspace" && currentWord.length > 0) {
      deleteLetterFromBoard();
    }
    if (eTarget === "Enter" && wordsList.includes(enterdWord)) {
      handleEnter();
    }
  };
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (
        /[\u0600-\u06FF]/i.test(e.key) &&
        e.key.length === 1 &&
        currentWord.length < 5 &&
        boardWords[wordIndexRef.current - 1]?.join("") !== fullRightWord
      ) {
        addLetterToBoard(e.key);
      }
      if (e.key === "Backspace" && currentWord.length > 0) {
        deleteLetterFromBoard();
      }
      if (e.key === "Enter") {
        handleEnter();
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
  useEffect(() => {
    if (wordColors[wordIndexRef.current - 1]?.length === 5) {
      const currentWordColors = wordColors[wordIndexRef.current - 1];
      const newKeyboardLetters = keyboardLetters.map((letterObject) => {
        const indexOfLetter = boardWords[wordIndexRef.current - 1]?.indexOf(
          letterObject.letter
        );
        if (indexOfLetter !== -1) {
          return {
            letter: letterObject.letter,
            bgColor: currentWordColors[indexOfLetter],
            textColor: "text-white",
          };
        } else {
          return letterObject;
        }
      });
      // Waint until animation finishes then color the keyboard
      setTimeout(() => {
        setKeyboardLetters(newKeyboardLetters);
      }, 1200);
    }
  }, [wordColors]);
  return (
    <>
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
      <div className="flex justify-center flex-wrap my-7 w-[700px] h-[198px]">
        {keyboardLetters.map((letterObject) => {
          const { letter, bgColor, textColor } = letterObject;
          return (
            <button
              key={letter}
              className={`cursor-pointer flex justify-center items-center  ${
                letter === "Enter" || letter === "Backspace"
                  ? "w-40"
                  : "w-[3rem]"
              } ${bgColor} ${textColor} h-[3rem] rounded-md text-lg font-bold m-1`}
              onClick={(event) =>
                handleKeyboardClick((event.target as HTMLInputElement).value)
              }
              value={letter}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Board;
