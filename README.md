# Africa & Middle East Economic Outlook Dashboard

A pristine, high-performance web dashboard displaying detailed economic indicators (Population, GDP, GDP Per Capita, Disposable Income, Inflation, and Real GDP Growth) across countries in the Africa and Middle East regions.

![Dashboard Preview](./public/preview.png) *(Placeholder if you add an image!)*

## 🌟 Features

- **Advanced Data Aggregation**: Real-time rollups of total active GDP and average GDP per capita based on applied filters.
- **Interactive Map View**: A React Simple Maps integration offering a clean choropleth view of data variables across the continent and region.
- **Side-by-Step Comparison**: Select up to 4 countries and compare them directly on a responsive Radar Chart.
- **Intelligent Search & Export**: Filter countries instantly by name or capital, and export the current view to a clean CSV file.
- **Premium Dark Mode Design**: Developed with meticulous vanilla CSS custom properties tailored to an elegant dark aesthetic (`globals.css`), featuring custom entry and hover animations.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with customized variable theming
- **Data Visualization**: Recharts, React Simple Maps, d3-geo
- **Icons**: Lucide React
- **Hosting**: Vercel

## 🚀 Getting Started

To run this application locally, you will need Node.js installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/0xdidi/Africa-ME-Economic-Outlook.git
   cd Africa-ME-Economic-Outlook
   ```

2. **Install Dependencies:**
   Since this project uses modern React 19 alongside older established visualization libraries, use the `--legacy-peer-deps` flag (or rely on the included `.npmrc`).
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 💡 Configuration

All country data serves as the "database" inside `src/data/countries.ts`. To expand this application further, you can connect an API to feed into the global state within `src/app/page.tsx` instead of using static definitions.

## 📄 License

This project is intended for educational purposes and internal reference.
