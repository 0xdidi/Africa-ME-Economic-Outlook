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
        <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: '10px', borderRadius: '4px', color: 'var(--text)' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.name}</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--text-light)' }}>
            Pop: {data.x.toFixed(1)}M | GDP: ${data.y.toFixed(1)}B
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      background: 'var(--surface)', padding: '20px', borderRadius: '12px',
      border: '1px solid var(--border)', marginBottom: '20px', display: 'grid',
      gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr) minmax(300px, 2fr)', gap: '20px', alignItems: 'center'
    }}>
      <div>
        <h4 style={{ color: 'var(--text-dim)', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Total GDP (PPP)</h4>
        <h2 style={{ color: 'var(--accent)', margin: 0, fontSize: '2rem' }}>
          ${(totalGdp / 1000).toFixed(2)}T
        </h2>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Across {data.length} selected countries
        </p>
      </div>

      <div>
        <h4 style={{ color: 'var(--text-dim)', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Avg. GDP per Capita</h4>
        <h2 style={{ color: 'var(--text)', margin: 0, fontSize: '2rem' }}>
          ${avgCapita.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </h2>
      </div>

      <div style={{ height: '140px', width: '100%' }}>
        <h4 style={{ color: 'var(--text-dim)', margin: '0 0 10px 0', fontSize: '0.8rem', textAlign: 'right' }}>GDP vs Population</h4>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis type="number" dataKey="x" name="Population" tick={{ fill: "var(--text-dim)", fontSize: 10 }} axisLine={{ stroke: 'var(--border)' }} tickLine={{ stroke: 'var(--border)' }} />
            <YAxis type="number" dataKey="y" name="GDP" tick={{ fill: "var(--text-dim)", fontSize: 10 }} axisLine={{ stroke: 'var(--border)' }} tickLine={{ stroke: 'var(--border)' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--text-dim)' }} />
            <Scatter name="Countries" data={chartData} fill="var(--accent)" opacity={0.8} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
