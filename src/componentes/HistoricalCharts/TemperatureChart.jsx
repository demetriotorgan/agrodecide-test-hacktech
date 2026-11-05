import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

import './TemperatureChart.css';

const TemperatureChart = ({ data = [] }) => {

    const chartData = data.map(dia => ({
        data: dia.data.slice(5),
        temperatura: dia.temperatura
    }));

    return (

        <div className="temperature-chart">

            <h3>Temperatura Média</h3>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <LineChart
                    data={chartData}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="data"
                    />

                    <YAxis
                        unit="°C"
                    />

                    <Tooltip
                        formatter={(value) => [`${value} °C`, 'Temperatura']}
                    />

                    <Line
                        type="monotone"
                        dataKey="temperatura"
                        stroke="#2c9206"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: "#F97316"
                        }}
                        activeDot={{
                            r: 6
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default TemperatureChart;