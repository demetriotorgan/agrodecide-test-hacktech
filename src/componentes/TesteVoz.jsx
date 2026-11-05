import { useState } from "react";
import { enviarPerguntaVoz } from "../services/vozService";

export default function TesteVoz() {
  const [carregando, setCarregando] = useState(false);

  async function testar() {
    setCarregando(true);
    console.log("--- TESTE VOZ REACT INICIADO ---");

    try {
      const body = {
        pergunta: "Qual a previsão de hj??",
        latitude: -25.42,
        longitude: -49.27
      };

      console.log("Enviando BODY:", body);

      const resposta = await enviarPerguntaVoz(body);

      console.log("--- RESPOSTA DA API ---");
      console.log(resposta);
      console.log("----------------------");

    } catch (error) {
      console.error("[ERRO NO TESTE REACT]", error);
      console.error("Resposta do servidor:", error.response?.data);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ padding: 20, border: "2px dashed green", margin: 20 }}>
      <h2>🧪 Teste Voz - React</h2>
      <p>Vai fazer POST para /api/voz e mostrar no console (F12)</p>
      <button onClick={testar} disabled={carregando}>
        {carregando ? "Enviando..." : "Testar POST /api/voz"}
      </button>
    </div>
  );
}