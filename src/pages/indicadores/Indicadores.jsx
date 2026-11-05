import React, { useEffect, useState } from 'react';
import { Thermometer, CloudRain, CheckCircle, XCircle, Brain, ArrowLeft, Leaf, CloudHail, ThermometerSun, CircleArrowRight, Droplet, Rose, Droplets } from 'lucide-react';
import './Indicadores.css';
import { useWeather } from '../../hooks/useWeather';
import LoadingTrator from '../../assets/LoadingTrator/LoadingTrator'
import { obterIconeFator } from '../../util/obterIconeFator';
import BotaoVoltar from '../../componentes/botaoVoltar/BotaoVoltar'
import { Navigate, useNavigate } from 'react-router-dom';
import PlantioIndice from '../../componentes/IndicesClimaticos/Plantio/PlantioIndice';
import cardPlantio from '../../assets/indicePlantio.png'
import cardIrrigacao from '../../assets/indiceIrrigacao.png'
import { calcularUmidadeMediaSemanal } from '../../util/calcularUmidadeMediaSemanal';

const Indicadores = () => {
  const { dadosApi,loading } = useWeather();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingTrator />
  }

  const {plantio} = dadosApi.indices
  const {irrigacao} = dadosApi.indices

  const mediaUmidade = calcularUmidadeMediaSemanal(dadosApi.hourly);
  

  return (
    <>
      <BotaoVoltar onClick={() => navigate('/', { replace: true })} />

      <div className="indicadores-container">        
        <div className='card-indicador'>
          <h1>Indice de Plantio <Leaf /></h1>
          <small>O Índice de Plantio avalia as condições climáticas previstas para os próximos dias, considerando fatores como temperatura, precipitação e disponibilidade hídrica. Com base nesses dados, o sistema classifica o nível de favorabilidade para a realização do plantio. Além da análise climática, o indicador conta com insights gerados por Inteligência Artificial para apoiar a tomada de decisão do produtor de forma mais segura e estratégica.</small>
          
          <div className='card-imagem'>
            <img src={cardPlantio} alt="" />
          </div>
          
          <div className='card-info-container'>           
              <div className='card-indice'>
                <Leaf />
                <small>Indice</small>
                <h2>{plantio.indicePlantio}%</h2>
              </div>
              <div className='card-chuva'>
                <CloudHail />
                <small>Chuva (7d)</small>
                <h2>{plantio.precipitacaoAcumulada.toFixed(1)}mm</h2>
              </div>
              <div className='card-temperatura'>
                <ThermometerSun />
                <small>Temperatura (7d)</small>
                <h2>{plantio.temperaturaMedia.toFixed(1)}°C</h2>
              </div>            
          </div>
          <button 
            type='button'
            onClick={()=>navigate('/indicadores/plantio')}
            >
              Detalhes do Indicador <CircleArrowRight />
          </button>
        </div>

        <div className='card-indicador'>
          <h1>Indice de Irrigação <Droplet /></h1>
          <small>O Índice de Irrigação estima a necessidade hídrica da lavoura com base nos dados de evapotranspiração de referência (ETo) e nos níveis de umidade disponíveis. A partir dessas informações, o sistema identifica possíveis déficits de água e auxilia no planejamento da irrigação. O indicador também utiliza análises apoiadas por Inteligência Artificial para fornecer recomendações mais precisas para o manejo hídrico da cultura.</small>
          
          <div className='card-imagem'>
            <img src={cardIrrigacao} alt="" />
          </div>
          
          <div className='card-info-container'>           
              <div className='card-indice'>
                <Droplet />
                <small>Indice</small>
                <h2>{irrigacao.indiceIrrigacao}%</h2>
              </div>
              <div className='card-chuva'>
                <Rose />
                <small>ETo(mm/dia)</small>
                
                <h2>{irrigacao.evapotranspiracaoAcumulada.toFixed(1)}</h2>
              </div>
              <div className='card-temperatura'>
                <Droplets />
                <small>Umidade (7d)</small>
                <h2>{mediaUmidade.toFixed(1)}%</h2>
              </div>            
          </div>
          <button 
            type='button'
            onClick={()=>navigate('/indicadores/irrigacao')}
            >
              Detalhes do Indicador <CircleArrowRight />
          </button>
        </div>
      </div>

      
    </>
  );
};

export default Indicadores;




