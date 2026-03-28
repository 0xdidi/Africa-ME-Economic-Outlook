import React from 'react';
import { CountryData, maxVals } from '../data/countries';

interface DataTableProps {
  data: CountryData[];
  currentSort: string;
  currentDir: 'asc' | 'desc';
  onSort: (col: string) => void;
  totalCount: number;
}

export function DataTable({ data, currentSort, currentDir, onSort, totalCount }: DataTableProps) {
  const getSortIcon = (col: string) => {
    return currentSort === col && currentDir === 'desc' ? '▼' : '▲';
  };

  const pctOf = (v: number, max: number) => ((v / max) * 100).toFixed(1);

  const fmtPop = (v: number) => v.toFixed(v >= 100 ? 0 : 1) + 'M';
  const fmtB = (v: number) => (v >= 1000 ? '$' + (v / 1000).toFixed(2) + 'T' : '$' + v.toFixed(0) + 'B');
  const fmtK = (v: number) => (v >= 1000 ? '$' + (v / 1000).toFixed(1) + 'k' : '$' + v.toFixed(0));

  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: '44px' }}>#</th>
              <th style={{ width: '90px' }}>Region</th>
              <th className={`sortable ${currentSort === 'rank' ? 'sorted' : ''}`} onClick={() => onSort('rank')}>
                <div className="th-inner">Country <span className="sort-icon">{getSortIcon('rank')}</span></div>
              </th>
              <th className={`sortable ${currentSort === 'population' ? 'sorted' : ''}`} onClick={() => onSort('population')} style={{ textAlign: 'right' }}>
                <div className="th-inner" style={{ justifyContent: 'flex-end' }}>Population <span className="sort-icon">{getSortIcon('population')}</span></div>
              </th>
              <th className={`sortable ${currentSort === 'gdp_ppp' ? 'sorted' : ''}`} onClick={() => onSort('gdp_ppp')} style={{ textAlign: 'right' }}>
                <div className="th-inner" style={{ justifyContent: 'flex-end' }}>GDP PPP <span className="sort-icon">{getSortIcon('gdp_ppp')}</span></div>
              </th>
              <th className={`sortable ${currentSort === 'gdp_per_cap' ? 'sorted' : ''}`} onClick={() => onSort('gdp_per_cap')} style={{ textAlign: 'right' }}>
                <div className="th-inner" style={{ justifyContent: 'flex-end' }}>GDP / Capita <span className="sort-icon">{getSortIcon('gdp_per_cap')}</span></div>
              </th>
              <th className={`sortable ${currentSort === 'disposable' ? 'sorted' : ''}`} onClick={() => onSort('disposable')} style={{ textAlign: 'right' }}>
                <div className="th-inner" style={{ justifyContent: 'flex-end' }}>Avg Disposable <span className="sort-icon">{getSortIcon('disposable')}</span></div>
              </th>
              <th style={{ minWidth: '120px', paddingLeft: '12px' }}>Scale</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state">
                    <div className="es-icon">∅</div>
                    <p>No countries match all active filters.<br /><strong>Try relaxing one or more conditions.</strong></p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((d, i) => {
                let barPct, barClass;
                if (currentSort === 'population') {
                  barPct = pctOf(d.population, maxVals.population);
                  barClass = '';
                } else if (currentSort === 'gdp_ppp') {
                  barPct = pctOf(d.gdp_ppp, maxVals.gdp_ppp);
                  barClass = 'blue';
                } else if (currentSort === 'gdp_per_cap') {
                  barPct = pctOf(d.gdp_per_cap, maxVals.gdp_per_cap);
                  barClass = 'green';
                } else if (currentSort === 'disposable') {
                  barPct = pctOf(d.disposable, maxVals.disposable);
                  barClass = 'red';
                } else {
                  barPct = pctOf(d.gdp_ppp, maxVals.gdp_ppp);
                  barClass = 'blue';
                }

                return (
                  <tr key={d.name}>
                    <td className="rank">{i + 1}</td>
                    <td>
                      {d.region === 'Africa' ? (
                        <span className="region-badge badge-africa">Africa</span>
                      ) : (
                        <span className="region-badge badge-me">Mid East</span>
                      )}
                    </td>
                    <td className="country-name"><span className="flag">{d.flag}</span>{d.name}</td>
                    <td className={`num ${currentSort === 'population' ? 'highlight' : ''}`}>{fmtPop(d.population)}</td>
                    <td className={`num ${currentSort === 'gdp_ppp' ? 'highlight' : ''}`}>{fmtB(d.gdp_ppp)}</td>
                    <td className={`num ${currentSort === 'gdp_per_cap' ? 'highlight' : ''}`}>{fmtK(d.gdp_per_cap)}</td>
                    <td className={`num ${currentSort === 'disposable' ? 'highlight' : ''}`}>{fmtK(d.disposable)}</td>
                    <td>
                      <div className="bar-cell">
                        <div className="bar-track">
                          <div className={`bar-fill ${barClass}`} style={{ width: `${barPct}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-meta">
        <span className="count-text">Showing <strong>{data.length}</strong> of <strong>{totalCount}</strong> countries</span>
        <span className="note">Sources: IMF WEO 2024 · World Bank · OECD · UN DESA · Numbeo</span>
      </div>

      <style>{`
        .table-wrap { max-width: 1200px; margin: 0 auto; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
        
        .empty-state { padding: 60px 24px; text-align: center; color: var(--text-muted); }
        .empty-state .es-icon { font-size: 32px; margin-bottom: 12px; }
        .empty-state p { font-size: 13px; line-height: 1.8; }
        .empty-state strong { color: var(--accent); }

        .table-meta {
          max-width: 1200px;
          margin: 14px auto 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .count-text { font-size: 11.5px; color: var(--text-muted); font-family: var(--font-space-mono), 'Space Mono', monospace; }
        .count-text strong { color: var(--accent); }
        .note { font-size: 10.5px; color: #3d4450; font-family: var(--font-space-mono), 'Space Mono', monospace; }
      `}</style>
    </>
  );
}
