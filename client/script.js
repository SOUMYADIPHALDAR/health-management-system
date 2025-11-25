// === profile page ===
function editProfile() {
      window.location.href = "editProfile.html";
    }


// === login page ===
 function login() {
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      if (user && pass) {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        alert("Please enter username and password!");
      }
    }

    function togglePassword() {
        let pwd = document.getElementById("password");
        if (pwd.type === "password") {
            pwd.type = "text";
        } else {
            pwd.type = "password";
        }
      }

// === edit profile page ===
function goBack() {
      window.history.back();
    }

    function saveProfile() {
      alert("Profile updated successfully!");
      window.location.href ="profile.html"
      return false; // Prevent actual form submission for demo
    }


function editGoal() {
      const newGoal = prompt("Enter your new goal:");
      if (newGoal) {
        alert("Goal updated to: " + newGoal);
      }
    }


// === edit goals===

function openGoalPopup() {
    document.getElementById("goalPopup").style.display = "block";
}

function closePopup(){
    document.getElementById("goalPopup").style.display = "none";
}

function OpenDelPopup(){
  document.getElementById("del-goal").style.display="block";
}

function cancelDel(){
  document.getElementById("del-goal").style.display="none";
}
// Add Goal button
// document.getElementById("addGoalBtn").addEventListener("click", () => {
//     let newGoal = prompt("Enter your new goal:");
//     if (newGoal) {
//         const li = document.createElement("li");
//         li.textContent = newGoal;
//         document.getElementById("goalList").appendChild(li);
//     }
// });
