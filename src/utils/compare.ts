export function compare(word: any, rightWord: any): any[] {
  const lettersColors = [];
  // Check if letter exists in the right place
  for (let i = 0; i < 5; i++) {
    if (word[i] === rightWord[i]) {
      lettersColors.push("bg-green-700");
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
        lettersColors[i] = "bg-yellow-500";
        rightWord[letterPosition] = null;
      } else {
        lettersColors[i] = "bg-gray-500";
      }
    }
  }

  return lettersColors;
}
