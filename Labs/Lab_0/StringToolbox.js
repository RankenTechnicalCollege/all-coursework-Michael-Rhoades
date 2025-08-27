
function VowelCount(string) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    let c = string[i].toLowerCase();
    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') {
      count++;
    }
  }
  return count;
}

function ReverseString(string) {
  let reversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }
  return reversed;
}

const CapitalizeWords = function capWords(string) {
  let wasSpace = true;
  let capitalized = '';
  for (let i = 0; i < string.length; i++) {
    if (wasSpace && string[i] !== ' ') {
      capitalized += string[i].toUpperCase();
      wasSpace = false;
    }
    else if (string[i] === ' ') {
      capitalized += string[i];
      wasSpace = true;
    }
    else {
      capitalized += string[i];
    }
  }
  return capitalized;
}

const WordCount = (string) => {
  let count = 0;
  let wasSpace = true;
  for (let i = 0; i < string.length; i++) {
    if (wasSpace && string[i] !== ' ') {
      count++;
      wasSpace = false;
    }
    else if (string[i] === ' ') {
      wasSpace = true;
    }
  }
  return count;
}

const ConcatenateStrings = (string1, string2) => {
  return string1 + string2;
}

let mode = 1;

let toggle = () => {
    if (mode != 5) {
      mode++;
    }
    else {
      mode = 1;
    }
}

let getModeName = () => {
  if (mode == 1) {
    return "Vowel Count";
  }
  else if (mode == 2) {
    return "Reverse String";
  }
  else if (mode == 3) {
    return "Capitalize Words";
  }
  else if (mode == 4) {
    return "Word Count";
  }
  else if (mode == 5) {
    return "Concatenate Strings";
  }
}

let getMode = () => {
  if (mode == 1) {
    return VowelCount;
  }
  else if (mode == 2) {
    return ReverseString;
  }
  else if (mode == 3) {
    return CapitalizeWords;
  }
  else if (mode == 4) {
    return WordCount;
  }
  else if (mode == 5) {
    return ConcatenateStrings;
  }
}

document.getElementById("buttonShow").addEventListener("click", () => {
    if (mode == 5) {
      document.getElementById('showText').innerText = `${getModeName()} Result: ${getMode()(document.getElementById('txtUserInput').value, document.getElementById('txtUserInput2').value)}`;
      return;
    }
    else {
      document.getElementById('showText').innerText = `${getModeName()} Result: ${getMode()(document.getElementById('txtUserInput').value)}`;
    }
});

document.getElementById("buttonToggle").addEventListener("click", () => {
    toggle();
    document.getElementById('lblTitle').innerText = `${getModeName()}`;
});