import api from './api'

export const enviarPerguntaVoz = async ({ pergunta, latitude, longitude }) => {
  const response = await api.post("/voz", {
    pergunta,
    latitude,
    longitude
  });

  return response.data;
}