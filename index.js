// create random numbers
const { generateRiddles } = require("./riddles");
const { numberstowords } = require("./words");

const secretCode = Math.floor(1000 + Math.random() * 9000).toString();

console.log(secretCode);
const wordsLock = numberstowords(secretCode);
const words = wordsLock.words;
console.log(wordsLock);
const riddles = generateRiddles(words);
console.log(riddles);
