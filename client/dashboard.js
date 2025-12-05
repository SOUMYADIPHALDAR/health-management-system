const goalNameSelect = document.getElementById("goalName");
const goalDescInput  = document.getElementById("goalDesc");
const goalBox        = document.getElementById("goal-box");

const addPopup    = document.getElementById("goalPopup");
const deletePopup = document.getElementById("deletePopup");

let goals = [];
let deleteIndex = null;

/* ---------- POPUP CONTROL ---------- */
function openGoalPopup() {
  addPopup.style.display = "flex";
}

function closeGoalPopup() {
  addPopup.style.display = "none";
}

function openDeletePopup(index) {
  deleteIndex = index;
  deletePopup.style.display = "flex";
}

function closeDeletePopup() {
  deletePopup.style.display = "none";
  deleteIndex = null;
}

/* ---------- ADD GOAL ---------- */
function addGoal() {
  const selectedValue = goalNameSelect.value;
  const selectedText =
    goalNameSelect.options[goalNameSelect.selectedIndex]?.text || "";

  if (!selectedValue) {
    alert("Please select a goal name");
    return;
  }

  const desc = goalDescInput.value.trim();

  goals.push({
    name: selectedText,   // or selectedValue, both same here
    desc: desc
  });

  saveGoals();
  renderGoals();

  // Reset fields
  goalNameSelect.selectedIndex = 0; // back to "Select goal name"
  goalDescInput.value = "";
  closeGoalPopup();
}

/* ---------- DELETE GOAL ---------- */
function confirmDelete() {
  if (deleteIndex !== null && deleteIndex >= 0 && deleteIndex < goals.length) {
    goals.splice(deleteIndex, 1);
    saveGoals();
    renderGoals();
  }
  closeDeletePopup();
}

/* ---------- RENDER GOALS ---------- */
function renderGoals() {
  goalBox.innerHTML = "";

  goals.forEach((g, index) => {
    const li = document.createElement("li");
    li.className = "goal-item";

    li.innerHTML = `
      <span class="goal-text">
        <strong>${g.name}</strong>
        <small>${g.desc || ""}</small>
      </span>
      <i class="fa-solid fa-trash delete-icon"></i>
    `;

    li.querySelector(".delete-icon").onclick = () => openDeletePopup(index);

    goalBox.appendChild(li);
  });
}

/* ---------- STORAGE ---------- */
function saveGoals() {
  localStorage.setItem("goalsJSON", JSON.stringify(goals));
}

function loadGoals() {
  const saved = localStorage.getItem("goalsJSON");
  goals = saved ? JSON.parse(saved) : [];
  renderGoals();
}

loadGoals();


