import './Comparacao.css'
import './loader.css'
import React, { useEffect, useState } from 'react'
import { createHistoricalPeriod, getAvailableMonths, getAvailableYears, getCurrentMonth, getCurrentYear } from '../../util/getDate'
import BotaoVoltar from '../../componentes/botaoVoltar/BotaoVoltar';
import { useNavigate } from 'react-router-dom';
import { useHistoricalComparison } from '../../hooks/useHistoricalComparison';
import { useWeather } from '../../hooks/useWeather';
import { compareHistoricalPeriods } from '../../services/historicalComparisonService';
import ComparisonRainChart from './ComparisonRainChart';
import { ChartNoAxesCombined } from 'lucide-react';

const Comparacao = () => {
  const navigate = useNavigate();
  const {
    periodo,
    setPeriodo,
    anos,
    meses,
    mesesComparacao,
    comparisonPeriods,
    historicoComparado,
    loading,
    error,
    compareHistorico } = useHistoricalComparison();
  const { location } = useWeather();

  const compararPeriodo = async () => {
    const historico = await compareHistorico({
      latitude: location.latitude,
      longitude: location.longitude
    })
    // console.log(historico);
  };

  const rainComparisonData = historicoComparado
    ? [
      {
        mes: historicoComparado.periodoA.mesA.label,
        chuva: historicoComparado.periodoA.chuvaAcumuladaPeriodoA,
        color: '#428475'
      },
      {
        mes: historicoComparado.periodoB.mesB.label,
        chuva: historicoComparado.periodoB.chuvaAcumuladaPeriodoB,
        color: '#89D7B7'
      }
    ]
    : [];


  // console.log("periodoA:", historicoComparado?.periodoA);
  // console.log("periodoB:", historicoComparado?.periodoB);

  return (
    <>
      <BotaoVoltar onClick={() => navigate('/', { replace: true })} />

      <div className='painel-seletores'>
        <div className='select-perido-ano'>
          <p>Selecione o ano</p>
          <select
            value={periodo.year}
            onChange={(e) => setPeriodo(prev => ({
              ...prev,
              year: Number(e.target.value)
            }))}>
            {anos.map((ano) => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>
        <div className='select-periodo-mesInicial'>
          <p>Selecione o primeiro mês</p>
          <select
            value={periodo.monthA}
            onChange={(e) => setPeriodo(prev => ({
              ...prev,
              monthA: Number(e.target.value)
            }))}>
            {meses.map((mes) => (
              <option key={mes.value} value={mes.value}>{mes.label}</option>
            ))}
          </select>
        </div>
        <div className='select-periodo-mesFinal'>
          <p>Selecione o segundo mês</p>
          <select
            value={periodo.monthB}
            onChange={(e) => setPeriodo(prev => ({
              ...prev,
              monthB: Number(e.target.value)
            }))}>
            {mesesComparacao.map((mes) => (
              <option key={mes.value} value={mes.value}>{mes.label}</option>
            ))}
          </select>
        </div>
        <button
          className="btn-comparar"
          type='button'
          onClick={() => compararPeriodo()}>
          Comparar
        </button>
      </div>

      {loading ? (
        <div className="painel-loading">
          <div className="loader"></div>
          <p>Comparando períodos...</p>
        </div>
      ) : (
        historicoComparado && (
          <div className="painel-comparativo">
            <table className="tabela-comparativa">
              <thead>
                <tr>
                  <th>Indicador</th>
                  <th>{historicoComparado.periodoA.mesA.label}</th>
                  <th>{historicoComparado.periodoB.mesB.label}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Chuva acumulada</td>
                  <td> {historicoComparado.periodoA.chuvaAcumuladaPeriodoA.toFixed(1)} mm</td>
                  <td>{historicoComparado.periodoB.chuvaAcumuladaPeriodoB.toFixed(1)} mm</td>
                </tr>
                <tr>
                  <td>Temp. Média</td>
                  <td>{historicoComparado.periodoA.tempeMediaPeriodoA.toFixed(1)} C</td>
                  <td>{historicoComparado.periodoB.tempeMediaPeriodoB.toFixed(1)} C</td>
                </tr>
                <tr>
                  <td>Dias com Chuva</td>
                  <td>{historicoComparado.periodoA.diasComChuvaPeriodoA} Dias</td>
                  <td>{historicoComparado.periodoB.diasComChuvaPeriodoB} Dias</td>
                </tr>
                <tr>
                  <td>Maior Chuva</td>
                  <td>{historicoComparado.periodoA.maioChuvaPeriodoA.toFixed(1)} mm</td>
                  <td>{historicoComparado.periodoB.maioChuvaPeriodoB.toFixed(1)} mm</td>
                </tr>
                <tr>
                  <td>Dias secos</td>
                  <td>{historicoComparado.periodoA.diasSecosPeriodoA} Dias</td>
                  <td>{historicoComparado.periodoB.diasSecosPeriodoB} Dias</td>
                </tr>
                <tr>
                  <td>ETo Acumulado</td>
                  <td>{historicoComparado.periodoA.etoMedioPeriodoA.toFixed(1)} mm/Dia</td>
                  <td>{historicoComparado.periodoB.etoMedioPeriodoB.toFixed(1)} mm/Dia</td>
                </tr>
              </tbody>
            </table>
            <h3><ChartNoAxesCombined /> Chuva acumualda entre os períodos</h3>
            <ComparisonRainChart
              data={rainComparisonData}
            />
          </div>
        )
      )}


    </>
  )
}

export default Comparacao