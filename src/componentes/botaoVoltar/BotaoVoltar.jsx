import React from 'react'
import './BotaoVoltar.css'

const BotaoVoltar = ({onClick}) => {
  return (
    <button className="btn-voltar" onClick={onClick} type="button">
      <svg 
        className="btn-voltar-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <span>Voltar</span>
    </button>
  )
}

export default BotaoVoltar