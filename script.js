/**
 * Executa comandos nativos do navegador para formatação (execCommand).
 * Exemplo: 'bold', 'italic', 'underline', 'foreColor', etc.
 */
function execCommand(command, value = null) {
    document.execCommand(command, false, value);
  }
  
  /**
   * Altera a cor do texto selecionado usando o color picker.
   */
  function changeTextColorPicker() {
    const colorInput = document.getElementById("colorPicker");
    const color = colorInput.value; // ex: "#ff0000"
    document.execCommand("foreColor", false, color);
  }
  
  /**
   * Formata o texto selecionado como bloco de código usando Prism.js.
   * O usuário deve escolher a linguagem no <select>.
   */
  function formatCode() {
    const message = document.getElementById("message");
    const languageSelector = document.getElementById("languageSelector");
  
    // 1) Verifica qual linguagem foi selecionada
    const language = languageSelector.value;
    if (!language) {
      message.textContent = "Selecione uma linguagem antes de formatar o código.";
      message.style.display = "block";
      setTimeout(() => (message.style.display = "none"), 3000);
      return;
    }
  
    // 2) Obtém o texto selecionado
    const selection = window.getSelection();
    const selectedText = selection.toString();
  
    if (!selectedText.trim()) {
      message.textContent = "Nenhum texto selecionado para formatar como código.";
      message.style.display = "block";
      setTimeout(() => (message.style.display = "none"), 3000);
      return;
    }
  
    // 3) Cria um elemento <pre><code> com a linguagem escolhida
    const preBlock = document.createElement("pre");
    const codeBlock = document.createElement("code");
  
    // Adiciona a classe "language-<linguagem>" que o Prism usa
    codeBlock.className = `language-${language}`;
    codeBlock.textContent = selectedText;
  
    preBlock.appendChild(codeBlock);
  
    // 4) Substitui o texto selecionado pelo bloco <pre><code>
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(preBlock);
  
    // 5) Aplica o Prism ao novo bloco
    Prism.highlightElement(codeBlock);
  
    // 6) Mensagem de sucesso
    message.textContent = `Texto formatado como código (${language}).`;
    message.style.display = "block";
    setTimeout(() => (message.style.display = "none"), 3000);
  }
  