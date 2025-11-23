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

// === edit profile page ===
function goBack() {
      window.history.back();
    }

    function previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    function saveProfile() {
      alert("Profile updated successfully!");
      window.location.href ="profile.html"
      return false; // Prevent actual form submission for demo
    }

// === dashboard page ===
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
const popup = document.getElementById("goalPopup");

// Show popup when Edit button is clicked
document.getElementById("editBtn").addEventListener("click", () => {
    popup.style.display = "block";
});

// Hide popup when Close button clicked
document.getElementById("closePopup").addEventListener("click", () => {
    popup.style.display = "none";
});

// Add Goal button
document.getElementById("addGoalBtn").addEventListener("click", () => {
    let newGoal = prompt("Enter your new goal:");
    if (newGoal) {
        const li = document.createElement("li");
        li.textContent = newGoal;
        document.getElementById("goalList").appendChild(li);
    }
});
