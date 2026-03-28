import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { CountryData } from '../data/countries';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

interface MapViewProps {
  data: CountryData[];
  onCountryClick: (country: CountryData) => void;
}

export function MapView({ data, onCountryClick }: MapViewProps) {

  return (
    <div style={{ background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', height: '500px', width: '100%', overflow: 'hidden', position: 'relative', marginBottom: '20px' }}>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 220 }} style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg)' }}>
        <ZoomableGroup center={[20, 5]} zoom={2.2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoIso3 = geo.id; // It has ISO3 inside the id block
                const matchedCountry = data.find(c => c.iso3 === geoIso3);
                
                const isSelected = !!matchedCountry;
                const fill = isSelected ? 'var(--primary)' : 'var(--border)';

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="var(--bg)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: isSelected ? "var(--accent2)" : fill, outline: "none", cursor: isSelected ? 'pointer' : 'default' },
                      pressed: { outline: "none" }
                    }}
                    onClick={() => {
                      if (matchedCountry) onCountryClick(matchedCountry);
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--text-main)', background: 'var(--surface2)', padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
        Interactive Map (Filtered highlights in Gold)
      </div>
    </div>
  );
}
