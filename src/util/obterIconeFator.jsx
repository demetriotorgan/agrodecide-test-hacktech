import { CheckCircle, XCircle } from "lucide-react";

// Função auxiliar para definir o ícone de cada fator de forma inteligente
  export const obterIconeFator = (texto) => {
    const textoMinusculo = texto.toLowerCase();
    if (textoMinusculo.includes('insuficiente') || textoMinusculo.includes('ruim') || textoMinusculo.includes('alerta')) {
      return <XCircle className="fator-icone erro" size={18} />;
    }
    return <CheckCircle className="fator-icone sucesso" size={18} />;
  };