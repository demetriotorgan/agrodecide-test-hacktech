import React from 'react'
import './Dashboard.css'
import Header from '../componentes/header/Header'
import Menu from '../componentes/Menu/Menu'
import Alerta from '../componentes/Alerta/Alerta'
import Footer from '../componentes/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="phone-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard