import React from 'react'
import BotaoVoltar from '../../botaoVoltar/BotaoVoltar'
import { useNavigate } from 'react-router-dom'
import { Brain, Bubbles, CloudRain, Droplet, Scale, Thermometer } from 'lucide-react';
import { useWeather } from '../../../hooks/useWeather';
import LoadingTrator from '../../../assets/LoadingTrator/LoadingTrator';
import { obterIconeFator } from '../../../util/obterIconeFator';
import { useDigitarTexto } from '../../../hooks/useDigitarTexto';

const IrrigacaoIndice = () => {
  const {dadosApi, loading} = useWeather();  
  const navigate = useNavigate();
  
  const textoAnaliseIrrigacao = dadosApi?.analises.analiseDeIrrigacao || 'Nenhuma análise disponível';  
  const {textoExibido, estaDigitando} = useDigitarTexto(textoAnaliseIrrigacao);
  
  if(loading){
    return <LoadingTrator />
  }
  
  const {irrigacao} = dadosApi.indices;

  return (
    <>
      <BotaoVoltar onClick={() => navigate('/indicadores')} />
      <div className='componentes-indicador'>
        <div className="indicadores-header">
          <h2>Indicador de Irrigação  <Droplet /></h2>
        </div>
        
        <div className="indicador-card">
          <div className="indicador-card-header">
            <span className="indicador-label">Índice para Irrigação</span>
            <span className={`status-badge status-${irrigacao.classificacao.toLowerCase()}`}>
              {irrigacao.classificacao}
            </span>
          </div>

          <div className="barra-progresso-container">
            <div
              className={`barra-progresso-preenchimento progresso-${irrigacao.classificacao.toLowerCase()}`}
              style={{ width: `${irrigacao.indiceIrrigacao}%` }}
            ></div>
          </div>

           <div className="barra-progresso-valores">
            <span>0%</span>
            <span className="valor-atual">{irrigacao.indiceIrrigacao}%</span>
            <span>100%</span>
          </div>

        </div>

        <div className="metricas-grid">
          <div className="metrica-item">
            <div className="metrica-topo">
              <Scale  size={20} className="icon-temp" />
              <span>Deficit Hidrico</span>
            </div>
            <strong className="metrica-valor">
              {irrigacao.deficitHidrico.toFixed(1)}mm
            </strong>
          </div>

          <div className="metrica-item">
            <div className="metrica-topo">
              <Bubbles  size={20} className="icon-chuva" />
              <span>Evapotranspiração (7d)</span>
            </div>
            <strong className="metrica-valor">
              {irrigacao.evapotranspiracaoAcumulada.toFixed(1)} mm/dia
            </strong>
          </div>
        </div>

        <div className="fatores-card">
                  <h3>Fatores Analisados</h3>
                  <ul className="fatores-lista">
                    {irrigacao.fatores.map((fator, index) => (
                      <li key={index} className="fator-item">
                        {obterIconeFator(fator)}
                        <span>{fator}</span>
                      </li>
                    ))}
                  </ul>
        </div>

        <div className="banner-ia">
          <div className="banner-ia-titulo">
            <Brain size={20} />
            <h4>Análise Inteligente (Groq)</h4>
          </div>
          <p className="banner-ia-texto">
            {textoExibido}
            {estaDigitando && <span className="cursor">|</span>}
          </p>
        </div>
      </div>
    </>

  )
}

export default IrrigacaoIndice