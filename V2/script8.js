
const words = [
  "Programmer",
  "Frontend Developer",
  "Python Enthusiast",
  "3D Designer",
  "Game Developer",
  "Keyboardist",
  "Tech Enthusiast",
];

const textElement = document.getElementById("typeText");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 80;
const deletingSpeed = 40;
const holdAfterType = 1200;
const holdAfterDelete = 400;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    textElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, holdAfterType);
      return;
    }
  } else {
    textElement.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      setTimeout(() => {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeEffect();
      }, holdAfterDelete);
      return;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();
