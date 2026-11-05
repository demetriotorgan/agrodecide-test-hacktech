import React from 'react'
import './Footer.css'
import logoFooter from '../../assets/logoFooter.png'

const Footer = () => {
  return (
    <>
    <footer>
        <div className="footer-logo-round"><img src={logoFooter} alt="" /></div>
        <div className="footer-content">
          <h3>Sobre o Projeto</h3>
          <p>Aqui está o espaço para contar resumidamente o propósito da sua aplicação climática.</p>
          <p>Breve texto explicativo sobre a aplicação.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer