import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { CountryData } from '../data/countries';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapViewProps {
  data: CountryData[];
  onCountryClick: (country: CountryData) => void;
}

// Map custom short names in our data to world-atlas topjson standard names
const nameMapping: Record<string, string> = {
  "Tanzania": "United Republic of Tanzania",
  "UAE": "United Arab Emirates"
};

export function MapView({ data, onCountryClick }: MapViewProps) {

  return (
    <div style={{ background: 'var(--panel-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', height: '500px', width: '100%', overflow: 'hidden', position: 'relative', marginBottom: '20px' }}>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 220 }} style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg)' }}>
        <ZoomableGroup center={[20, 5]} zoom={2.2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = geo.properties.name;
                const matchedCountry = data.find(c => {
                  const mapped = nameMapping[c.name] || c.name;
                  return mapped === geoName;
                });
                
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
