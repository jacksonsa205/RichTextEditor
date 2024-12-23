function execCommand(command, value = null) {
    document.execCommand(command, false, value);
}

function formatCode() {
    const editor = document.getElementById("editor");
    const message = document.getElementById("message");

    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (!selectedText.trim()) {
        message.textContent = "Nenhum código identificado.";
        message.style.display = "block";
        setTimeout(() => (message.style.display = "none"), 3000);
        return;
    }

    const detectedLanguage = hljs.highlightAuto(selectedText);
    const languageName = detectedLanguage.language;

    if (!languageName) {
        message.textContent = "Não foi possível identificar a linguagem.";
        message.style.display = "block";
        setTimeout(() => (message.style.display = "none"), 3000);
        return;
    }

    const codeBlock = document.createElement("pre");
    const code = document.createElement("code");
    code.className = `language-${languageName} hljs`; // Adiciona a classe `hljs`
    code.textContent = selectedText;

    codeBlock.appendChild(code);

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(codeBlock);

    // Aplique o Highlight.js manualmente ao novo código
    hljs.highlightElement(code);

    message.textContent = `Código formatado como ${languageName}.`;
    message.style.display = "block";
    setTimeout(() => (message.style.display = "none"), 3000);
}
