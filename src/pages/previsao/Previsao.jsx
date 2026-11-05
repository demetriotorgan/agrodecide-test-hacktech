import React from 'react'
import BotaoVoltar from '../../componentes/botaoVoltar/BotaoVoltar'
import './Previsao.css'
import ListaPrevisao from '../../componentes/ListaPrevisao/ListaPrevisao';
import { getWeatherIcon } from '../../util/weatherIcons';
import ResumoPrevisao from '../../componentes/ResumoPrevisao/ResumoPrevisao';
import { calcularChuvaAcumulada } from '../../util/calcularChuvaAcumulada';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../../hooks/useWeather';
import { formatarData } from '../../util/formatarData';
import { obterIconeClima } from '../../util/obterIconeClima';
import { Droplets, Thermometer, CloudRain } from 'lucide-react';


const Previsao = () => {
  
  const navigate = useNavigate();
  const weatherCode = 'rain';
  const { dadosApi, loading } = useWeather();

  if (loading) {
    return <p>Carregando...</p>;
  };

  const chuvaAcumulada = calcularChuvaAcumulada(
    dadosApi.daily.precipitation_sum
  );

  const dataHoje = dadosApi.hoje.data;

  const WeatherIcon = obterIconeClima({
    codigoClima: dadosApi.hoje.codigoClima,
    chuva: dadosApi.hoje.chuva,
    chanceChuva: dadosApi.hoje.chanceChuva
  });

  return (
    <>
      <div className="clima-page-container">
        {/* Botão voltar no topo */}
        <BotaoVoltar onClick={() => navigate('/', { replace: true })} />

        {/* Nova Seção: Destaque da Previsão */}
        <section className="previsao-destaque-card">
          <div className="destaque-info-esquerda">
            <h2 className="destaque-titulo">Previsão para hoje</h2>
            <p className="destaque-data">{formatarData(dataHoje)}</p>

            <div className="destaque-detalhes-grid">
              <div className="detalhe-item highlight">
                <WeatherIcon size={18} />
                <span>Chuva: <strong>{dadosApi.hoje.chuva.toFixed(1)} mm</strong></span>
              </div>
              <div className="detalhe-item">
                <Droplets size={18} />
                <span>Chance: <strong>{dadosApi.hoje.chanceChuva}%</strong></span>
              </div>
              <div className="detalhe-item">
                <Thermometer size={18} />
                <span>Agora: <strong>{dadosApi.resumoHorario.temperaturaAtual}°C</strong></span>
              </div>              
            </div>
          </div>

          <div className="destaque-icone-direita">
            <WeatherIcon size={32} />
          </div>
        </section>

        {/* LISTA DOS 7 DIAS COMPONETIZADA */}
        <ListaPrevisao
          previsaoDias={dadosApi.previsaoDias}
        />

        {/* Resumo da previsao */}
        <ResumoPrevisao
          dadosApi={dadosApi}
        />

      </div>
    </>
  )
}

export default Previsao