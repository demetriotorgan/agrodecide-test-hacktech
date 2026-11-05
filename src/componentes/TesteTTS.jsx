import { useState, useEffect } from "react";

export default function TesteTTS() {
  const [vozes, setVozes] = useState([]);
  const [vozSelecionada, setVozSelecionada] = useState(null);
  const [texto, setTexto] = useState(
    "A previsão para hoje indica chuva de 16 milímetros, a máxima chega aos 26 graus e a mínima fica em 18 graus."
  );
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  // 1. Carrega as vozes que existem no navegador
  useEffect(() => {
    function carregarVozes() {
      const lista = window.speechSynthesis.getVoices();
      // Filtra só pt-BR pra não vir 100 vozes
      const vozesBR = lista.filter((v) => v.lang.includes("pt"));
      console.log("Vozes pt-BR encontradas:", vozesBR);
      setVozes(vozesBR.length > 0 ? vozesBR : lista);

      // Tenta já deixar selecionada a melhor: Google pt-BR
      const melhor = vozesBR.find((v) => v.name.includes("Google")) || vozesBR[0];
      if (melhor) setVozSelecionada(melhor.name);
    }

    carregarVozes();
    // No Chrome as vozes carregam depois, precisa desse evento
    window.speechSynthesis.onvoiceschanged = carregarVozes;
  }, []);

  function falar() {
    window.speechSynthesis.cancel(); // para o que estiver falando

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = rate; // velocidade 0.5 a 2
    utterance.pitch = pitch; // tom 0 a 2
    utterance.volume = 1;

    // Usa a voz que você escolheu no select
    const voz = vozes.find((v) => v.name === vozSelecionada);
    if (voz) utterance.voice = voz;

    utterance.onstart = () => console.log("🔊 Começou a falar com a voz:", voz?.name);
    utterance.onend = () => console.log("✅ Terminou de falar");

    window.speechSynthesis.speak(utterance);
  }

  function parar() {
    window.speechSynthesis.cancel();
  }

  return (
    <div style={{ padding: 20, border: "2px dashed blue", margin: 20 }}>
      <h2>🔊 Teste Sintetizador Nativo</h2>

      <p><strong>Texto pra falar:</strong></p>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: 8 }}
      />

      <p style={{ marginTop: 12 }}><strong>Voz pt-BR:</strong></p>
      <select
        value={vozSelecionada || ""}
        onChange={(e) => setVozSelecionada(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      >
        {vozes.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name} - {v.lang}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <label>
          Velocidade: {rate}
          <input type="range" min="0.5" max="1.5" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label>
          Tom: {pitch}
          <input type="range" min="0.5" max="1.5" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} />
        </label>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={falar} style={{ padding: "10px 20px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
          ▶️ Falar
        </button>
        <button onClick={parar} style={{ padding: "10px 20px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
          ⏹️ Parar
        </button>
      </div>

      <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
        Dica: Abre o console (F12) pra ver qual voz ele está usando.
      </p>
    </div>
  );
}