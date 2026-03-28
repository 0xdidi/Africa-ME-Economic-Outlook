'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Controls } from '../components/Controls';
import { FilterPanel, Filters } from '../components/FilterPanel';
import { DataTable } from '../components/DataTable';
import { SearchBar } from '../components/SearchBar';
import { DashboardAggregate } from '../components/DashboardAggregate';
import { CountryModal } from '../components/CountryModal';
import { ComparisonModal } from '../components/ComparisonModal';
import { MapView } from '../components/MapView';
import { CountryData, countries } from '../data/countries';

export default function Home() {
  const [currentSort, setCurrentSort] = useState<keyof CountryData | 'rank'>('rank');
  const [currentDir, setCurrentDir] = useState<'asc' | 'desc'>('asc');
  const [currentRegion, setCurrentRegion] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<CountryData[]>([]);
  const [detailModalCountry, setDetailModalCountry] = useState<CountryData | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    pop: { min: null, max: null },
    gdp: { min: null, max: null },
    cap: { min: null, max: null },
    dis: { min: null, max: null },
  });

  const handleSort = (col: string) => {
    if (currentSort === col) {
      setCurrentDir(currentDir === 'desc' ? 'asc' : 'desc');
    } else {
      setCurrentSort(col as any);
      setCurrentDir('desc');
    }
  };

  const handleUpdateFilter = (key: keyof Filters, bound: 'min' | 'max', value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: { ...prev[key], [bound]: value }
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      pop: { min: null, max: null },
      gdp: { min: null, max: null },
      cap: { min: null, max: null },
      dis: { min: null, max: null },
    });
  };

  const processedData = useMemo(() => {
    let result = countries;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q));
    }

    // Filter by region
    result = currentRegion === 'all' 
      ? result 
      : result.filter(d => d.region === currentRegion);

    // AND-combine numeric filters
    result = result.filter(d =>
      (filters.pop.min === null || d.population >= filters.pop.min) &&
      (filters.pop.max === null || d.population <= filters.pop.max) &&
      (filters.gdp.min === null || d.gdp_ppp >= filters.gdp.min) &&
      (filters.gdp.max === null || d.gdp_ppp <= filters.gdp.max) &&
      (filters.cap.min === null || d.gdp_per_cap >= filters.cap.min) &&
      (filters.cap.max === null || d.gdp_per_cap <= filters.cap.max) &&
      (filters.dis.min === null || d.disposable >= filters.dis.min) &&
      (filters.dis.max === null || d.disposable <= filters.dis.max)
    );

    // Sort
    result.sort((a, b) => {
      let av = (a as any)[currentSort];
      let bv = (b as any)[currentSort];
      if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return currentDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    return result;
  }, [searchQuery, currentRegion, currentSort, currentDir, filters]);

  const handleSelectCountry = (c: CountryData, selected: boolean) => {
    if (selected) {
      if (selectedCountries.length < 4) {
        setSelectedCountries([...selectedCountries, c]);
      } else {
        alert("You can compare up to 4 countries maximum at a time.");
      }
    } else {
      setSelectedCountries(selectedCountries.filter(x => x.iso3 !== c.iso3));
    }
  };

  return (
    <main>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SearchBar 
          searchQuery={searchQuery} 
          onSearch={setSearchQuery} 
          filteredData={processedData} 
        />
        <DashboardAggregate data={processedData} />
      </div>

      <Controls 
        currentSort={currentSort as string}
        currentDir={currentDir}
        onSort={handleSort}
        currentRegion={currentRegion}
        onRegionChange={setCurrentRegion}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <FilterPanel 
        filters={filters}
        updateFilter={handleUpdateFilter}
        clearAll={clearAllFilters}
      />
      
      {viewMode === 'table' ? (
        <DataTable 
          data={processedData}
          currentSort={currentSort as string}
          currentDir={currentDir}
          onSort={handleSort}
          totalCount={countries.length}
          selectedCountries={selectedCountries}
          onSelectCountry={handleSelectCountry}
          onRowClick={setDetailModalCountry}
        />
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <MapView 
            data={processedData} 
            onCountryClick={setDetailModalCountry}
            // currentSort is typed properly in MapView
          />
        </div>
      )}

      {/* Floating Compare Button */}
      {selectedCountries.length > 1 && (
        <div style={{
          position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--surface)', padding: '15px 30px', borderRadius: '100px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 90, display: 'flex', alignItems: 'center', gap: '20px',
          border: '1px solid var(--accent)'
        }}>
          <span style={{ fontWeight: 600 }}>{selectedCountries.length} countries selected</span>
          <button 
            onClick={() => setShowComparison(true)}
            style={{ 
              background: 'var(--accent)', color: 'black', border: 'none', 
              padding: '10px 20px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Modals */}
      {detailModalCountry && (
        <CountryModal 
          country={detailModalCountry} 
          onClose={() => setDetailModalCountry(null)} 
        />
      )}
      
      {showComparison && (
        <ComparisonModal 
          countries={selectedCountries}
          onClose={() => setShowComparison(false)}
        />
      )}
    </main>
  );
}
