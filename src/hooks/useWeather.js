import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";


export function useWeather(){
    return useContext(WeatherContext);
};