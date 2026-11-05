import { useState, useRef, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { enviarPerguntaVoz } from "../../services/vozService";

export default function VoiceAgent() {
  const [ouvindo, setOuvindo] = useState(false);
  const [pensando, setPensando] = useState(false);
  const [resposta, setResposta] = useState("");
  const [ultimaPergunta, setUltimaPergunta] = useState("");
  const recognitionRef = useRef(null);

  // Pega a localização que já foi capturada ao iniciar o app
  const { location } = useContext(WeatherContext);

  function falarResposta(texto) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }

  async function enviarParaAPI(pergunta) {
    if (!location) {
      const msg = "Ainda estou buscando sua localização, tenta de novo em um segundo.";
      setResposta(msg);
      falarResposta(msg);
      return;
    }

    try {
      setPensando(true);
      setResposta("");
      console.log("--- VOZ -> API ---");
      console.log("Pergunta:", pergunta);
      console.log("Location:", location);

      const data = await enviarPerguntaVoz({
        pergunta,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      console.log("Resposta da API:", data);

      const textoResposta = data.resposta || "Não consegui entender, pode repetir?";
      setResposta(textoResposta);
      falarResposta(textoResposta);

    } catch (error) {
      console.error("[ERRO VOZ]", error);
      const msg = "Deu um erro ao consultar, tenta de novo.";
      setResposta(msg);
      falarResposta(msg);
    } finally {
      setPensando(false);
    }
  }

  function handleToggleOuvir() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz. Use o Chrome.");
      return;
    }

    if (ouvindo) {
      recognitionRef.current?.stop();
      setOuvindo(false);
      return;
    }

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
      setUltimaPergunta(texto);
      // AQUI ESTAVA FALTANDO: manda pra API
      enviarParaAPI(texto);
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
          background: ouvindo ? "#e74c3c" : pensando ? "#ff9800" : "#2e7d32",
        }}
        aria-label="Falar com o AgroDecide"
        disabled={pensando}
      >
        {ouvindo ? "🔴" : pensando ? "🤔" : "🎤"}
      </button>

      <p style={styles.status}>
        {ouvindo
          ? "Ouvindo..."
          : pensando
          ? "Pensando..."
          : "Toque para falar"}
      </p>

      {ultimaPergunta && (
        <p style={styles.pergunta}>Você: "{ultimaPergunta}"</p>
      )}

      {resposta && (
        <p style={styles.resposta}>AgroDecide: {resposta}</p>
      )}
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
  pergunta: {
    margin: "8px 0 0",
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
  },
  resposta: {
    margin: "4px 0 0",
    fontSize: 14,
    fontWeight: 600,
    color: "#2e7d32",
    background: "#fff",
    padding: "10px 12px",
    borderRadius: 10,
  },
};