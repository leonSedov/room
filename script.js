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
  const successSound = document.getElementById("success-sound");

  const correctPassword = "1234"; // Altere para a senha desejada
  let timeLeft = 180; // 3 minutos em segundos
  let timerInterval;

  // Flag para evitar que o som de erro seja tocado fora do contexto do jogo
  let isGameActive = false;

  // Validação da senha
  submitPassword.addEventListener("click", () => {
    if (passwordInput.value === correctPassword) {
      passwordPage.classList.add("hidden");
      gamePage.classList.remove("hidden");
      isGameActive = true; // Ativa o contexto do jogo
      startTimer();
    } else {
      passwordError.textContent = "Senha incorreta. Tente novamente.";
      // Não tocar o som aqui
    }
  });

  // Lógica do jogo
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isGameActive) return; // Garantir que o som de erro só toque no jogo

      if (button.id === "reiniciar") {
        showMessage("Sistema restaurado com sucesso!", "success");
        document.body.style.backgroundColor = "green";
        successSound.play(); // Toca som de sucesso
        clearInterval(timerInterval);
        disableButtons();

        // Redirecionar para a página do hacker após o sucesso
        setTimeout(() => {
          window.location.href = "hacker.html"; // Substitua por sua página
        }, 3000);
      } else {
        timeLeft -= 30; // Penalizar 30 segundos
        if (timeLeft > 0) {
          errorSound.play(); // Toca som de erro aqui
          showMessage("Sistema comprometido! Escolha novamente.", "error");
          document.body.style.backgroundColor = "red";
        } else {
          showMessage("Tempo esgotado! Você perdeu.", "error");
          clearInterval(timerInterval);
          disableButtons();
        }
      }
    });
  });

  function showMessage(text, type) {
    message.className = type;
    message.textContent = text;
  }

  function disableButtons() {
    buttons.forEach((button) => (button.disabled = true));
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
});
