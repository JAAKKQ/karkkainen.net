const sentences = [
  "Finnish technology student at Business College Helsinki, with a background at WithSecure, a leading Nordic cyber security company. Skilled in networking, cyber security, web development, and data analysis. Actively seeking opportunities in IT from all over the world to contribute in enhancing system security."
];

const typingText = document.getElementById("typing-text");

let cursenti = 0; // Current Sentence Index
let charIndex = 0;
typingText.textContent = "";

function type() {
  if (charIndex < sentences[cursenti].length) {
    typingText.textContent += sentences[cursenti].charAt(charIndex);
    charIndex++;
    setTimeout(type, 20);
  } else {
    cursenti++;
    charIndex = 0;
    console.log("Done")
    setTimeout(start, sentences[cursenti].length * 100);
  }
}

function start() {
  typingText.textContent = "";
  if (cursenti >= sentences.length) {
    cursenti = 0;
  }
  type();
}

window.onload = function () {
  setTimeout(start, 1000);
};
