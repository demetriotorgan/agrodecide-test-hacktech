import React from 'react'
import { Mountain, CloudRain, CloudDrizzle, Sun } from 'lucide-react'
import './ResumoPrevisao.css'
import { chuvaAcumulada, diasComChuva, diasSecos,mediaChanceChuva } from '../../util/resumoPrevisao';

const ResumoPrevisao = ({ dadosApi}) => {

  const previsaoDias =
    dadosApi?.previsaoDias ?? [];

const totalChuvaAcumulada = chuvaAcumulada(previsaoDias);
const totalDiasComChuva = diasComChuva(previsaoDias);
const totalDiasSecos = diasSecos(previsaoDias);
const chanceMediaChuva = mediaChanceChuva(previsaoDias);

  return (
    <section className="resumo-climatico-container">
      
      <div className="resumo-item">
        <div className="resumo-conteudo">
          <span className="resumo-label">Elevação</span>
          <strong className="resumo-valor">
            {dadosApi?.elevation ?? 0} m
          </strong>
        </div>
        <Mountain size={18} className="resumo-icone" />
      </div>

      <div className="resumo-item">
        <div className="resumo-conteudo">
          <span className="resumo-label">Chuva Acumulada</span>
          <strong className="resumo-valor">
            {totalChuvaAcumulada ? totalChuvaAcumulada.toFixed(1) : "0.0"} mm
          </strong>
        </div>
        <CloudRain size={18} className="resumo-icone" />
      </div>

      <div className="resumo-item">
        <div className="resumo-conteudo">
          <span className="resumo-label">Dias com Chuva</span>
          <strong className="resumo-valor destaque-chuva">{totalDiasComChuva} dias</strong>
          <small>Chance de Chuva: {chanceMediaChuva}%</small>
        </div>
        <CloudDrizzle size={18} className="resumo-icone destaque-chuva" />
      </div>

      <div className="resumo-item">
        <div className="resumo-conteudo">
          <span className="resumo-label">Dias Secos</span>
          <strong className="resumo-valor destaque-seco">{totalDiasSecos} dias</strong>
        </div>
        <Sun size={18} className="resumo-icone destaque-seco" />
      </div>

    </section>
  )
}

export default ResumoPrevisao