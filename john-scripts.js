// Utility Logic
function isEmpty(testString) {
  return (testString.trim().length === 0);
}

// Business Logic
function getWordCount(text) {
  if (isEmpty(text)) {
    return 0;
  }
  const bannedWords = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"];
  let wordCount = 0;
  const words = text.split(" ");
  words.forEach(function (word) {
    if (!Number(word) && !(bannedWords.includes(word))) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const words = text.split(" ");
  let wordCount = 0;
  words.forEach(function (element) {
    if (element.toLowerCase() === word.toLowerCase()) {
      wordCount++;
    }
  });
  return wordCount;
}

function getWordFrequencies(text) {
  if (isEmpty(text)) {
    // return an empty array so we know this function always returns an array of some kind. This
    // way we don't need to check if it's null. We can just forEach over the result and if the text was
    // empty the forEach just won't do anything.
    return [];
  }

  const words = text
    .split(' ') // Get an array of words
    .map(function (word) {
      return word.trim(); // make sure we remove any spaces or line breaks
    });
  const uniqueWords = [...new Set(words)];

  const frequencies = [];

  let previousFrequency = 0;
  uniqueWords.forEach(function (word) {
    const frequency = numberOfOccurrencesInText(word, text);
    const wordAndFrequency = [word, frequency];

    // Sort as we go.
    if (frequency > previousFrequency) {
      frequencies.unshift(wordAndFrequency);
    } else {
      frequencies.push(wordAndFrequency);
    }
    previousFrequency = frequency;
  });

  return frequencies;
}

// UI Logic

function handleFormSubmission(event) {
  event.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = getWordCount(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;

  let boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    document.querySelector("div#bolded-passage").append(boldedPassage);
  } else {
    document.querySelector("div#bolded-passage").innerText = null;
  }
  const frequencies = getWordFrequencies(passage);

  const list = document.createElement('ol');
  frequencies.forEach(function (wordAndFrequencyPair) {
    const word = wordAndFrequencyPair[0];
    const frequency = wordAndFrequencyPair[1];
    const listItem = document.createElement('li');
    listItem.innerText = `${word} (${frequency})`;
    list.appendChild(listItem);
  });

  document.querySelector("div#word-frequency").append(list);
}

window.addEventListener("load", function () {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});

function boldPassage(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (word === element) {
      const bold = document.createElement("strong");
      bold.append(element);
      p.append(bold);
    } else {
      p.append(element);
    }
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });
  return p;
}
