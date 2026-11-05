import React, { useState, useEffect } from 'react';
import './Alerta.css';
import { TriangleAlert } from 'lucide-react';

const Alerta = ({ dadosApi }) => {
    const textoCompleto = dadosApi?.insightAgronomico || 'Nenhuma recomendação disponível';
    
    const [textoExibido, setTextoExibido] = useState('');
    const [estaDigitando, setEstaDigitando] = useState(false);

    useEffect(() => {
        // Toda vez que o insight mudar, reinicia o efeito de digitação
        setTextoExibido('');
        setEstaDigitando(true);
        
        let index = 0;
        
        // Define a velocidade da digitação (em milissegundos por caractere)
        const velocidade = 25; 

        const temporizador = setInterval(() => {
            if (index < textoCompleto.length) {
                // Adiciona o próximo caractere usando a referência mais atual do index
                setTextoExibido(() => textoCompleto.slice(0, index + 1));
                index++;
            } else {
                // Quando terminar de digitar tudo, limpa o intervalo e desativa o cursor
                clearInterval(temporizador);
                setEstaDigitando(false);
            }
        }, velocidade);

        // Função de limpeza caso o componente seja desmontado antes de terminar
        return () => clearInterval(temporizador);
    }, [textoCompleto]);

    return (
        <div className="alert-banner">
            <div className="alert-icon">
                <TriangleAlert />
            </div>

            <p className="alert-message">
                {textoExibido}
                {estaDigitando && <span className="typing-cursor"></span>}
            </p>
        </div>
    );
};

export default Alerta;