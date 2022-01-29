import { letterColors } from "../data/letters-list";

export function compare(word: any, rightWord: any): (string | null)[] {
  const { letterAbsent, letterExist, letterRight } = letterColors;
  const lettersColors = [];
  // Check if letter exists in the right place
  for (let i = 0; i < 5; i++) {
    if (word[i] === rightWord[i]) {
      lettersColors.push(letterRight);
      rightWord[i] = null;
    } else {
      lettersColors.push(null);
    }
  }
  // Check letter if exists or not
  for (let i = 0; i < 5; i++) {
    // Check empty spot letters colors array
    if (!lettersColors[i]) {
      const letterPosition = rightWord.indexOf(word[i]);
      if (letterPosition !== -1) {
        lettersColors[i] = letterExist;
        rightWord[letterPosition] = null;
      } else {
        lettersColors[i] = letterAbsent;
      }
    }
  }

  return lettersColors;
}
