// === sign up page ===
// Select the form
const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form from reloading the page

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!email.includes("@")) {
        alert("Enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Success
    alert("Account created successfully!");
    
    // Example: save data in localStorage
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to login page (optional)
    window.location.href = "dashboard.html";
});



// === profile page ===
function editProfile() {
      window.location.href = "editProfile.html";
    }


// === login page ===
 function login() {
      const user = document.getElementById("email").value;
      const pass = document.getElementById("password").value;

      if (user && pass) {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        alert("Please enter Email Address and Password!");
      }

      if (!email.includes("@")) {
        alert("Enter a valid email address.");
        return;
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


