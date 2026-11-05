import { useState, useRef } from "react";

export default function VoiceAgent() {
  const [ouvindo, setOuvindo] = useState(false);
  const recognitionRef = useRef(null);

  function handleToggleOuvir() {
    // 1. Pega a API do navegador (Chrome usa webkitSpeechRecognition)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz. Use o Chrome.");
      return;
    }

    // 2. Se já está ouvindo, para
    if (ouvindo) {
      recognitionRef.current?.stop();
      setOuvindo(false);
      return;
    }

    // 3. Se não está ouvindo, cria e inicia
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      console.log("🎤 Começou a ouvir...");
      setOuvindo(true);
    };

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      console.log("Transcrição:", texto);
    };

    recognition.onend = () => {
      console.log("⏹️ Parou de ouvir");
      setOuvindo(false);
    };

    recognition.onerror = (event) => {
      console.error("Erro no reconhecimento:", event.error);
      setOuvindo(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <div style={styles.container}>
      <p style={styles.label}>Pergunte pro AgroDecide</p>
      <p style={styles.sublabel}>
        Ex: "Posso pulverizar hoje?" • "Preciso irrigar?"
      </p>

      <button
        type="button"
        onClick={handleToggleOuvir}
        style={{
          ...styles.button,
          background: ouvindo ? "#e74c3c" : "#2e7d32",
        }}
        aria-label="Falar com o AgroDecide"
      >
        {ouvindo ? "🔴" : "🎤"}
      </button>

      <p style={styles.status}>
        {ouvindo ? "Ouvindo..." : "Toque para falar"}
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "16px 12px",
    marginTop: 12,
    background: "#f0f7e6",
    borderRadius: 16,
    textAlign: "center",
  },
  label: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: "#2e7d32",
  },
  sublabel: {
    margin: 0,
    fontSize: 13,
    color: "#555",
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: 30,
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  status: {
    margin: 0,
    fontSize: 13,
    color: "#666",
  },
};