import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const ComparisonRainChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 10,
          right: 25,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          unit=" mm"
        />

        <YAxis
          type="category"
          dataKey="mes"
          width={80}
        />

        <Tooltip
          formatter={(value) => [`${value.toFixed(1)} mm`, 'Chuva acumulada']}
        />

        <Bar
          dataKey="chuva"
          radius={[0, 6, 6, 0]}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
            />
          ))}
        </Bar>

      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonRainChart;