import React from 'react';
import './ListaPrevisao.css';
import { formatarData } from '../../util/formatarData';
import { obterIconeClima } from '../../util/obterIconeClima';

const ListaPrevisao = ({ previsaoDias = [] }) => {

  return (
    <div className="lista-previsao-container">
      {previsaoDias.map((dia, index) => {
        const semChuva = dia.chuva === 0;
        const ehHoje = index === 0;
        const WeatherIcon = obterIconeClima(dia);

        // console.log({
        //   data: dia.data,
        //   codigo: dia.codigoClima,
        //   chuva: dia.chuva,
        //   chance: dia.chanceChuva
        // });

        return (
          <div
            key={dia.data}
            className={`previsao-linha-item ${semChuva ? 'dia-seco' : 'dia-chuva'} ${ehHoje ? 'dia-atual' : ''}`}
          >
            {/* Esquerda: Data Formatada */}
            <span className="previsao-item-data">
              {formatarData(dia.data, index)}
            </span>

            {/* Centro: Ícone Condicional */}

            <div className="previsao-item-icone">
              <WeatherIcon size={24} />
            </div>

            {/* Temperatura */}
            <span className="previsao-item-temp">
              {dia.temperaturaMaxima}° / {dia.temperaturaMinima}°
            </span>

            {/* Direita: Volume em mm */}
            <span className="previsao-item-mm">
              {dia.chuva.toFixed(2)} mm
            </span>
          </div>
        );
      })}

    </div>
  );
};

export default ListaPrevisao;