import './Historico.css'
import React, { useEffect, useState } from 'react'
import BotaoVoltar from '../../componentes/botaoVoltar/BotaoVoltar'
import { useNavigate } from 'react-router-dom'
import { useWeather } from '../../hooks/useWeather'
import LoadingTrator from '../../assets/LoadingTrator/LoadingTrator'
import { getCurrentDate, getDateDaysAgo } from '../../util/getDate'
import { CloudHail, CloudRainWind, Feather, FolderClock, Sun, ThermometerSun, Umbrella } from 'lucide-react'
import RainChart from '../../componentes/HistoricalCharts/RainChart'
import TemperatureChart from '../../componentes/HistoricalCharts/TemperatureChart'
import EtoChart from '../../componentes/HistoricalCharts/EtoChart'

const Historico = () => {
  const { historical, carregarHistorical, loadingHistorical, historicalError, location } = useWeather();
  const [periodo, setPeriodo] = useState(7)

  const hoje = getCurrentDate();


  const navigate = useNavigate();

  useEffect(() => {
    if (!location) return;

    carregarHistorical({
      start_date: getDateDaysAgo(periodo),
      end_date: hoje
    })
  }, [location, periodo]);

  console.log("Historical:", historical);
  console.log("Loading:", loadingHistorical);
  console.log("Erro:", historicalError);
  console.log(getCurrentDate());
  console.log(getDateDaysAgo(1));

  if (loadingHistorical) {
    return <LoadingTrator />
  }

  return (
    <>
      <BotaoVoltar onClick={() => navigate('/', { replace: true })} />
      <div className='painel-historical'>
        <div className='historical-dias'>
          <p><FolderClock /> Escolha um período de histórico</p>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}>
            <option value={7}>7 dias atrás</option>
            <option value={15}>15 dias atrás</option>
            <option value={30}>30 dias atrás</option>
            <option value={60}>60 dias atrás</option>
            <option value={90}>90 dias atrás</option>
          </select>
        </div>
        <div className='painel-chuvaAcumulada'>
          <p><Umbrella /> Chuva Acumulada</p>
          <p>{historical?.historico.resumo.chuvaAcumulada.toFixed(1)} mm</p>
        </div>
        <div className='painel-diasComChuva'>
          <p><CloudRainWind /> Dias com Chuva</p>
          <p>{historical?.historico.resumo.diasComChuva} dias</p>
        </div>
        <div className='painel-diasSecos'>
          <p><Sun /> Dias Secos</p>
          <p>{historical?.historico.resumo.diasSecos} dias</p>
        </div>
        <div className='painel-maiorChuva'>
          <p><CloudHail /> Maior Chuva</p>
          <p>{historical?.historico.resumo.maiorChuva} mm</p>
        </div>
        <div className='painel-temperaturaMedia'>
          <p><ThermometerSun /> Temperatura Média</p>
          <p>{historical?.historico.resumo.temperaturaMedia.toFixed(1)} C</p>
        </div>
        <div className='painel-etoMedio'>
          <p><Feather /> ETo Médio</p>
          <p>{historical?.historico.resumo.etoMedio.toFixed(1)} mm/Dia</p>
        </div>
      </div>

      <RainChart  data={historical?.historico?.historicoDias}/>
      <TemperatureChart data={historical?.historico?.historicoDias} />
      <EtoChart data={historical?.historico?.historicoDias}/>
    </>
  )
}

export default Historico