import React from 'react';
import { CountryData } from '../data/countries';
import { X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ComparisonModalProps {
  countries: CountryData[];
  onClose: () => void;
}

export function ComparisonModal({ countries, onClose }: ComparisonModalProps) {
  // We need to normalize the values so they can be compared on a single radar chart (0 to 100 scale)
  const metrics: (keyof CountryData)[] = ['population', 'gdp_ppp', 'gdp_per_cap', 'disposable', 'inflation'];
  const labels = ['Population', 'GDP (PPP)', 'GDP per Capita', 'Disposable Income', 'Inflation Rate'];

  const maxValues: any = {};
  metrics.forEach(m => {
    maxValues[m] = Math.max(...countries.map(c => (c as any)[m] as number));
  });

  const chartData = metrics.map((m, index) => {
    const dataPoint: any = { subject: labels[index], fullMark: 100 };
    countries.forEach(c => {
      const val = (c as any)[m] as number;
      // Normalizing to 100, careful with 0 max
      dataPoint[c.name] = maxValues[m] === 0 ? 0 : (val / maxValues[m]) * 100;
      dataPoint[`${c.name}_raw`] = val;
    });
    return dataPoint;
  });

  const colors = ['#f0c44a', '#6ee7b7', '#93c5fd', '#f87171'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--surface2)', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ margin: '5px 0', color: entry.color, fontSize: '13px' }}>
              {entry.name}: {entry.payload[`${entry.name}_raw`].toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-center">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Compare Countries</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          {countries.map((c, i) => (
            <div key={c.iso3} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--surface2)', borderRadius: '100px', borderLeft: `3px solid ${colors[i % colors.length]}` }}>
              <span style={{ fontSize: '1.2rem' }}>{c.flag}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.name}</span>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {countries.map((c, i) => (
                <Radar
                  key={c.iso3}
                  name={c.name}
                  dataKey={c.name}
                  stroke={colors[i % colors.length]}
                  fill={colors[i % colors.length]}
                  fillOpacity={0.4}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', margin: '15px 0 0 0' }}>
          * Values are normalized as a percentage of the highest value among selected countries for comparative purposes.
        </p>
      </div>
    </>
  );
}
