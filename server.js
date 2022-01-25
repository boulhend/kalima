const fs = require("fs");
const allWords = {};
const data = fs.readFileSync("./arabic-words.txt", "utf-8");
const thewords = data
  .split("\n")
  .map((word) => word.replace("\r", ""))
  .filter(
    (word) =>
      word.length === 5 &&
      !word.startsWith("ي") &&
      !word.startsWith("آ") &&
      !word.startsWith("ت") &&
      !word.startsWith("س") &&
      !word.startsWith("أ") &&
      word !== "skype"
  );
const words = data
  .split("\n")
  .filter(
    (word) =>
      word.length === 5 &&
      !word.includes("آ") &&
      !word.startsWith("بت") &&
      !word.startsWith("بب") &&
      !word.startsWith("بآ") &&
      !word.startsWith("بأ") &&
      !word.startsWith("س") &&
      !word.startsWith("أ") &&
      !word.startsWith("ي") &&
      !word.startsWith("و") &&
      !word.startsWith("ل") &&
      !word.startsWith("ف") &&
      !word.startsWith("ش") &&
      !word.startsWith("ك") &&
      !word.startsWith("ا") &&
      !word.startsWith("آ") &&
      !word.startsWith("ت")
  );
/* words.forEach((word) => {
  allWords[`${word}`] = word;
}); */

fs.writeFileSync("arabic-words.json", JSON.stringify(thewords));
