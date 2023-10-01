const sentences = [
  "I am a Finnish technology student who enjoys creating games, software, and other cool projects.",
  "I am the embodiment of Finnish tech prowess, forever in pursuit of the elusive code, harmonizing my digital symphony while crafting wooden artifacts of unparalleled elegance.",
  "I'm the tech-savvy wizard of the North, blending Finnish finesse with a deep love for all things digital, while serenading the world with my musical musings and crafting masterpieces from wood.",
];

const typingText = document.getElementById("typing-text");
typingText.textContent = "";

const randomIndex = Math.floor(Math.random() * sentences.length);
const randomSentence = sentences[randomIndex];

let charIndex = 0;

function type() {
  if (charIndex < randomSentence.length) {
    typingText.textContent += randomSentence.charAt(charIndex);
    charIndex++;
    setTimeout(type, 10);
  }
}

window.onload = function() {
  setTimeout(type, 500);
};
