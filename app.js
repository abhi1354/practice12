/*
  Personal Dashboard - app.js
  What this file does:
  - Reads the form values (name, email, favorite color)
  - Updates the profile card text + color swatch
  - Small visual feedback so you can tell it updated
*/

// Form inputs
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const colorInput = document.getElementById("colorInput");
const resetBtn = document.getElementById("resetBtn");

// Profile card display elements
const profileCard = document.getElementById("profileCard");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const displayColor = document.getElementById("displayColor");
const colorSwatch = document.getElementById("colorSwatch");
const avatar = document.getElementById("avatar");

// Turns "Abhinav V" into "AV" for the avatar
function getInitials(fullName) {
  const clean = fullName.trim();
  if (!clean) return "U";

  const parts = clean.split(/\s+/);
  const first = parts[0][0] || "U";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Quick little animation class so the card feels responsive
function bumpCard() {
  profileCard.classList.add("bump");
  setTimeout(() => profileCard.classList.remove("bump"), 180);
}

// Updates the profile card based on the current form values
function updateProfileCard() {
  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const colorVal = colorInput.value;

  displayName.textContent = nameVal || "Your Name";
  displayEmail.textContent = emailVal || "you@example.com";

  displayColor.textContent = colorVal;
  colorSwatch.style.background = colorVal;

  avatar.textContent = getInitials(nameVal);

  bumpCard();
}

// When the form is submitted, stop the page refresh and update the card
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateProfileCard();
});

// Live color preview while you drag the color picker
colorInput.addEventListener("input", () => {
  const colorVal = colorInput.value;
  displayColor.textContent = colorVal;
  colorSwatch.style.background = colorVal;
});

// Reset button puts everything back to the defaults
resetBtn.addEventListener("click", () => {
  nameInput.value = "Abhinav V";
  emailInput.value = "abhinav@example.com";
  colorInput.value = "#38bdf8";

  updateProfileCard();
});

// Load the card once on page open so it matches the default form values
updateProfileCard();

// ============================
// TASK MANAGER
// ============================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const sortBtn = document.getElementById("sortTasks");
const filterBtn = document.getElementById("filterTasks");

let tasks = [];

function renderTasks(list = tasks) {

  taskList.innerHTML = "";

  list.forEach(task => {

    const li = document.createElement("li");

    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    li.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    taskList.appendChild(li);
  });
}


taskForm.addEventListener("submit", function(e){

  e.preventDefault();

  const text = taskInput.value.trim();

  if(!text){
    alert("Task cannot be empty");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";

  renderTasks();

});


sortBtn.addEventListener("click", function(){

  tasks.sort(function(a,b){
    return a.text.localeCompare(b.text);
  });

  renderTasks();

});


filterBtn.addEventListener("click", function(){

  const completed = tasks.filter(function(task){
    return task.completed;
  });

  renderTasks(completed);

});
