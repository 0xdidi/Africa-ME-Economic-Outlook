export interface CountryData {
  name: string;
  iso3: string;
  flag: string;
  region: 'Middle East' | 'Africa';
  population: number;
  gdp_ppp: number;
  gdp_per_cap: number;
  disposable: number;
  inflation: number;
  realGdpGrowth: number;
  capital: string;
  currency: string;
  rank?: number;
}

export const rawCountries: CountryData[] = [
  { name: "Turkey",       iso3: "TUR", flag: "🇹🇷", region: "Middle East", population: 85.3,  gdp_ppp: 3650,  gdp_per_cap: 42800,  disposable: 14200, inflation: 58.9, realGdpGrowth: 4.1, capital: "Ankara",      currency: "TRY" },
  { name: "Saudi Arabia", iso3: "SAU", flag: "🇸🇦", region: "Middle East", population: 37.5,  gdp_ppp: 2080,  gdp_per_cap: 55500,  disposable: 28000, inflation: 2.3,  realGdpGrowth: 1.5, capital: "Riyadh",      currency: "SAR" },
  { name: "Iran",         iso3: "IRN", flag: "🇮🇷", region: "Middle East", population: 88.6,  gdp_ppp: 1630,  gdp_per_cap: 18400,  disposable: 7200,  inflation: 47.0, realGdpGrowth: 3.0, capital: "Tehran",      currency: "IRR" },
  { name: "UAE",          iso3: "ARE", flag: "🇦🇪", region: "Middle East", population: 10.1,  gdp_ppp: 760,   gdp_per_cap: 75300,  disposable: 32500, inflation: 3.1,  realGdpGrowth: 3.4, capital: "Abu Dhabi",   currency: "AED" },
  { name: "Iraq",         iso3: "IRQ", flag: "🇮🇶", region: "Middle East", population: 42.3,  gdp_ppp: 510,   gdp_per_cap: 12100,  disposable: 4800,  inflation: 4.5,  realGdpGrowth: -2.3,capital: "Baghdad",     currency: "IQD" },
  { name: "Israel",       iso3: "ISR", flag: "🇮🇱", region: "Middle East", population: 9.7,   gdp_ppp: 490,   gdp_per_cap: 50500,  disposable: 27000, inflation: 4.2,  realGdpGrowth: 2.0, capital: "Jerusalem",   currency: "ILS" },
  { name: "Qatar",        iso3: "QAT", flag: "🇶🇦", region: "Middle East", population: 3.0,   gdp_ppp: 325,   gdp_per_cap: 108000, disposable: 46000, inflation: 3.0,  realGdpGrowth: 2.1, capital: "Doha",        currency: "QAR" },
  { name: "Kuwait",       iso3: "KWT", flag: "🇰🇼", region: "Middle East", population: 4.9,   gdp_ppp: 240,   gdp_per_cap: 49000,  disposable: 24200, inflation: 3.2,  realGdpGrowth: 0.1, capital: "Kuwait City", currency: "KWD" },
  { name: "Oman",         iso3: "OMN", flag: "🇴🇲", region: "Middle East", population: 4.6,   gdp_ppp: 225,   gdp_per_cap: 48900,  disposable: 20500, inflation: 1.0,  realGdpGrowth: 1.3, capital: "Muscat",      currency: "OMR" },
  { name: "Jordan",       iso3: "JOR", flag: "🇯🇴", region: "Middle East", population: 10.2,  gdp_ppp: 125,   gdp_per_cap: 12300,  disposable: 5200,  inflation: 2.1,  realGdpGrowth: 2.6, capital: "Amman",       currency: "JOD" },
  { name: "Bahrain",      iso3: "BHR", flag: "🇧🇭", region: "Middle East", population: 1.8,   gdp_ppp: 95,    gdp_per_cap: 52800,  disposable: 22000, inflation: 1.2,  realGdpGrowth: 2.7, capital: "Manama",      currency: "BHD" },
  { name: "Lebanon",      iso3: "LBN", flag: "🇱🇧", region: "Middle East", population: 5.4,   gdp_ppp: 78,    gdp_per_cap: 14400,  disposable: 3800,  inflation: 208.0,realGdpGrowth: -0.5,capital: "Beirut",      currency: "LBP" },
  { name: "Yemen",        iso3: "YEM", flag: "🇾🇪", region: "Middle East", population: 33.7,  gdp_ppp: 55,    gdp_per_cap: 1630,   disposable: 900,   inflation: 15.0, realGdpGrowth: -2.0,capital: "Sana'a",      currency: "YER" },
  { name: "Syria",        iso3: "SYR", flag: "🇸🇾", region: "Middle East", population: 22.1,  gdp_ppp: 50,    gdp_per_cap: 2260,   disposable: 800,   inflation: 60.0, realGdpGrowth: -3.0,capital: "Damascus",    currency: "SYP" },
  { name: "Palestine",    iso3: "PSE", flag: "🇵🇸", region: "Middle East", population: 5.4,   gdp_ppp: 30,    gdp_per_cap: 5500,   disposable: 2200,  inflation: 4.0,  realGdpGrowth: -1.5,capital: "Ramallah",    currency: "ILS" },
  { name: "Nigeria",      iso3: "NGA", flag: "🇳🇬", region: "Africa",      population: 224.0, gdp_ppp: 1330,  gdp_per_cap: 5940,   disposable: 2100,  inflation: 24.5, realGdpGrowth: 2.9, capital: "Abuja",       currency: "NGN" },
  { name: "Egypt",        iso3: "EGY", flag: "🇪🇬", region: "Africa",      population: 105.9, gdp_ppp: 1790,  gdp_per_cap: 16900,  disposable: 5400,  inflation: 33.7, realGdpGrowth: 4.2, capital: "Cairo",       currency: "EGP" },
  { name: "South Africa", iso3: "ZAF", flag: "🇿🇦", region: "Africa",      population: 60.4,  gdp_ppp: 960,   gdp_per_cap: 15900,  disposable: 6200,  inflation: 6.0,  realGdpGrowth: 0.9, capital: "Pretoria",    currency: "ZAR" },
  { name: "Algeria",      iso3: "DZA", flag: "🇩🇿", region: "Africa",      population: 45.6,  gdp_ppp: 690,   gdp_per_cap: 15100,  disposable: 5100,  inflation: 9.3,  realGdpGrowth: 4.1, capital: "Algiers",     currency: "DZD" },
  { name: "Ethiopia",     iso3: "ETH", flag: "🇪🇹", region: "Africa",      population: 126.5, gdp_ppp: 400,   gdp_per_cap: 3160,   disposable: 1300,  inflation: 28.0, realGdpGrowth: 6.1, capital: "Addis Ababa", currency: "ETB" },
  { name: "Morocco",      iso3: "MAR", flag: "🇲🇦", region: "Africa",      population: 37.5,  gdp_ppp: 385,   gdp_per_cap: 10300,  disposable: 4100,  inflation: 6.1,  realGdpGrowth: 3.0, capital: "Rabat",       currency: "MAD" },
  { name: "Kenya",        iso3: "KEN", flag: "🇰🇪", region: "Africa",      population: 55.1,  gdp_ppp: 355,   gdp_per_cap: 6450,   disposable: 2550,  inflation: 7.7,  realGdpGrowth: 5.0, capital: "Nairobi",     currency: "KES" },
  { name: "Tanzania",     iso3: "TZA", flag: "🇹🇿", region: "Africa",      population: 65.5,  gdp_ppp: 225,   gdp_per_cap: 3440,   disposable: 1400,  inflation: 4.0,  realGdpGrowth: 5.2, capital: "Dodoma",      currency: "TZS" },
  { name: "Ghana",        iso3: "GHA", flag: "🇬🇭", region: "Africa",      population: 33.5,  gdp_ppp: 220,   gdp_per_cap: 6560,   disposable: 2750,  inflation: 40.0, realGdpGrowth: 1.5, capital: "Accra",       currency: "GHS" },
  { name: "Angola",       iso3: "AGO", flag: "🇦🇴", region: "Africa",      population: 35.0,  gdp_ppp: 265,   gdp_per_cap: 7570,   disposable: 2450,  inflation: 13.6, realGdpGrowth: 1.3, capital: "Luanda",      currency: "AOA" },
  { name: "Sudan",        iso3: "SDN", flag: "🇸🇩", region: "Africa",      population: 46.8,  gdp_ppp: 235,   gdp_per_cap: 5020,   disposable: 1500,  inflation: 256.0,realGdpGrowth: -12.0,capital:"Khartoum",    currency: "SDG" },
  { name: "Ivory Coast",  iso3: "CIV", flag: "🇨🇮", region: "Africa",      population: 27.5,  gdp_ppp: 185,   gdp_per_cap: 6730,   disposable: 2500,  inflation: 4.4,  realGdpGrowth: 6.5, capital: "Yamoussoukro",currency: "XOF" },
  { name: "Cameroon",     iso3: "CMR", flag: "🇨🇲", region: "Africa",      population: 28.2,  gdp_ppp: 135,   gdp_per_cap: 4790,   disposable: 1850,  inflation: 5.9,  realGdpGrowth: 4.0, capital: "Yaoundé",     currency: "XAF" },
  { name: "Uganda",       iso3: "UGA", flag: "🇺🇬", region: "Africa",      population: 47.5,  gdp_ppp: 148,   gdp_per_cap: 3120,   disposable: 1250,  inflation: 5.3,  realGdpGrowth: 5.7, capital: "Kampala",     currency: "UGX" },
  { name: "Tunisia",      iso3: "TUN", flag: "🇹🇳", region: "Africa",      population: 12.0,  gdp_ppp: 168,   gdp_per_cap: 14000,  disposable: 5200,  inflation: 9.3,  realGdpGrowth: 1.3, capital: "Tunis",       currency: "TND" },
  { name: "DR Congo",     iso3: "COD", flag: "🇨🇩", region: "Africa",      population: 100.0, gdp_ppp: 148,   gdp_per_cap: 1480,   disposable: 620,   inflation: 19.9, realGdpGrowth: 6.8, capital: "Kinshasa",    currency: "CDF" },
  { name: "Libya",        iso3: "LBY", flag: "🇱🇾", region: "Africa",      population: 7.1,   gdp_ppp: 124,   gdp_per_cap: 17500,  disposable: 6300,  inflation: 2.4,  realGdpGrowth: 12.5,capital: "Tripoli",     currency: "LYD" },
  { name: "Zambia",       iso3: "ZMB", flag: "🇿🇲", region: "Africa",      population: 20.0,  gdp_ppp: 82,    gdp_per_cap: 4100,   disposable: 1550,  inflation: 10.9, realGdpGrowth: 4.2, capital: "Lusaka",      currency: "ZMW" },
  { name: "Senegal",      iso3: "SEN", flag: "🇸🇳", region: "Africa",      population: 17.8,  gdp_ppp: 87,    gdp_per_cap: 4890,   disposable: 1820,  inflation: 3.1,  realGdpGrowth: 8.3, capital: "Dakar",       currency: "XOF" },
  { name: "Zimbabwe",     iso3: "ZWE", flag: "🇿🇼", region: "Africa",      population: 16.3,  gdp_ppp: 52,    gdp_per_cap: 3190,   disposable: 1200,  inflation: 314.5,realGdpGrowth: 4.1, capital: "Harare",      currency: "ZWL" },
  { name: "Rwanda",       iso3: "RWA", flag: "🇷🇼", region: "Africa",      population: 14.1,  gdp_ppp: 57,    gdp_per_cap: 4040,   disposable: 1550,  inflation: 14.3, realGdpGrowth: 6.2, capital: "Kigali",      currency: "RWF" },
  { name: "Mali",         iso3: "MLI", flag: "🇲🇱", region: "Africa",      population: 22.4,  gdp_ppp: 58,    gdp_per_cap: 2590,   disposable: 1020,  inflation: 5.0,  realGdpGrowth: 4.5, capital: "Bamako",      currency: "XOF" },
  { name: "Mozambique",   iso3: "MOZ", flag: "🇲🇿", region: "Africa",      population: 33.1,  gdp_ppp: 52,    gdp_per_cap: 1570,   disposable: 680,   inflation: 7.1,  realGdpGrowth: 5.0, capital: "Maputo",      currency: "MZN" },
  { name: "Burkina Faso", iso3: "BFA", flag: "🇧🇫", region: "Africa",      population: 22.7,  gdp_ppp: 57,    gdp_per_cap: 2510,   disposable: 1000,  inflation: 0.7,  realGdpGrowth: 4.4, capital: "Ouagadougou", currency: "XOF" },
  { name: "Niger",        iso3: "NER", flag: "🇳🇪", region: "Africa",      population: 25.6,  gdp_ppp: 42,    gdp_per_cap: 1640,   disposable: 640,   inflation: 2.8,  realGdpGrowth: 6.1, capital: "Niamey",      currency: "XOF" },
  { name: "Madagascar",   iso3: "MDG", flag: "🇲🇬", region: "Africa",      population: 28.9,  gdp_ppp: 52,    gdp_per_cap: 1800,   disposable: 750,   inflation: 9.9,  realGdpGrowth: 4.0, capital: "Antananarivo",currency: "MGA" },
  { name: "Botswana",     iso3: "BWA", flag: "🇧🇼", region: "Africa",      population: 2.6,   gdp_ppp: 43,    gdp_per_cap: 16500,  disposable: 6100,  inflation: 5.2,  realGdpGrowth: 3.8, capital: "Gaborone",    currency: "BWP" },
  { name: "Namibia",      iso3: "NAM", flag: "🇳🇦", region: "Africa",      population: 2.7,   gdp_ppp: 30,    gdp_per_cap: 11100,  disposable: 4200,  inflation: 5.9,  realGdpGrowth: 2.8, capital: "Windhoek",    currency: "NAD" },
  { name: "Mauritius",    iso3: "MUS", flag: "🇲🇺", region: "Africa",      population: 1.3,   gdp_ppp: 32,    gdp_per_cap: 24600,  disposable: 10500, inflation: 7.0,  realGdpGrowth: 4.6, capital: "Port Louis",  currency: "MUR" },
  { name: "Gabon",        iso3: "GAB", flag: "🇬🇦", region: "Africa",      population: 2.4,   gdp_ppp: 35,    gdp_per_cap: 14600,  disposable: 5500,  inflation: 4.3,  realGdpGrowth: 2.8, capital: "Libreville",  currency: "XAF" },
];

export const countries = rawCountries.map((d, i) => ({ ...d, rank: i + 1 }));

export const maxVals = {
  population:  Math.max(...countries.map(d => d.population)),
  gdp_ppp:     Math.max(...countries.map(d => d.gdp_ppp)),
  gdp_per_cap: Math.max(...countries.map(d => d.gdp_per_cap)),
  disposable:  Math.max(...countries.map(d => d.disposable)),
};
