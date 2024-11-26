document.addEventListener("DOMContentLoaded", () => {
    const passwordPage = document.getElementById("password-page");
    const gamePage = document.getElementById("game-page");
    const passwordInput = document.getElementById("password-input");
    const submitPassword = document.getElementById("submit-password");
    const passwordError = document.getElementById("password-error");
    const message = document.getElementById("message");
    const timerDisplay = document.getElementById("timer");
    const buttons = document.querySelectorAll(".btn");
    const errorSound = document.getElementById("error-sound");
  
    const correctPassword = "1234";
    let timeLeft = 180; // 3 minutes in seconds
    let timerInterval;
    let failedAttempts = 0;
  
    // Password validation
    submitPassword.addEventListener("click", () => {
      if (passwordInput.value === correctPassword) {
        passwordPage.classList.add("hidden");
        gamePage.classList.remove("hidden");
        startTimer();
      } else {
        passwordError.textContent = "Senha incorreta. Tente novamente.";
      }
    });
  
    // Game logic
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.id === "reiniciar") {
          showMessage("Sistema restaurado com sucesso!", "success");
          document.body.style.backgroundColor = "green";
          clearInterval(timerInterval);
          disableButtons();
        } else {
          timeLeft -= 30; // Penalize 30 seconds
          playErrorSound();
          if (timeLeft <= 0) {
            showMessage("Tempo esgotado! Você perdeu.", "error");
            clearInterval(timerInterval);
            disableButtons();
          } else {
            showMessage("Sistema comprometido! Escolha novamente.", "error");
            document.body.style.backgroundColor = "red";
          }
        }
      });
    });
  
    function showMessage(text, type) {
      message.className = type;
      message.textContent = text;
    }
  
    function disableButtons() {
      buttons.forEach(button => (button.disabled = true));
    }
  
    function startTimer() {
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          showMessage("Tempo esgotado! Você perdeu.", "error");
          disableButtons();
        }
      }, 1000);
    }
  
    function updateTimerDisplay() {
      const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
      const seconds = (timeLeft % 60).toString().padStart(2, "0");
      timerDisplay.textContent = `Tempo restante: ${minutes}:${seconds}`;
    }
  
    function playErrorSound() {
      errorSound.play();
    }
  });
  