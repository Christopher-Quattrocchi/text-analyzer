// Utility Logic
function isEmpty(testString) {
  return (testString.trim().length === 0);
}

// Business Logic

function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function(element) {
    if (!Number(element) && !(element === "zoinks")) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function listWordByFrequency(text) {
  if (isEmpty(text)) {
    return null;
  }
  ;
  let textArray = text.split(" ");
  console.log(textArray);
  let wordFrequency = 0;
  textArray.forEach(function(element, index) {
    if (word === element) {
      wordFrequency++;
      console.log(wordFrequency);
      return wordFrequency;
    }
  })
}

// if (isEmpty(word) || isEmpty(text)) {
//   return null;
// }
// const p = document.createElement("p");
// let textArray = text.split(" ");
// textArray.forEach(function(element, index) {
//   if (word === element) {
//     const bold = document.createElement("strong");
//     bold.append(element);
//     p.append(bold);
//   } else {
//     p.append(element);
//   }
//   if (index !== (textArray.length - 1)) {
//     p.append(" ");

// UI Logic

function handleFormSubmission() {
  event.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;

  let boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    document.querySelector("div#bolded-passage").append(boldedPassage);
  } else {
    document.querySelector("div#bolded-passage").innerText = null;
  }
  let wordFrequency = listWordByFrequency(passage);
  if (wordFrequency) {
    const p = document.createElement("p");
    p.append(wordFrequency);
    console.log(p);
    document.querySelector("div#word-frequency").append(p);
  } else {
    document.querySelector("div#word-frequency").innerText = null;
  }
}

window.addEventListener("load", function() {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});

function boldPassage(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
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