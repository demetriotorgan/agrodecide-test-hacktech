import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../layouts/Dashboard'
import Home from '../pages/Home'
import Previsao from '../pages/previsao/Previsao'
import Indicadores from '../pages/indicadores/Indicadores'
import Historico from '../pages/historico/Historico'
import Comparacao from '../pages/compararcao/Comparacao'
import { WeatherProvider } from '../context/WeatherContext'
import PlantioIndice from '../componentes/IndicesClimaticos/Plantio/PlantioIndice'
import IrrigacaoIndice from '../componentes/IndicesClimaticos/Irrigacao/IrrigacaoIndice'

const AppRoutes = () => {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='previsao' element={<Previsao />} />
            
            <Route path='indicadores' element={<Indicadores />} />
            <Route path='indicadores/plantio' element={<PlantioIndice/>}/>
            <Route path='indicadores/irrigacao' element={<IrrigacaoIndice/>}/>

            <Route path='historico' element={<Historico />} />
            <Route path='comparacao' element={<Comparacao />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>

  )
}

export default AppRoutes