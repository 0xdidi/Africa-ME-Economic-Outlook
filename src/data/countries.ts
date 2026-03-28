export interface CountryData {
  name: string;
  flag: string;
  region: 'Middle East' | 'Africa';
  population: number;
  gdp_ppp: number;
  gdp_per_cap: number;
  disposable: number;
  rank?: number;
}

export const rawCountries: CountryData[] = [
  { name: "Turkey",       flag: "🇹🇷", region: "Middle East", population: 85.3,  gdp_ppp: 3650,  gdp_per_cap: 42800,  disposable: 14200 },
  { name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East", population: 37.5,  gdp_ppp: 2080,  gdp_per_cap: 55500,  disposable: 28000 },
  { name: "Iran",         flag: "🇮🇷", region: "Middle East", population: 88.6,  gdp_ppp: 1630,  gdp_per_cap: 18400,  disposable: 7200  },
  { name: "UAE",          flag: "🇦🇪", region: "Middle East", population: 10.1,  gdp_ppp: 760,   gdp_per_cap: 75300,  disposable: 32500 },
  { name: "Iraq",         flag: "🇮🇶", region: "Middle East", population: 42.3,  gdp_ppp: 510,   gdp_per_cap: 12100,  disposable: 4800  },
  { name: "Israel",       flag: "🇮🇱", region: "Middle East", population: 9.7,   gdp_ppp: 490,   gdp_per_cap: 50500,  disposable: 27000 },
  { name: "Qatar",        flag: "🇶🇦", region: "Middle East", population: 3.0,   gdp_ppp: 325,   gdp_per_cap: 108000, disposable: 46000 },
  { name: "Kuwait",       flag: "🇰🇼", region: "Middle East", population: 4.9,   gdp_ppp: 240,   gdp_per_cap: 49000,  disposable: 24200 },
  { name: "Oman",         flag: "🇴🇲", region: "Middle East", population: 4.6,   gdp_ppp: 225,   gdp_per_cap: 48900,  disposable: 20500 },
  { name: "Jordan",       flag: "🇯🇴", region: "Middle East", population: 10.2,  gdp_ppp: 125,   gdp_per_cap: 12300,  disposable: 5200  },
  { name: "Bahrain",      flag: "🇧🇭", region: "Middle East", population: 1.8,   gdp_ppp: 95,    gdp_per_cap: 52800,  disposable: 22000 },
  { name: "Lebanon",      flag: "🇱🇧", region: "Middle East", population: 5.4,   gdp_ppp: 78,    gdp_per_cap: 14400,  disposable: 3800  },
  { name: "Yemen",        flag: "🇾🇪", region: "Middle East", population: 33.7,  gdp_ppp: 55,    gdp_per_cap: 1630,   disposable: 900   },
  { name: "Syria",        flag: "🇸🇾", region: "Middle East", population: 22.1,  gdp_ppp: 50,    gdp_per_cap: 2260,   disposable: 800   },
  { name: "Palestine",    flag: "🇵🇸", region: "Middle East", population: 5.4,   gdp_ppp: 30,    gdp_per_cap: 5500,   disposable: 2200  },
  { name: "Nigeria",      flag: "🇳🇬", region: "Africa",      population: 224.0, gdp_ppp: 1330,  gdp_per_cap: 5940,   disposable: 2100  },
  { name: "Egypt",        flag: "🇪🇬", region: "Africa",      population: 105.9, gdp_ppp: 1790,  gdp_per_cap: 16900,  disposable: 5400  },
  { name: "South Africa", flag: "🇿🇦", region: "Africa",      population: 60.4,  gdp_ppp: 960,   gdp_per_cap: 15900,  disposable: 6200  },
  { name: "Algeria",      flag: "🇩🇿", region: "Africa",      population: 45.6,  gdp_ppp: 690,   gdp_per_cap: 15100,  disposable: 5100  },
  { name: "Ethiopia",     flag: "🇪🇹", region: "Africa",      population: 126.5, gdp_ppp: 400,   gdp_per_cap: 3160,   disposable: 1300  },
  { name: "Morocco",      flag: "🇲🇦", region: "Africa",      population: 37.5,  gdp_ppp: 385,   gdp_per_cap: 10300,  disposable: 4100  },
  { name: "Kenya",        flag: "🇰🇪", region: "Africa",      population: 55.1,  gdp_ppp: 355,   gdp_per_cap: 6450,   disposable: 2550  },
  { name: "Tanzania",     flag: "🇹🇿", region: "Africa",      population: 65.5,  gdp_ppp: 225,   gdp_per_cap: 3440,   disposable: 1400  },
  { name: "Ghana",        flag: "🇬🇭", region: "Africa",      population: 33.5,  gdp_ppp: 220,   gdp_per_cap: 6560,   disposable: 2750  },
  { name: "Angola",       flag: "🇦🇴", region: "Africa",      population: 35.0,  gdp_ppp: 265,   gdp_per_cap: 7570,   disposable: 2450  },
  { name: "Sudan",        flag: "🇸🇩", region: "Africa",      population: 46.8,  gdp_ppp: 235,   gdp_per_cap: 5020,   disposable: 1500  },
  { name: "Ivory Coast",  flag: "🇨🇮", region: "Africa",      population: 27.5,  gdp_ppp: 185,   gdp_per_cap: 6730,   disposable: 2500  },
  { name: "Cameroon",     flag: "🇨🇲", region: "Africa",      population: 28.2,  gdp_ppp: 135,   gdp_per_cap: 4790,   disposable: 1850  },
  { name: "Uganda",       flag: "🇺🇬", region: "Africa",      population: 47.5,  gdp_ppp: 148,   gdp_per_cap: 3120,   disposable: 1250  },
  { name: "Tunisia",      flag: "🇹🇳", region: "Africa",      population: 12.0,  gdp_ppp: 168,   gdp_per_cap: 14000,  disposable: 5200  },
  { name: "DR Congo",     flag: "🇨🇩", region: "Africa",      population: 100.0, gdp_ppp: 148,   gdp_per_cap: 1480,   disposable: 620   },
  { name: "Libya",        flag: "🇱🇾", region: "Africa",      population: 7.1,   gdp_ppp: 124,   gdp_per_cap: 17500,  disposable: 6300  },
  { name: "Zambia",       flag: "🇿🇲", region: "Africa",      population: 20.0,  gdp_ppp: 82,    gdp_per_cap: 4100,   disposable: 1550  },
  { name: "Senegal",      flag: "🇸🇳", region: "Africa",      population: 17.8,  gdp_ppp: 87,    gdp_per_cap: 4890,   disposable: 1820  },
  { name: "Zimbabwe",     flag: "🇿🇼", region: "Africa",      population: 16.3,  gdp_ppp: 52,    gdp_per_cap: 3190,   disposable: 1200  },
  { name: "Rwanda",       flag: "🇷🇼", region: "Africa",      population: 14.1,  gdp_ppp: 57,    gdp_per_cap: 4040,   disposable: 1550  },
  { name: "Mali",         flag: "🇲🇱", region: "Africa",      population: 22.4,  gdp_ppp: 58,    gdp_per_cap: 2590,   disposable: 1020  },
  { name: "Mozambique",   flag: "🇲🇿", region: "Africa",      population: 33.1,  gdp_ppp: 52,    gdp_per_cap: 1570,   disposable: 680   },
  { name: "Burkina Faso", flag: "🇧🇫", region: "Africa",      population: 22.7,  gdp_ppp: 57,    gdp_per_cap: 2510,   disposable: 1000  },
  { name: "Niger",        flag: "🇳🇪", region: "Africa",      population: 25.6,  gdp_ppp: 42,    gdp_per_cap: 1640,   disposable: 640   },
  { name: "Madagascar",   flag: "🇲🇬", region: "Africa",      population: 28.9,  gdp_ppp: 52,    gdp_per_cap: 1800,   disposable: 750   },
  { name: "Botswana",     flag: "🇧🇼", region: "Africa",      population: 2.6,   gdp_ppp: 43,    gdp_per_cap: 16500,  disposable: 6100  },
  { name: "Namibia",      flag: "🇳🇦", region: "Africa",      population: 2.7,   gdp_ppp: 30,    gdp_per_cap: 11100,  disposable: 4200  },
  { name: "Mauritius",    flag: "🇲🇺", region: "Africa",      population: 1.3,   gdp_ppp: 32,    gdp_per_cap: 24600,  disposable: 10500 },
  { name: "Gabon",        flag: "🇬🇦", region: "Africa",      population: 2.4,   gdp_ppp: 35,    gdp_per_cap: 14600,  disposable: 5500  },
];

export const countries = rawCountries.map((d, i) => ({ ...d, rank: i + 1 }));

export const maxVals = {
  population:  Math.max(...countries.map(d => d.population)),
  gdp_ppp:     Math.max(...countries.map(d => d.gdp_ppp)),
  gdp_per_cap: Math.max(...countries.map(d => d.gdp_per_cap)),
  disposable:  Math.max(...countries.map(d => d.disposable)),
};
