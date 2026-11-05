import React from 'react'
import './Header.css'
import logoHeader from '../../assets/logoHeader.png'

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={logoHeader} alt="Agro-Clima Logo" />
      </div>
      <div className="contact-btn">Saiba Mais</div>
    </header>
  )
}

export default Header