import React from 'react';
import {
  Tractor,
  AlertTriangle
} from 'lucide-react';

import './LoadingTrator.css';

const LoadingTrator = ({ erro }) => {

  if (erro) {
    return (
      <div className="loading-container">
        <div className="loading-content">

          <AlertTriangle size={64} />

          <p className="loading-texto">
            {erro}
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="loading-content">

        <Tractor
          className="trator-animado"
          size={64}
        />

        <p className="loading-texto">
          Carregando dados do campo...
        </p>

      </div>
    </div>
  );
};

export default LoadingTrator;