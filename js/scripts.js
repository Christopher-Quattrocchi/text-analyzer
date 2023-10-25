// Utility Logic
function isEmpty(testString) {
  return testString.trim().length === 0;
}

function getWordsArray(text) {
  return text.split(" ");
}

// Business Logic
function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = getWordsArray(text);
  textArray.forEach(function (element) {
    if (!Number(element) && !(element === "zoinks")) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return 0;
  }
  const textArray = getWordsArray(text);
  let wordCount = 0;
  textArray.forEach(function (element) {
    if (word.toLowerCase() === element.toLowerCase()) {
      wordCount++;
    }
  });
  return wordCount;
}

function getFrequenciesForText(text) {
  if (isEmpty(text)) {
    return [];
  }
  const textArray = text.toLowerCase().split(" ");
  const frequencies = {};

  textArray.forEach(function (word) {
    frequencies[word] = numberOfOccurrencesInText(word, text);
  });
  return Object.entries(frequencies).sort(function (a, b) {
    return b[1] - a[1]; //the number refers to index. the first index is the word, second is the frequency. In this case, we want to specify that frequency is the thing being compared, otherwise this would sort by alphabetical (I think)
  });
}

// UI Logic

function getTextPassage() {
  return document.getElementById("text-passage").value.trim();
}

function getSearchWord() {
  return document.getElementById("word").value.trim();
}

function updateWordCount(newCount) {
  document.getElementById("total-count").innerText = newCount;
}

function updateOccurrencesOfWord(count) {
  document.getElementById("selected-count").innerText = count;
}

function getBoldedPassageDiv() {
  return document.getElementById("bolded-passage");
}

function getWordFrequencyDiv() {
  return document.getElementById("word-frequency");
}

function reset() {
  getWordFrequencyDiv().innerText = "";
  getBoldedPassageDiv().innerText = "";
}

function handleFormSubmission(event) {
  reset();
  event.preventDefault();
  const passage = getTextPassage();
  const word = getSearchWord();
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  updateWordCount(wordCount);
  updateOccurrencesOfWord(occurrencesOfWord);

  const boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    getBoldedPassageDiv().append(boldedPassage);
  } else {
    getBoldedPassageDiv().innerText = null;
  }
  const wordFrequency = getFrequenciesForText(passage);
  if (wordFrequency.length > 0) {
    const olEle = document.createElement("ol");

    wordFrequency.forEach(function (pair) {
      const liEle = document.createElement("li");
      liEle.textContent =
        "The word '" + pair[0] + "' appears " + pair[1] + " times.";
      olEle.append(liEle);
    });

    getWordFrequencyDiv().append(olEle);
  }
}

window.addEventListener("load", function () {
  document
    .querySelector("form#word-counter")
    .addEventListener("submit", handleFormSubmission);
});

function boldPassage(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return null;
  }

  const p = document.createElement("p");
  p.innerHTML = text.replaceAll(word, `<strong>${word}</strong>`);
  return p;
}
