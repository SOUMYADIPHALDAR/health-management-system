// === SIGN UP PAGE ===
const form = document.getElementById("signupForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

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

    alert("Account created successfully!");

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "dashboard.html";
  });
}


// === LOGIN PAGE ===
function login() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value;

  if (email === "" || pass === "") {
    alert("Please enter Email and Password!");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email address.");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && email === storedUser.email && pass === storedUser.password) {
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password!");
  }
}


// === TOGGLE PASSWORD ===
function togglePassword() {
  let pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}


// === PROFILE PAGE ===
function editProfile() {
  window.location.href = "editProfile.html";
}

function goBack() {
  window.history.back();
}

function saveProfile() {
  alert("Profile updated successfully!");
  window.location.href = "profile.html";
  return false;
}
