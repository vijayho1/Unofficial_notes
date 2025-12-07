document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const passwordLabel = document.getElementById("password-label");
  const otpInput = document.getElementById("otp");
  const otpLabel = document.getElementById("otp-label");
  const submitBtn = form.querySelector("input[type='submit']");
  const errorMsg = document.getElementById("error-msg");

  const API_URL = "http://localhost:5000/api/auth"; // Change to your backend URL

  let emailValidated = false;
  let otpVerified = false;
  let currentEmail = "";
  let attemptedSubmit = false;
  let authToken = "";

  // Real-time email validation as user types (only show error after first attempt)
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@kletech\.ac\.in$/;

    if (email && regex.test(email)) {
      submitBtn.disabled = false;
      errorMsg.style.display = "none";
    } else if (email && !regex.test(email) && attemptedSubmit) {
      submitBtn.disabled = true;
      errorMsg.style.display = "block";
    } else {
      submitBtn.disabled = true;
      errorMsg.style.display = "none";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Step 1: Send OTP
    if (!emailValidated) {
      const email = emailInput.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@kletech\.ac\.in$/;

      attemptedSubmit = true;

      if (!email) {
        showError("Please enter your email!");
        return;
      }

      if (!regex.test(email)) {
        errorMsg.style.display = "block";
        showError("Only @kletech.ac.in emails are allowed!");
        return;
      }

      // Call backend to send OTP
      try {
        submitBtn.disabled = true;
        submitBtn.value = "Sending OTP...";

        const response = await fetch(`${API_URL}/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
          showError(data.message || "Failed to send OTP");
          submitBtn.disabled = false;
          submitBtn.value = "Login";
          return;
        }

        // Email is valid, reveal OTP field
        currentEmail = email;
        emailValidated = true;

        // Disable email input
        emailInput.disabled = true;

        // Reveal OTP field
        otpInput.style.display = "block";
        otpLabel.style.display = "block";
        otpInput.focus();

        showSuccess("✅ OTP has been sent to your email!");
        submitBtn.value = "Verify OTP";
        submitBtn.disabled = false;
      } catch (err) {
        showError("Network error: " + err.message);
        submitBtn.disabled = false;
        submitBtn.value = "Login";
      }
      return;
    }

    // Step 2: Verify OTP and unlock password
    if (emailValidated && !otpVerified) {
      const otp = otpInput.value.trim();

      if (!otp) {
        showError("Please enter the OTP sent to your email!");
        return;
      }

      if (otp.length < 4) {
        showError("OTP must be at least 4 characters!");
        return;
      }

      // Call backend to verify OTP
      try {
        submitBtn.disabled = true;
        submitBtn.value = "Verifying OTP...";

        const response = await fetch(`${API_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentEmail, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
          showError(data.message || "Failed to verify OTP");
          submitBtn.disabled = false;
          submitBtn.value = "Verify OTP";
          return;
        }

        // OTP verified, store token and show password field
        authToken = data.token;
        otpVerified = true;
        otpInput.disabled = true;
        otpInput.style.display = "none";
        otpLabel.style.display = "none";

        // Show password field
        passwordInput.style.display = "block";
        passwordLabel.style.display = "block";
        passwordInput.focus();

        showSuccess("✅ OTP verified! Now enter your password to login.");
        submitBtn.value = "Login";
        submitBtn.disabled = false;
      } catch (err) {
        showError("Network error: " + err.message);
        submitBtn.disabled = false;
        submitBtn.value = "Verify OTP";
      }
      return;
    }

    // Step 3: Final login with password (OTP already verified, won't ask again)
    if (otpVerified) {
      const password = passwordInput.value.trim();

      if (!password) {
        showError("Please enter your password!");
        return;
      }

      // Call backend to set password and complete login
      try {
        submitBtn.disabled = true;
        submitBtn.value = "Logging in...";

        const response = await fetch(`${API_URL}/set-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authToken, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          showError(data.message || "Failed to login");
          submitBtn.disabled = false;
          submitBtn.value = "Login";
          return;
        }

        showSuccess("✅ Login successful! Redirecting to dashboard...");

        // Store token for future requests
        localStorage.setItem("authToken", authToken);

        // Redirect to selection.html after a brief delay
        setTimeout(() => {
          window.location.href = "./selection.html";
        }, 1000);
      } catch (err) {
        showError("Network error: " + err.message);
        submitBtn.disabled = false;
        submitBtn.value = "Login";
      }
    }
  });

  // Helper function to show error messages
  function showError(message) {
    alert(message); // TODO: Replace with better toast/notification system
  }

  // Helper function to show success messages
  function showSuccess(message) {
    console.log(message); // TODO: Replace with better toast/notification system
  }
});