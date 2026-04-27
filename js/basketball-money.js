document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const languageButtons = document.querySelectorAll(".lang-btn");
  const copyButton = document.getElementById("copyPromptBtn");
  const copyStatus = document.getElementById("copyStatus");

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.getAttribute("data-lang");

      body.classList.remove("lang-en", "lang-es");
      body.classList.add(`lang-${selectedLanguage}`);

      languageButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      if (copyStatus) {
        copyStatus.textContent = "";
      }
    });
  });

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const isSpanish = body.classList.contains("lang-es");
      const promptElement = document.getElementById(isSpanish ? "prompt-es" : "prompt-en");

      if (!promptElement) return;

      const promptText = promptElement.textContent.trim();

      try {
        await navigator.clipboard.writeText(promptText);

        copyStatus.textContent = isSpanish
          ? "Prompt copiado. Ahora abre el Basketball Money GPT y pégalo para comenzar."
          : "Prompt copied. Now open the Basketball Money GPT and paste it to begin.";
      } catch (error) {
        copyStatus.textContent = isSpanish
          ? "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente."
          : "Could not copy automatically. Select the text and copy it manually.";
      }
    });
  }
});
