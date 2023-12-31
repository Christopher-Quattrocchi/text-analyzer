// Utility Logic

function isEmpty() {
  for (let i=0; i < arguments.length; i++){
    if (arguments[i].trim().length === 0){
      return true;
    }
  }
  return false;
}

//old version that doesn't use for loop
// function isEmpty(testString) {
//   return (testString.trim().length === 0);
// }

// Business Logic

//for loop example
function firstInstanceOfWord(word, text) {
  const textArray = text.split(" ");
  for (let i = 0; i < textArray.length; i++) {
    console.log(i);
    if (word === textArray[i]) {
      return i;
    }
  }
  return -1;
}

//example of this function using a forEach loop instead. The negative one is another way of saying "false"

// function firstInstanceOfWord(word, text) {
//   const textArray = text.split(" ");
//   let position = -1;
//   textArray.forEach(function (element, index) {
//     console.log(index);
//     if ((word === element) && (position === -1)) {
//       position = index;
//     }
//   });
//   return position;
// }

function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
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
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function (element) {
    if (word.toLowerCase() === element.toLowerCase()) {
      wordCount++;
    }
  });
  return wordCount;
}

function listWordByFrequency(text) {
  if (isEmpty(text)) {
    return [];
  }
  let textArray = text.toLowerCase().split(" ");
  const frequencies = {};

  textArray.forEach(function (word) {
    frequencies[word] = numberOfOccurrencesInText(word, text);
  });
  return Object.entries(frequencies).sort(function (a, b) {
    return b[1] - a[1]; //the number refers to index. the first index is the word, second is the frequency. In this case, we want to specify that frequency is the thing being compared, otherwise this would sort by alphabetical (I think)
  });
}

// Object.entries(wordFrequency).forEach(function([key, value]) { //this thing
//   console.log(key, value);

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
  if (wordFrequency.length > 0) {
    const olEle = document.createElement("ol");

    wordFrequency.forEach(function (pair) {
      const liEle = document.createElement("li");
      liEle.textContent = "The word '" + pair[0] + "' appears " + pair[1] + " times.";
      olEle.append(liEle);
    })

    // liEle.append(JSON.stringify(wordFrequency)); //No longer necessary but good to know

    //clears previous result
    document.querySelector("div#word-frequency").innerHTML = "";
    document.querySelector("div#word-frequency").append(olEle);
  } else {
    document.querySelector("div#word-frequency").innerText = null;
  }
}

window.addEventListener("load", function () {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});

function boldPassage(word, text) {
  if (isEmpty(word, text)) {
    return null;
  }

  const p = document.createElement("p");
  let textArray = text.split(" ");

  textArray.forEach(function (element, index) {
    //check if element contains word as a substring
    if (element.includes(word)) {
      //split element by target word
      let parts = element.split(word);
      //check if first part of the array created with split is empty or not
      if (parts[0]) {
        //if not, append it
        p.append(parts[0]);
      }
      const bold = document.createElement("strong");
      //since we know that this string contains word, we can safely append it
      bold.append(word);
      p.append(bold);
      //check is second part of the array is empty
      if (parts[1]) {
        //if not empty, we can append it
        p.append(parts[1]);
      }
    } else {
      //if the element doesn't contain word, this happens
      p.append(element);
    }
    //adds a space after every word, unless it is the last word in the string
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });

  return p;
}

// function boldPassage(word, text) {
//   if (isEmpty(word) || isEmpty(text)) {
//     return null;
//   }
//   const p = document.createElement("p");
//   let textArray = text.split(" ");
//   textArray.forEach(function(element, index) {
//     if (word === element) {
//       const bold = document.createElement("strong");
//       bold.append(element);
//       p.append(bold);
//     } else {
//       p.append(element);
//     }
//     if (index !== (textArray.length - 1)) {
//       p.append(" ");
//     }
//   });
//   return p;
// }