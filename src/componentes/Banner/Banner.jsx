import React from 'react'
import {obterIconeClima} from '../../util/obterIconeClima'
import { Droplet, Fan, Umbrella } from 'lucide-react';
import './Banner.css'

const Banner = ({dadosApi}) => {
    // console.log('Vento agora:', dadosApi.resumoHorario.ventoAtual)    
    
    const WeatherIcon = obterIconeClima(dadosApi.hoje);
    const tempAgora = dadosApi.resumoHorario.temperaturaAtual;
    const chanceDeChuvaAgora = dadosApi.resumoHorario.chanceChuvaAtual;
    const umidadeAgora = dadosApi.resumoHorario.umidadeAtual;
    const ventoAgora = dadosApi.resumoHorario.ventoAtual;

  return (
    <div className='banner-container'>
        <div className='banner-icon'>
            <WeatherIcon size={42} />
        </div>
        <div className='banner-temp-agora'>
            <h2>{tempAgora}°C</h2>
            <small>Agora</small>
        </div>
            
        <div className='banner-chuva'>
            <Umbrella />
            <small>Chuva</small>
            <p>{chanceDeChuvaAgora}%</p>
        </div>

        <div className='banner-umidade'>
            <Droplet />
            <small>Umidade</small>
            <p>{umidadeAgora}%</p>
        </div>
        
        <div className='banner-vento'>
            <Fan />
            <small>Vento</small>
            <p>{ventoAgora}Km/h</p>
        </div>
    </div>
  )
}

export default Banner