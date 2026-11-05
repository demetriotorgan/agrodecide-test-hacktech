import { createContext, useContext, useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import { getCurrentLocation } from "../util/geolocation";
import { getHistorical } from "../services/historicalService";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [dadosApi, setDadosApi] = useState(null);
    const [historical, setHistorical] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingHistorical, setLoadingHistorical] = useState(false);
    const [error, setError] = useState(null);
    const [historicalError, setHistoricalError] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        async function carregarInicial() {
            try {
                const coords = await getCurrentLocation();
                setLocation(coords);
            } catch (error) {
                setError(error);
            }
        }
        carregarInicial();
    }, []);

    useEffect(() => {
        if (!location) return;

        async function carregarWeather() {
            try {
                const dados = await getWeather(location);
                setDadosApi(dados);
            } catch (error) {
                console.log('CATCH:', error);

                console.error(
                    'Erro ao carregar dados de clima:',
                    error
                );

                setError(
                    error.message ||
                    'Não foi possível carregar os dados climáticos.'
                );
            } finally {
                setLoading(false);
            }
        }
        carregarWeather();
    }, [location]);



    const carregarHistorical = async ({ start_date, end_date }) => {

        if (!location) return;

        try {

            setLoadingHistorical(true);

            const dados = await getHistorical({
                latitude: location.latitude,
                longitude: location.longitude,
                start_date,
                end_date
            });

            setHistorical(dados);

        } catch (error) {

            setHistoricalError(error);

        } finally {

            setLoadingHistorical(false);

        }

    };


    return (
        <WeatherContext.Provider
            value={{
                dadosApi,
                historical,
                carregarHistorical,
                loading,
                loadingHistorical,
                historicalError,
                error,
                location
            }}>
            {children}
        </WeatherContext.Provider>
    );
};

