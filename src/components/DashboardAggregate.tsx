import React from 'react';
import { CountryData } from '../data/countries';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardAggregateProps {
  data: CountryData[];
}

export function DashboardAggregate({ data }: DashboardAggregateProps) {
  const totalGdp = data.reduce((acc, curr) => acc + curr.gdp_ppp, 0);
  const avgCapita = data.length ? data.reduce((acc, curr) => acc + curr.gdp_per_cap, 0) / data.length : 0;
  
  const chartData = data.map(d => ({
    name: d.name,
    x: d.population,
    y: d.gdp_ppp
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px', borderRadius: 'var(--radius)' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.name}</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--text-light)' }}>
            Pop: {data.x}M | GDP: ${data.y}B
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      background: 'var(--panel-bg)', padding: '20px', borderRadius: 'var(--radius)',
      border: '1px solid var(--border)', marginBottom: '20px', display: 'grid',
      gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr) minmax(300px, 2fr)', gap: '20px', alignItems: 'center'
    }}>
      <div>
        <h4 style={{ color: 'var(--text-light)', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Total GDP (PPP)</h4>
        <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '2rem' }}>
          ${(totalGdp / 1000).toFixed(2)}T
        </h2>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--text-light)' }}>
          Across {data.length} selected countries
        </p>
      </div>

      <div>
        <h4 style={{ color: 'var(--text-light)', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Avg. GDP per Capita</h4>
        <h2 style={{ color: 'var(--text-main)', margin: 0, fontSize: '2rem' }}>
          ${avgCapita.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </h2>
      </div>

      <div style={{ height: '120px', width: '100%' }}>
        <h4 style={{ color: 'var(--text-light)', margin: '0 0 10px 0', fontSize: '0.8rem', textAlign: 'right' }}>GDP vs Population</h4>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis type="number" dataKey="x" name="Population" tick={false} axisLine={false} />
            <YAxis type="number" dataKey="y" name="GDP" tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Countries" data={chartData} fill="var(--primary)" opacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
