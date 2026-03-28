import React, { useState } from 'react';

export interface Bounds {
  min: number | null;
  max: number | null;
}

export interface Filters {
  pop: Bounds;
  gdp: Bounds;
  cap: Bounds;
  dis: Bounds;
}

interface FilterPanelProps {
  filters: Filters;
  updateFilter: (key: keyof Filters, bound: 'min' | 'max', value: number | null) => void;
  clearAll: () => void;
}

const CHIP_LABELS = { pop: 'Pop', gdp: 'GDP', cap: 'GDP/Cap', dis: 'Disp.Inc' };
const CHIP_CLS = { pop: 'chip-pop', gdp: 'chip-gdp', cap: 'chip-cap', dis: 'chip-dis' };

function fmtChipVal(key: keyof Filters, v: number) {
  if (key === 'pop') return v + 'M';
  if (key === 'gdp') return v >= 1000 ? '$' + (v / 1000).toFixed(1) + 'T' : '$' + v + 'B';
  return v >= 1000 ? '$' + (v / 1000).toFixed(0) + 'k' : '$' + v;
}

export function FilterPanel({ filters, updateFilter, clearAll }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate active filters count
  let activeCount = 0;
  Object.values(filters).forEach((f) => {
    if (f.min !== null) activeCount++;
    if (f.max !== null) activeCount++;
  });

  const handleInputChange = (key: keyof Filters, bound: 'min' | 'max', e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? null : parseFloat(e.target.value);
    updateFilter(key, bound, isNaN(val as number) ? null : val);
  };

  const handlePreset = (key: keyof Filters, minVal: number | null, maxVal: number | null) => {
    updateFilter(key, 'min', minVal);
    updateFilter(key, 'max', maxVal);
    if (!isOpen) setIsOpen(true);
  };

  const renderActiveChips = () => {
    const chips: React.ReactNode[] = [];
    (Object.entries(filters) as [keyof Filters, Bounds][]).forEach(([key, { min, max }]) => {
      if (min !== null) {
        chips.push(
          <span key={`${key}-min`} className={`chip ${CHIP_CLS[key]}`}>
            {CHIP_LABELS[key]} ≥ {fmtChipVal(key, min)}
            <button className="chip-x" onClick={() => updateFilter(key, 'min', null)}>×</button>
          </span>
        );
      }
      if (max !== null) {
        chips.push(
          <span key={`${key}-max`} className={`chip ${CHIP_CLS[key]}`}>
            {CHIP_LABELS[key]} ≤ {fmtChipVal(key, max)}
            <button className="chip-x" onClick={() => updateFilter(key, 'max', null)}>×</button>
          </span>
        );
      }
    });

    if (chips.length > 0) {
      chips.push(
        <button key="clear-all" className="clear-all-btn" onClick={clearAll}>
          clear all
        </button>
      );
    }
    return chips;
  };

  return (
    <div className="filter-panel-wrap">
      <div className="filter-toggle-bar">
        <button className={`filter-toggle-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="ftb-icon">+</span> Filters
          {activeCount > 0 && <span className="ftb-badge">{activeCount}</span>}
        </button>
        <div className="active-chips">{renderActiveChips()}</div>
      </div>

      {isOpen && (
        <div className="filter-panel open">
          <div className="fp-header">
            <span className="fp-title">Threshold Filters — all conditions AND-combined</span>
            <span className="fp-note">Leave blank to ignore that criterion</span>
          </div>

          <div className="filter-grid">
            {/* Population */}
            <div className="filter-row">
              <div className="fr-label">
                <div className="fr-dot" style={{ background: 'var(--chip-pop)' }}></div>
                <span style={{ color: 'var(--chip-pop)' }}>Population</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>(Millions)</span>
              </div>
              <div className="fr-inputs">
                <div className="fr-input-group">
                  <span className="fr-input-label">Min ≥</span>
                  <input
                    className={`fr-input ${filters.pop.min !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 10"
                    value={filters.pop.min ?? ''}
                    onChange={(e) => handleInputChange('pop', 'min', e)}
                  />
                </div>
                <span className="fr-sep">—</span>
                <div className="fr-input-group">
                  <span className="fr-input-label">Max ≤</span>
                  <input
                    className={`fr-input ${filters.pop.max !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 100"
                    value={filters.pop.max ?? ''}
                    onChange={(e) => handleInputChange('pop', 'max', e)}
                  />
                </div>
              </div>
              <div className="fr-presets">
                <span className="preset-label">Quick:</span>
                {[5, 10, 25, 50, 100].map((v) => (
                  <button
                    key={v}
                    className={`preset-chip preset-pop ${filters.pop.min === v && filters.pop.max === null ? 'used' : ''}`}
                    onClick={() => handlePreset('pop', v, null)}
                  >
                    ≥{v}M
                  </button>
                ))}
              </div>
            </div>

            {/* GDP PPP */}
            <div className="filter-row">
              <div className="fr-label">
                <div className="fr-dot" style={{ background: 'var(--chip-gdp)' }}></div>
                <span style={{ color: 'var(--chip-gdp)' }}>GDP (PPP)</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>($B)</span>
              </div>
              <div className="fr-inputs">
                <div className="fr-input-group">
                  <span className="fr-input-label">Min $B ≥</span>
                  <input
                    className={`fr-input ${filters.gdp.min !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 100"
                    value={filters.gdp.min ?? ''}
                    onChange={(e) => handleInputChange('gdp', 'min', e)}
                  />
                </div>
                <span className="fr-sep">—</span>
                <div className="fr-input-group">
                  <span className="fr-input-label">Max $B ≤</span>
                  <input
                    className={`fr-input ${filters.gdp.max !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 2000"
                    value={filters.gdp.max ?? ''}
                    onChange={(e) => handleInputChange('gdp', 'max', e)}
                  />
                </div>
              </div>
              <div className="fr-presets">
                <span className="preset-label">Quick:</span>
                {[
                  { v: 50, l: '≥$50B' },
                  { v: 100, l: '≥$100B' },
                  { v: 500, l: '≥$500B' },
                  { v: 1000, l: '≥$1T' },
                  { v: 2000, l: '≥$2T' }
                ].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`preset-chip preset-gdp ${filters.gdp.min === v && filters.gdp.max === null ? 'used' : ''}`}
                    onClick={() => handlePreset('gdp', v, null)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* GDP per Capita */}
            <div className="filter-row">
              <div className="fr-label">
                <div className="fr-dot" style={{ background: 'var(--chip-cap)' }}></div>
                <span style={{ color: 'var(--chip-cap)' }}>GDP / Capita</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>($)</span>
              </div>
              <div className="fr-inputs">
                <div className="fr-input-group">
                  <span className="fr-input-label">Min $ ≥</span>
                  <input
                    className={`fr-input ${filters.cap.min !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 5000"
                    value={filters.cap.min ?? ''}
                    onChange={(e) => handleInputChange('cap', 'min', e)}
                  />
                </div>
                <span className="fr-sep">—</span>
                <div className="fr-input-group">
                  <span className="fr-input-label">Max $ ≤</span>
                  <input
                    className={`fr-input ${filters.cap.max !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 50000"
                    value={filters.cap.max ?? ''}
                    onChange={(e) => handleInputChange('cap', 'max', e)}
                  />
                </div>
              </div>
              <div className="fr-presets">
                <span className="preset-label">Quick:</span>
                {[
                  { v: 2000, l: '≥$2k' },
                  { v: 5000, l: '≥$5k' },
                  { v: 10000, l: '≥$10k' },
                  { v: 25000, l: '≥$25k' },
                  { v: 50000, l: '≥$50k' }
                ].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`preset-chip preset-cap ${filters.cap.min === v && filters.cap.max === null ? 'used' : ''}`}
                    onClick={() => handlePreset('cap', v, null)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Disposable Income */}
            <div className="filter-row">
              <div className="fr-label">
                <div className="fr-dot" style={{ background: 'var(--chip-dis)' }}></div>
                <span style={{ color: 'var(--chip-dis)' }}>Disposable Income</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '9.5px' }}>($)</span>
              </div>
              <div className="fr-inputs">
                <div className="fr-input-group">
                  <span className="fr-input-label">Min $ ≥</span>
                  <input
                    className={`fr-input ${filters.dis.min !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 3000"
                    value={filters.dis.min ?? ''}
                    onChange={(e) => handleInputChange('dis', 'min', e)}
                  />
                </div>
                <span className="fr-sep">—</span>
                <div className="fr-input-group">
                  <span className="fr-input-label">Max $ ≤</span>
                  <input
                    className={`fr-input ${filters.dis.max !== null ? 'has-value' : ''}`}
                    type="number"
                    min="0"
                    placeholder="e.g. 20000"
                    value={filters.dis.max ?? ''}
                    onChange={(e) => handleInputChange('dis', 'max', e)}
                  />
                </div>
              </div>
              <div className="fr-presets">
                <span className="preset-label">Quick:</span>
                {[
                  { v: 1000, l: '≥$1k' },
                  { v: 3000, l: '≥$3k' },
                  { v: 5000, l: '≥$5k' },
                  { v: 10000, l: '≥$10k' },
                  { v: 20000, l: '≥$20k' }
                ].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`preset-chip preset-dis ${filters.dis.min === v && filters.dis.max === null ? 'used' : ''}`}
                    onClick={() => handlePreset('dis', v, null)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ─── Filter panel wrapper ─── */
        .filter-panel-wrap { max-width: 1200px; margin: 0 auto 16px; }

        .filter-toggle-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

        .filter-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-dim);
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          padding: 7px 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .filter-toggle-btn:hover { border-color: var(--border-active); color: var(--text); }
        .filter-toggle-btn.open { border-color: var(--accent); color: var(--accent); background: rgba(240,196,74,0.06); }
        .ftb-icon { font-size: 14px; line-height: 1; transition: transform 0.2s; display: inline-block; }
        .filter-toggle-btn.open .ftb-icon { transform: rotate(45deg); }

        .ftb-badge {
          background: var(--accent);
          color: #0c0d0f;
          font-size: 9px;
          padding: 1px 6px;
          border-radius: 10px;
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          font-weight: 700;
          line-height: 14px;
        }

        /* Active chips */
        .active-chips { display: flex; gap: 7px; flex-wrap: wrap; align-items: center; }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid;
          white-space: nowrap;
          animation: chipIn 0.15s ease;
        }

        .chip-pop { color: var(--chip-pop); border-color: rgba(248,113,113,0.35); background: rgba(248,113,113,0.07); }
        .chip-gdp { color: var(--chip-gdp); border-color: rgba(147,197,253,0.35); background: rgba(147,197,253,0.07); }
        .chip-cap { color: var(--chip-cap); border-color: rgba(110,231,183,0.35); background: rgba(110,231,183,0.07); }
        .chip-dis { color: var(--chip-dis); border-color: rgba(192,132,252,0.35); background: rgba(192,132,252,0.07); }

        .chip-x {
          background: none; border: none; color: inherit; cursor: pointer;
          opacity: 0.55; font-size: 13px; line-height: 1; padding: 0;
          font-family: monospace; transition: opacity 0.1s;
        }
        .chip-x:hover { opacity: 1; }

        .clear-all-btn {
          background: none; border: none; color: var(--text-muted);
          font-size: 11px; font-family: var(--font-space-mono), 'Space Mono', monospace;
          cursor: pointer; padding: 3px 6px;
          text-decoration: underline; text-underline-offset: 2px; transition: color 0.15s;
        }
        .clear-all-btn:hover { color: var(--red); }

        /* The panel itself */
        .filter-panel {
          margin-top: 12px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px 24px 24px;
          animation: panelOpen 0.18s ease;
        }

        .fp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .fp-title {
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .fp-note { font-size: 11px; color: var(--text-muted); font-family: var(--font-space-mono), 'Space Mono', monospace; opacity: 0.55; }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
          gap: 22px;
        }

        .filter-row { display: flex; flex-direction: column; gap: 10px; }

        .fr-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }

        .fr-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        .fr-inputs { display: flex; align-items: center; gap: 8px; }

        .fr-input-group { display: flex; flex-direction: column; gap: 3px; flex: 1; }

        .fr-input-label {
          font-size: 9.5px;
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .fr-input {
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          font-size: 12px;
          padding: 8px 10px;
          border-radius: 6px;
          width: 100%;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
          -moz-appearance: textfield;
        }
        .fr-input::-webkit-inner-spin-button,
        .fr-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .fr-input:focus { border-color: var(--border-active); box-shadow: 0 0 0 2px rgba(255,255,255,0.03); }
        .fr-input.has-value { border-color: rgba(255,255,255,0.2); }

        .fr-sep { color: var(--text-muted); font-family: var(--font-space-mono), 'Space Mono', monospace; font-size: 12px; margin-top: 18px; flex-shrink: 0; }

        .fr-presets { display: flex; gap: 5px; flex-wrap: wrap; align-items: center; }

        .preset-label { font-size: 9.5px; color: var(--text-muted); font-family: var(--font-space-mono), 'Space Mono', monospace; }

        .preset-chip {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-family: var(--font-space-mono), 'Space Mono', monospace;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.12s;
          white-space: nowrap;
        }
        .preset-chip:hover { border-color: var(--border-active); color: var(--text-dim); }
        .preset-pop.used { color: var(--chip-pop); border-color: rgba(248,113,113,0.5); background: rgba(248,113,113,0.08); }
        .preset-gdp.used { color: var(--chip-gdp); border-color: rgba(147,197,253,0.5); background: rgba(147,197,253,0.08); }
        .preset-cap.used { color: var(--chip-cap); border-color: rgba(110,231,183,0.5); background: rgba(110,231,183,0.08); }
        .preset-dis.used { color: var(--chip-dis); border-color: rgba(192,132,252,0.5); background: rgba(192,132,252,0.08); }
      `}</style>
    </div>
  );
}
