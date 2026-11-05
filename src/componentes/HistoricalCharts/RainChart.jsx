import React from 'react';
import './RainChart.css'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

import './RainChart.css';

const RainChart = ({ data=[] }) => {
    const corPrimaria = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary')
    .trim();

     const chartData = data.map(dia => ({
        data: dia.data.slice(5),
        chuva: dia.chuva
    }));

    return (

        <div className="rain-chart">

            <h3>Precipitação Diária</h3>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <BarChart
                    data={chartData}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="data"
                    />

                    <YAxis
                        unit=" mm"
                    />

                    <Tooltip />

                    <Bar
                        dataKey="chuva"
                        fill={corPrimaria}
                        radius={[6,6,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default RainChart;