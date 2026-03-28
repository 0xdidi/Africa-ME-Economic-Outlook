'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Controls } from '../components/Controls';
import { FilterPanel, Filters } from '../components/FilterPanel';
import { DataTable } from '../components/DataTable';
import { countries } from '../data/countries';

export default function Home() {
  const [currentSort, setCurrentSort] = useState<string>('rank');
  const [currentDir, setCurrentDir] = useState<'asc' | 'desc'>('asc');
  const [currentRegion, setCurrentRegion] = useState<string>('all');
  
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
      setCurrentSort(col);
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
    // 1. Filter by region
    let result = currentRegion === 'all' 
      ? countries 
      : countries.filter(d => d.region === currentRegion);

    // 2. AND-combine numeric filters
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

    // 3. Sort
    result.sort((a, b) => {
      let av = (a as any)[currentSort];
      let bv = (b as any)[currentSort];
      if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return currentDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    return result;
  }, [countries, currentRegion, currentSort, currentDir, filters]);

  return (
    <main>
      <Header />
      <Controls 
        currentSort={currentSort}
        currentDir={currentDir}
        onSort={handleSort}
        currentRegion={currentRegion}
        onRegionChange={setCurrentRegion}
      />
      <FilterPanel 
        filters={filters}
        updateFilter={handleUpdateFilter}
        clearAll={clearAllFilters}
      />
      <DataTable 
        data={processedData}
        currentSort={currentSort}
        currentDir={currentDir}
        onSort={handleSort}
        totalCount={countries.length}
      />
    </main>
  );
}
