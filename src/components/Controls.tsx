import React from 'react';

interface ControlsProps {
  currentSort: string;
  currentDir: 'asc' | 'desc';
  onSort: (col: string) => void;
  currentRegion: string;
  onRegionChange: (region: string) => void;
}

export function Controls({ currentSort, currentDir, onSort, currentRegion, onRegionChange }: ControlsProps) {
  const getSortIcon = (col: string) => {
    if (currentSort === col) return currentDir === 'desc' ? '▼' : '▲';
    return '↕';
  };

  return (
    <div className="controls">
      <span className="sort-label">Sort</span>
      
      <button 
        className={`sort-btn ${currentSort === 'rank' ? 'active' : ''}`} 
        onClick={() => onSort('rank')}
      >
        Default <span className="arrow">{getSortIcon('rank')}</span>
      </button>
      
      <button 
        className={`sort-btn ${currentSort === 'population' ? 'active' : ''}`} 
        onClick={() => onSort('population')}
      >
        Population <span className="arrow">{getSortIcon('population')}</span>
      </button>
      
      <button 
        className={`sort-btn ${currentSort === 'gdp_ppp' ? 'active' : ''}`} 
        onClick={() => onSort('gdp_ppp')}
      >
        GDP (PPP) <span className="arrow">{getSortIcon('gdp_ppp')}</span>
      </button>
      
      <button 
        className={`sort-btn ${currentSort === 'gdp_per_cap' ? 'active' : ''}`} 
        onClick={() => onSort('gdp_per_cap')}
      >
        GDP / Capita <span className="arrow">{getSortIcon('gdp_per_cap')}</span>
      </button>
      
      <button 
        className={`sort-btn ${currentSort === 'disposable' ? 'active' : ''}`} 
        onClick={() => onSort('disposable')}
      >
        Disposable Inc. <span className="arrow">{getSortIcon('disposable')}</span>
      </button>

      <div className="region-pills">
        <button 
          className={`region-pill ${currentRegion === 'all' ? 'rp-all' : ''}`} 
          onClick={() => onRegionChange('all')}
        >
          All
        </button>
        <button 
          className={`region-pill ${currentRegion === 'Africa' ? 'rp-africa' : ''}`} 
          onClick={() => onRegionChange('Africa')}
        >
          Africa
        </button>
        <button 
          className={`region-pill ${currentRegion === 'Middle East' ? 'rp-me' : ''}`} 
          onClick={() => onRegionChange('Middle East')}
        >
          Middle East
        </button>
      </div>

      <style>{`
        /* ─── Sort bar ─── */
        .controls {
          max-width: 1200px;
          margin: 0 auto 12px;
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .sort-label {
          font-size: 10.5px;
          color: var(--text-muted);
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .sort-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-dim);
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .sort-btn:hover { border-color: var(--border-active); color: var(--text); background: var(--surface2); }
        .sort-btn.active { background: var(--accent); border-color: var(--accent); color: #0c0d0f; font-weight: 700; }
        .sort-btn .arrow { font-size: 10px; opacity: 0.7; }

        .region-pills { margin-left: auto; display: flex; gap: 7px; }
        .region-pill {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 11.5px;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .region-pill:hover { border-color: var(--border-active); color: var(--text-dim); }
        .rp-all    { border-color: var(--accent)   !important; color: var(--accent)   !important; }
        .rp-africa { border-color: var(--africa)   !important; color: var(--africa)   !important; }
        .rp-me     { border-color: var(--mideast)  !important; color: var(--mideast)  !important; }
      `}</style>
    </div>
  );
}
