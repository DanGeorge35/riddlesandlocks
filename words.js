const wordsArray = [
  {
    letter: "A",
    words: [
      "apple",
      "arrow",
      "amber",
      "alive",
      "angel",
      "alert",
      "adapt",
      "acorn",
      "amaze",
      "apex",
      "azure",
      "aid",
      "ache",
      "axis",
      "ask",
      "ally",
      "atom",
      "avid",
      "acre",
      "awake",
    ],
  },
  {
    letter: "B",
    words: [
      "brave",
      "blend",
      "bliss",
      "bloom",
      "beach",
      "breeze",
      "bold",
      "bark",
      "blaze",
      "bridge",
      "badge",
      "butter",
      "blink",
      "buddy",
      "brisk",
      "bump",
      "bless",
      "burst",
      "buzzy",
      "berry",
    ],
  },
  {
    letter: "C",
    words: [
      "charm",
      "cheer",
      "calm",
      "crisp",
      "cloud",
      "charm",
      "crunch",
      "clash",
      "cream",
      "chase",
      "chill",
      "creek",
      "crest",
      "cozy",
      "crawl",
      "curb",
      "cute",
      "craft",
      "climb",
      "chief",
    ],
  },
  {
    letter: "D",
    words: [
      "dream",
      "dare",
      "dash",
      "dusk",
      "dove",
      "dusk",
      "dazzle",
      "dive",
      "drape",
      "drip",
      "drift",
      "drum",
      "dry",
      "duo",
      "duel",
      "duty",
      "dusk",
      "dine",
      "donor",
      "dizzy",
    ],
  },
  {
    letter: "E",
    words: [
      "eager",
      "ease",
      "ember",
      "echo",
      "edge",
      "embrace",
      "epic",
      "evolve",
      "elite",
      "empire",
      "enjoy",
      "entice",
      "equal",
      "era",
      "exalt",
      "edgy",
      "ebb",
      "endow",
      "essence",
      "elude",
    ],
  },
  {
    letter: "F",
    words: [
      "flame",
      "frost",
      "fable",
      "faith",
      "fleet",
      "flair",
      "flinch",
      "flock",
      "flute",
      "foggy",
      "fool",
      "force",
      "forge",
      "frolic",
      "frosty",
      "flax",
      "flint",
      "fringe",
      "fluffy",
      "fury",
    ],
  },
  {
    letter: "G",
    words: [
      "grace",
      "gleam",
      "globe",
      "glow",
      "gust",
      "gale",
      "gaze",
      "giddy",
      "glimpse",
      "glint",
      "grain",
      "grit",
      "groove",
      "gusty",
      "gulp",
      "guru",
      "gaze",
      "gem",
      "glisten",
      "genuine",
    ],
  },
  {
    letter: "H",
    words: [
      "hope",
      "heart",
      "heal",
      "honor",
      "haste",
      "hush",
      "harbor",
      "halo",
      "humble",
      "hymn",
      "harp",
      "hearty",
      "hoop",
      "heaven",
      "hinge",
      "huddle",
      "hazel",
      "hybrid",
      "height",
      "hasty",
    ],
  },
  {
    letter: "I",
    words: [
      "ignite",
      "ideal",
      "iris",
      "ivy",
      "iron",
      "innovate",
      "invoke",
      "inch",
      "imply",
      "icy",
      "impact",
      "invent",
      "itch",
      "intact",
      "idle",
      "icon",
      "inspire",
      "inward",
      "ignite",
      "index",
    ],
  },
  {
    letter: "J",
    words: [
      "jazz",
      "jolt",
      "jade",
      "joy",
      "jumbo",
      "jelly",
      "jolt",
      "jinx",
      "jolly",
      "joust",
      "jaguar",
      "jeep",
      "joint",
      "juicy",
      "jumble",
      "junior",
      "jazz",
      "jive",
      "jet",
      "jinx",
    ],
  },
];

const numberstowords = (number) => {
  const numberArr = number.toString().split("");
  let revealers = "";
  let words = "";
  for (let i = 0; i < numberArr.length; i++) {
    let word = "";
    let reveal = "";
    const selectWord = wordsArray[numberArr[i]];
    //random number from 0 to 19
    const randomIndex = Math.floor(Math.random() * 20);
    word = selectWord.words[randomIndex];
    if (word.length > 4) {
      //loop through word using for each alphabet
      for (let a = 0; a < word.length; a++) {
        if (a == 0) {
          reveal += word[a];
        } else if (a > word.length - 2) {
          reveal += word[a];
        } else {
          reveal += "-";
        }
      }
    } else {
      for (let a = 0; a < word.length; a++) {
        if (a == 0) {
          reveal += word[a];
        } else {
          reveal += "-";
        }
      }
    }
    words += word + " ";
    revealers += reveal + " ";
  }

  return { words: words.trim(), concealer: revealers.trim() };
};

module.exports = { numberstowords };
