import React from 'react';
import { CountryData } from '../data/countries';
import { X, MapPin, Coins, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';

interface CountryModalProps {
  country: CountryData;
  onClose: () => void;
}

export function CountryModal({ country, onClose }: CountryModalProps) {
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} style={{ animation: 'fadeIn 0.2s forwards' }} />
      <div className="modal-slide-over">
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', marginTop: '10px' }}>
          <span style={{ fontSize: '3rem', lineHeight: 1 }}>{country.flag}</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>{country.name}</h2>
            <span className={`region-badge ${country.region === 'Africa' ? 'badge-africa' : 'badge-me'}`} style={{ marginTop: '5px' }}>
              {country.region}
            </span>
          </div>
        </div>

        <div style={{ background: 'var(--surface2)', padding: '20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '20px' }}>
          <h4 style={{ color: 'var(--text-light)', marginTop: 0, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Overview</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Capital</div>
                <div style={{ fontWeight: 600 }}>{country.capital}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Coins size={18} color="var(--accent3)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Currency</div>
                <div style={{ fontWeight: 600 }}>{country.currency}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--surface2)', padding: '20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '20px' }}>
          <h4 style={{ color: 'var(--text-light)', marginTop: 0, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Economic Indicators</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}><Users size={16}/> Population</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{country.population.toFixed(1)}M</div>
            </div>
            
            <div style={{ height: '1px', background: 'var(--border)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}><DollarSign size={16}/> GDP (PPP)</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>${country.gdp_ppp}B</div>
            </div>

            <div style={{ height: '1px', background: 'var(--border)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}><DollarSign size={16}/> GDP per Capita</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>${country.gdp_per_cap.toLocaleString()}</div>
            </div>

            <div style={{ height: '1px', background: 'var(--border)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}>
                {country.realGdpGrowth >= 0 ? <TrendingUp size={16} color="var(--accent2)"/> : <TrendingDown size={16} color="var(--red)"/>}
                Real GDP Growth
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: country.realGdpGrowth >= 0 ? 'var(--accent2)' : 'var(--red)' }}>
                {country.realGdpGrowth}%
              </div>
            </div>

            <div style={{ height: '1px', background: 'var(--border)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}>
                {country.inflation > 10 ? <TrendingUp size={16} color="var(--red)"/> : <TrendingUp size={16} color="var(--accent)"/>}
                Inflation Rate
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: country.inflation > 10 ? 'var(--red)' : 'var(--text)' }}>
                {country.inflation}%
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
