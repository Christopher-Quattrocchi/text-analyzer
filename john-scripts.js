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

  const fOf course, let's break down the `getWordFrequencies` function step by step.

**Function Purpose:**
The function `getWordFrequencies` takes a string `text` as its argument and returns an array of arrays. Each sub-array contains a word and its frequency in the text.

**Detailed Breakdown:**

1. **Check for Empty Input:**
   ```javascript
   if (isEmpty(text)) {
      return [];
   }
   ```
   If the provided text is empty (determined by the `isEmpty` function), the function returns an empty array. This is useful as it ensures the function always returns an array, regardless of whether the input is valid.

2. **Split the Text into Words:**
   ```javascript
   const words = text
      .split(' ')
      .map(function (word) {
        return word.trim();
      });
   ```
   The text is split into individual words using `split(' ')`, resulting in an array of words. The `map` function then loops through each word, trims any extra spaces or line breaks, and returns the cleaned-up word.

3. **Get Unique Words:**
   ```javascript
   const uniqueWords = [...new Set(words)];
   ```
   A new `Set` is used to filter out duplicate words. This results in an array `uniqueWords` containing only unique words from the text. Since a Set inherently contains unique values, spreading it into an array ensures duplicates are removed.

4. **Calculate Frequencies:**
   ```javascript
   const frequencies = [];
   
   let previousFrequency = 0;
   uniqueWords.forEach(function (word) {
     const frequency = numberOfOccurrencesInText(word, text);
     const wordAndFrequency = [word, frequency];
   ```
   An empty array `frequencies` is initialized to store the word-frequency pairs. 
   The function then loops through each unique word, calculates its frequency in the text using the `numberOfOccurrencesInText` function, and creates a sub-array `wordAndFrequency` containing the word and its frequency.

5. **Sort as You Go:**
   ```javascript
   if (frequency > previousFrequency) {
      frequencies.unshift(wordAndFrequency);
   } else {
      frequencies.push(wordAndFrequency);
   }
   previousFrequency = frequency;
   ```
   The function attempts to keep the `frequencies` array sorted based on word frequency. If the current word's frequency is greater than the previous word's frequency, it's added to the beginning of the `frequencies` array using `unshift`. Otherwise, it's added to the end using `push`. The variable `previousFrequency` keeps track of the last processed word's frequency.

6. **Return the Result:**
   ```javascript
   return frequencies;
   ```
   Finally, the function returns the `frequencies` array containing word-frequency pairs.

**Note:**
The "sort as you go" approach doesn't guarantee a fully sorted `frequencies` array. If the unique words in the text aren't processed in descending order of their frequencies, the result might not be sorted. If you need a fully sorted list, you might want to use a separate sorting step after calculating all frequencies.requencies = [];

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
