document.addEventListener("DOMContentLoaded", () => {

  // ---- Product Search ----
  const searchBar = document.getElementById("searchBar");
  const products = document.querySelectorAll(".product-card");

  if (searchBar) {
    searchBar.addEventListener("keyup", (e) => {
      const term = e.target.value.toLowerCase();
      products.forEach(product => {
        const name = product.getAttribute("data-name").toLowerCase();
        product.style.display = name.includes(term) ? "block" : "none";
      });
    });
  }

  // ---- Form Validations ----
  const registerForm = document.querySelector("form[action='#']"); // assume register form
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent default submit

      const name = registerForm.querySelector('input[type="text"]').value.trim();
      const email = registerForm.querySelector('input[type="email"]').value.trim();
      const password = registerForm.querySelector('input[type="password"]').value.trim();

      // Name validation
      if (name.length < 2) {
        alert("Please enter a valid full name.");
        return;
      }

      // Email validation
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Password validation
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
      if (!password.match(passwordPattern)) {
        alert("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
        return;
      }

      alert("Registration successful!");
      registerForm.reset();
    });
  }

  // ---- Login Form Validation ----
  const loginForm = document.querySelector("form.login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = loginForm.querySelector('input[type="password"]').value.trim();

      if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
      }

      // Optional: validate email format
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Login successful!");
      loginForm.reset();
    });
  }

});

