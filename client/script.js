// ================= SIGN UP =================
  async function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed!");
      return;
    }

    alert("Signup successful! Please login.");
    window.location.href = "login.html";

  } catch (error) {
    console.error("Signup error:", error);
    alert("Server error! Is backend running?");
  }
}



// ================= LOGIN =================
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed!");
      return;
    }

    localStorage.setItem("token", data.token || "");
    localStorage.setItem("user", JSON.stringify(data.user || {}));

    alert("Login successful!");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error! Is backend running?");
  }
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
