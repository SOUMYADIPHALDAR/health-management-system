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