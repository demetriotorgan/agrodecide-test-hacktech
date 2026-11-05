import { useState } from "react";

export default function VoiceAgent() {
  // 1. PRIMEIRO STATE - está ouvindo ou não?
  // false = parado / true = ouvindo
  const [ouvindo, setOuvindo] = useState(false);

  // 2. Função que troca o estado quando toca no botão
  function handleToggleOuvir() {
    setOuvindo((valorAtual) => !valorAtual);
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