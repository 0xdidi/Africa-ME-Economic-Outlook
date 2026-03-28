import React from 'react';
import { Search, Download } from 'lucide-react';
import { CountryData } from '../data/countries';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (s: string) => void;
  filteredData: CountryData[];
}

export function SearchBar({ searchQuery, onSearch, filteredData }: SearchBarProps) {
  const handleExport = () => {
    if (filteredData.length === 0) return;
    
    // get keys from first object
    const headers = Object.keys(filteredData[0]).filter(k => k !== 'flag' && k !== 'rank');
    
    const cwRows = filteredData.map(row => {
      return headers.map(header => {
        let val = (row as any)[header];
        if (typeof val === 'string') {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(',');
    });
    
    const csvContent = [headers.join(','), ...cwRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'economic_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '20px', alignItems: 'center' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={20} />
        <input 
          type="text" 
          placeholder="Search country by name or capital..." 
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 16px 16px 48px',
            borderRadius: '100px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </div>
      <button 
        onClick={handleExport}
        style={{ 
          padding: '14px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'var(--surface)', 
          color: 'var(--text)', 
          border: '1px solid var(--border)',
          borderRadius: '100px',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--border)';
          e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'var(--surface)';
          e.currentTarget.style.color = 'var(--text)';
        }}
      >
        <Download size={18} /> Export CSV
      </button>
    </div>
  );
}
