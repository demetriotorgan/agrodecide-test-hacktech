import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

import './EtoChart.css';

const EtoChart = ({ data = [] }) => {

    const chartData = data.map(dia => ({
        data: dia.data.slice(5),
        eto: dia.eto
    }));

    return (

        <div className="eto-chart">

            <h3>Evapotranspiração (ETo)</h3>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <AreaChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="data"
                    />

                    <YAxis
                        unit=" mm"
                    />

                    <Tooltip
                        formatter={(value) => [`${value} mm`, 'ETo']}
                    />

                    <Area
                        type="monotone"
                        dataKey="eto"
                        stroke="#428475"
                        fill="#89D7B7"
                        strokeWidth={3}
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

};

export default EtoChart;