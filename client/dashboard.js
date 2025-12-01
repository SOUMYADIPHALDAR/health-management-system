const labelInput = document.getElementById("label");
const goalInput = document.getElementById("goal");
const goalBox = document.getElementById("goal-box");
const deletePopup = document.getElementById("del-goal");
const goalPopup = document.getElementById("goalPopup");

let goals = [];
let deleteIndex = null;

// ============ POPUP CONTROL ============
function openGoalPopup() {
  goalPopup.style.display = "flex";
}

function closePopup() {
  goalPopup.style.display = "none";
}

// ============ DELETE POPUP ============
function openDeletePopup(index) {
  deleteIndex = index;
  deletePopup.style.display = "flex";
}

function cancelDel() {
  deletePopup.style.display = "none";
}

function deleteGoal() {
  goals.splice(deleteIndex, 1);
  saveGoals();
  renderGoals();
  deletePopup.style.display = "none";
}

// ============ ADD GOAL ============
function addGoal() {
  if (!labelInput.value.trim()) return alert("Enter a goal name");

  goals.push({
    name: labelInput.value,
    target: goalInput.value
  });

  saveGoals();
  renderGoals();

  labelInput.value = "";
  goalInput.value = "";
  closePopup();
}

// ============ RENDER GOALS ============
function renderGoals() {
  goalBox.innerHTML = "";

  goals.forEach((g, index) => {
    const li = document.createElement("li");
    li.className = "goal-item";

    li.innerHTML = `
      <span class="goal-text"> 
        <strong>${g.name}</strong>
        <small>${g.target}</small>
      </span>

      <i class="fa-solid fa-trash delete-icon"></i>
    `;

    li.querySelector(".delete-icon").onclick = () => openDeletePopup(index);
    goalBox.appendChild(li);
  });
}

// ============ STORAGE ============
function saveGoals() {
  localStorage.setItem("goalsJSON", JSON.stringify(goals));
}

function loadGoals() {
  const saved = localStorage.getItem("goalsJSON");
  goals = saved ? JSON.parse(saved) : [];
  renderGoals();
}

loadGoals();
