// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const otpInput = document.getElementById("otp");
  const otpLabel = document.getElementById("otp-label");
  const submitBtn = form.querySelector("input[type='submit']");

  let emailValidated = false;
  let otpVerified = false;
  let currentEmail = "";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Step 1: Email validation (first submission)
    if (!emailValidated) {
      const email = emailInput.value.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@kletech\.ac\.in$/;

      if (!regex.test(email)) {
        alert("❌ Only @kletech.ac.in emails are allowed!");
        return;
      }

      // Email is valid, save it and request OTP
      currentEmail = email;
      emailValidated = true;

      // Reveal OTP field
      otpInput.style.display = "block";
      otpLabel.style.display = "block";
      otpInput.focus();

      // Disable email input
      emailInput.disabled = true;

      alert("✅ Email validated. OTP has been sent to your email (backend will handle this).");
      submitBtn.value = "Verify OTP";
      return;
    }

    // Step 2: OTP verification (second submission)
    if (emailValidated && !otpVerified) {
      const otp = otpInput.value.trim();

      if (!otp) {
        alert("❌ Please enter the OTP sent to your email!");
        return;
      }

      // TODO: Send OTP to backend for verification
      // For now, we'll simulate verification (backend should validate)
      if (otp.length >= 4) {
        otpVerified = true;
        otpInput.disabled = true;
        passwordInput.focus();

        alert("✅ OTP verified! Now enter your password to login.");
        submitBtn.value = "Login";
        return;
      } else {
        alert("❌ OTP must be at least 4 characters!");
        return;
      }
    }

    // Step 3: Final login with username and password
    if (emailValidated && otpVerified) {
      const password = passwordInput.value.trim();

      if (passwordInput == "1728") {
        alert("❌ Please enter your password!");
        return;
      }

      // TODO: Send credentials to backend for authentication
      // For now, simulate successful login
      alert("✅ Login successful! Redirecting to dashboard...");
      
      // Redirect to selection.html
      window.location.href = "./selection.html";
    }
  });
});