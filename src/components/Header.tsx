import React from 'react';

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Africa & <span>Middle East</span> — Economic Overview</h1>
        <p>Population · GDP (PPP) · GDP per Capita · Avg. Disposable Income &nbsp;·&nbsp; 2023–24 Estimates</p>
      </div>
      <div className="legend">
        <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--africa)' }}></div>Africa</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--mideast)' }}></div>Middle East</div>
      </div>

      <style>{`
        header {
          max-width: 1200px;
          margin: 0 auto 36px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }

        .header-left h1 {
          font-family: var(--font-syne), 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }
        .header-left h1 span { color: var(--accent); }
        .header-left p { margin-top: 6px; color: var(--text-muted); font-size: 12.5px; font-weight: 300; letter-spacing: 0.3px; }

        .legend { display: flex; gap: 18px; align-items: center; }
        .legend-item { display: flex; align-items: center; gap: 7px; font-size: 11.5px; color: var(--text-dim); font-family: var(--font-space-mono), 'Space Mono', monospace; }
        .legend-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
      `}</style>
    </header>
  );
}
