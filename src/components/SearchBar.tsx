import React from 'react';
import { Search, Download } from 'lucide-react';
import { CountryData } from '../data/countries';
import '../app/globals.css';

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
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={20} />
        <input 
          type="text" 
          placeholder="Search country by name or capital..." 
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--panel-bg)',
            color: 'var(--text-main)',
            fontSize: '1rem',
            fontFamily: 'var(--font-heading)',
            outline: 'none',
            transition: 'var(--transition)'
          }}
        />
      </div>
      <button 
        className="chip" 
        onClick={handleExport}
        style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: 'black' }}
      >
        <Download size={18} /> Export CSV
      </button>
    </div>
  );
}
