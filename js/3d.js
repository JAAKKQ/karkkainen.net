document.addEventListener("DOMContentLoaded", function () {
  const sentences = [
    "I am a Finnish technology student who enjoys creating games, software, and other cool projects.",
    "I'm a Finnish technology student who develops games, software, and other exciting projects.",
    "With my passion for technology as a Finn, I craft games, software, and other awesome projects.",
  ];

  const typingText = document.getElementById("typing-text");

  const randomIndex = Math.floor(Math.random() * sentences.length);
  const randomSentence = sentences[randomIndex];

  let charIndex = 0;

  function type() {
    if (charIndex < randomSentence.length) {
      typingText.textContent += randomSentence.charAt(charIndex);
      charIndex++;
      setTimeout(type, 35);
    }
  }

  type();
});