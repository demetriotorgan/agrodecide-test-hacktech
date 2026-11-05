import api from './api'

export const getWeather = async ({ latitude, longitude }) => {

  const response = await api.get("/weather", {
    params: {
      latitude,
      longitude
    }
  });
  const data = response.data;  
  
  return response.data.data;
}