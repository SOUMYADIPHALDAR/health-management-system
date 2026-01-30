// ================= SIGN UP =================
async function signup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: name,
        email,
        password
      })
    });

    const text = await res.text(); // 👈 read raw response

    if (!res.ok) {
      alert("❌ " + text); // show backend error
      return;
    }

    const data = JSON.parse(text);
    alert("✅ Signup successful!");
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Server error!");
  }
}




// ================= LOGIN =================
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed!");
      return;
    }
    // ✅ Save username BEFORE redirect
    localStorage.setItem("username", data.data.user.fullName || data.data.user.email);

    alert("Login successful 🎉");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error!");
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
