import { useState, useEffect, useRef } from "react";
import { compare } from "../utils/compare";
import { wordsList, getWordOfTheDay } from "../data/words-list";
import { lettersList } from "../data/letters-list";
import Row from "./Row";
import Toast from "./Toast";

const rightWord = getWordOfTheDay();

interface Props {
  wordColors: any[];
  setWordColors: React.Dispatch<React.SetStateAction<any[]>>;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGameResult: React.Dispatch<React.SetStateAction<string>>;
}
const Board = ({ wordColors, setWordColors, setCloseModal, setGameResult }: Props) => {
  let wordIndexRef = useRef(0);
  const [keyboardLetters, setKeyboardLetters] = useState(() =>
    lettersList.map((letter) => ({
      letter,
      bgColor: "bg-gray-300",
      textColor: "text-black"
    }))
  );
  const [boardWords, setBoardWords] = useState<Array<any>>([[], [], [], [], [], []]);
  const [isErrors, setIsErrors] = useState<Array<boolean>>([]);
  const [disableKeyBoard, setDisableKeyboard] = useState<boolean>(false);
  const [toastData, setToastData] = useState<Array<any>>([]);

  const typedWord = boardWords[wordIndexRef.current]?.join("");

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
    if (typedWord.length === 5) {
      if (wordsList.includes(typedWord)) {
        setDisableKeyboard(true);
        const newWordColors = [...wordColors];
        newWordColors.push(compare(typedWord.split(""), rightWord.split("")));
        setWordColors(newWordColors);
        wordIndexRef.current++;
      } else {
        handleErrorInWord();
        if (toastData.length < 6) {
          setToastData([...toastData, "لا توجد في لائحة الكلمات"]);
        }
      }
    } else if (typedWord.length < 5) {
      handleErrorInWord();
      if (toastData.length < 6) {
        setToastData([...toastData, "عدد الحروف غير كاف"]);
      }
    }
  };
  const handleKeyboardClick = (eTarget: string): void => {
    if (!disableKeyBoard && boardWords[wordIndexRef.current - 1]?.join("") !== rightWord) {
      if (/[\u0600-\u06FF]/i.test(eTarget) && typedWord.length < 5) {
        addLetterToBoard(eTarget);
      }
      if (eTarget === "Backspace" && typedWord.length > 0) {
        deleteLetterFromBoard();
      }
      if (eTarget === "Enter") {
        handleEnter();
      }
    }
  };
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (/[\u0600-\u06FF]/i.test(e.key) && e.key.length === 1 && typedWord?.length < 5) {
        addLetterToBoard(e.key);
      }
      if (e.key === "Backspace" && typedWord?.length > 0) {
        deleteLetterFromBoard();
      }
      if (e.key === "Enter") {
        handleEnter();
      }
    };
    if (!disableKeyBoard && boardWords[wordIndexRef.current - 1]?.join("") !== rightWord) {
      window.addEventListener("keyup", listener);
    }
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
        const indexOfLetter = boardWords[wordIndexRef.current - 1]?.indexOf(letterObject.letter);
        if (indexOfLetter !== -1) {
          return {
            letter: letterObject.letter,
            bgColor: currentWordColors[indexOfLetter],
            textColor: "text-white"
          };
        } else {
          return letterObject;
        }
      });
      // Waint until animation finishes then color the keyboard
      setTimeout(() => {
        setKeyboardLetters(newKeyboardLetters);
        setDisableKeyboard(false);
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordColors]);

  useEffect(() => {
    if (boardWords[wordIndexRef.current - 1]?.join("") === rightWord && !disableKeyBoard) {
      setToastData(["أحسنت !"]);
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("win");
      }, 1200);
    }
  }, [disableKeyBoard, setCloseModal, setGameResult, wordColors, boardWords]);
  useEffect(() => {
    if (wordIndexRef.current === 6 && typedWord !== rightWord) {
      setTimeout(() => {
        setToastData([rightWord]);
      }, 1200);
      setTimeout(() => {
        setCloseModal(false);
        setGameResult("lose");
      }, 2000);
    }
  }, [typedWord, setGameResult, setCloseModal, wordColors]);

  return (
    <>
      <div className="grid grid-rows-6 sm:px-3" dir="rtl">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row key={row} word={boardWords[row]} wordColors={wordColors[row] ?? []} error={isErrors[row] ?? false} />
        ))}
      </div>
      <div className="flex justify-center flex-wrap mt-7 w-[44rem] sm:px-3 xl:w-full xl:h-auto h-[11.7rem]">
        {keyboardLetters.map((letterObject) => {
          const { letter, bgColor, textColor } = letterObject;
          return (
            <button
              key={letter}
              className={`cursor-pointer flex justify-center items-center  ${
                letter === "Enter" || letter === "Backspace" ? "w-40 sm:w-32" : "w-[3rem] sm:w-[2.5rem]"
              } ${bgColor} ${textColor} h-[3rem] sm:h-[2.5rem] rounded-md text-lg font-bold m-1`}
              onClick={(event) => handleKeyboardClick((event.target as HTMLInputElement).value)}
              value={letter}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <Toast toastData={toastData} setToastData={setToastData} rightWord={rightWord} />
    </>
  );
};

export default Board;
