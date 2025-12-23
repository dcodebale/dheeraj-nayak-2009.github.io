

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2viueBJ_CeP6G9nAI61viJo9Po2GdnoGZDOZnDvV4AyIYMbtyfSguVjNBp7DSXOZx-w/exec";
const track = document.getElementById("feedbackTrack");

const colors = ["#fff36a", "#ffb3c6", "#bde0fe", "#caffbf", "#ffd6a5"];

// Load feedbacks
async function loadFeedbacks() {
  const res = await fetch(`${SCRIPT_URL}?type=feedback`);
  const data = await res.json();

  track.innerHTML = "";

  data.forEach((item, i) => {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.dataset.num = i + 1;
    note.style.setProperty("--note-color", colors[i % colors.length]);
    note.style.setProperty("--rotate", `${Math.random()*15-3}deg`);

    note.innerHTML = `
      <div>${item.message.slice(0, 80)}...</div>
      <span>~ ${item.name}</span>
    `;

    note.onclick = () => openRead(item.message, item.name);
    track.appendChild(note);
  });
}

// Read popup
function openRead(text, name) {
  document.getElementById("readText").textContent = text;
  document.getElementById("readName").textContent = `~ ${name}`;
  document.getElementById("readPopup").style.display = "flex";
}
function closeRead() {
  document.getElementById("readPopup").style.display = "none";
}

// Add feedback popup
document.getElementById("openFeedback").onclick = () => {
  document.getElementById("feedbackPopup").style.display = "flex";
};
function closeFeedback() {
  document.getElementById("feedbackPopup").style.display = "none";
}

// Submit feedback
document.getElementById("feedbackForm").addEventListener("submit", async e => {
  e.preventDefault();

  // disable submit button to prevent multiple submissions
  const submitButton = e.target.querySelector('button[type="submit"]');
  submitButton.textContent = "Updating...";
  submitButton.disabled = true;
  submitButton.style.pointerEvents = "none";

  const fd = new FormData();
  fd.append("name", feedbackName.value);
  fd.append("message", feedbackText.value);
  fd.append("type", "feedback");

  await fetch(SCRIPT_URL, { method: "POST", body: fd });

  closeFeedback();
  feedbackForm.reset();
  loadFeedbacks();
});

// Submit contact form
document.getElementById("contact-form").addEventListener("submit", async e => {
  e.preventDefault();

  const submitButton = e.target.querySelector('button[type="submit"]');
  const sendText = submitButton.querySelector('.send-text');
  sendText.textContent = "Sending...";
  submitButton.disabled = true;

  const fd = new FormData();
  fd.append("name", e.target.name.value+" (Email: "+e.target.email.value+")");
  fd.append("message", e.target.message.value);
  fd.append("type", "contact");

  await fetch(SCRIPT_URL, { method: "POST", body: fd });

  sendText.textContent = "SEND";
  submitButton.disabled = true;
  e.target.reset();
});

// Initial load
loadFeedbacks();

// Custom cursor and drag scrolling for feedback wall
if (window.innerWidth >= 768) {
const feedbackWall = document.querySelector('.feedback-wall');
const customCursor = document.querySelector('.custom-cursor');
let isDragging = false;
let startX;
let scrollLeft;

feedbackWall.addEventListener('mouseenter', () => {
  customCursor.style.display = 'block';
});

feedbackWall.addEventListener('mouseleave', () => {
  customCursor.style.display = 'none';
});

feedbackWall.addEventListener('mousemove', (e) => {
  customCursor.style.left = e.clientX - 10 + 'px';
  customCursor.style.top = e.clientY - 10 + 'px';
});

feedbackWall.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  scrollLeft = feedbackWall.scrollLeft;
  feedbackWall.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.clientX;
  const walk = (x - startX) * 2; // Scroll speed
  feedbackWall.scrollLeft = scrollLeft - walk;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  feedbackWall.style.userSelect = '';
});
}
