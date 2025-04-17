# 📍 Real Estate Scraper & Map Viewer using Next.js, Puppeteer, and Leaflet

A dynamic real estate data scraper and visualizer built with **Next.js**, **Puppeteer**, and **React Leaflet**. It fetches real estate project information from [MagicBricks](https://www.magicbricks.com) based on city names, scrapes the project data using Puppeteer, geocodes locations using the PositionStack API, and displays them interactively on a map.

---

## 🚀 Features

- ✅ City-wise real estate data scraping from MagicBricks using **Puppeteer with stealth mode** (headless browser automation).
- 🗺️ Visual representation of project locations on an interactive map using **React Leaflet**.
- ⚡ Geolocation powered by **PositionStack API**.
- 🧠 Built-in anti-bot detection evasion (headless stealth mode).
- 📦 Fully integrated with a modern **Next.js 15** frontend.
- 🎯 Responsive UI styled with TailwindCSS and custom animations.

---

## 🖼️ Preview

> Fetch real estate data for any city by entering the city name in the URL:  
> `http://localhost:3000/lucknow`  
> And see scraped project details + map location:

---

## 🧱 Tech Stack

| Tech                               | Purpose                       |
|------------------------------------|-------------------------------|
| **Next.js 15**                     | Full-stack React Framework    |
| **React**                          | Frontend UI                   |
| **Puppeteer**                      | Web scraping                  |
| **puppeteer-extra-plugin-stealth** | Anti-bot detection bypass |
| **React Leaflet**                  | Interactive maps              |
| **Tailwind CSS**                   | UI styling                    |
| **Axios**                          | API calls                     |
| **PositionStack API**              | Location geocoding            |

---

## ⚙️ Installation

```bash
git clone https://github.com/pixelavii/realestate-map-scraper.git
cd realestate-map-scraper
npm install


🧪 Development

Run the dev server with:
npm run dev

Then go to:
http://localhost:3000/lucknow (replace lucknow with any city)


📁 Project Structure

/pages
  └── [cityName].js         # Renders project list and map for a city
  └── api/
       └── projects.js      # Puppeteer scraping logic
/components
  └── MapComponent.js       # Interactive map (React Leaflet)


🧩 Puppeteer Setup

We use stealth mode and the latest headless: 'new' mode to avoid bot detection:
const browser = await puppeteer.launch({
  headless: 'new',
  ignoreDefaultArgs: ['--enable-automation'],
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-blink-features=AutomationControlled'
  ]
});


🛡️ Anti-Bot Handling

To ensure the scraper works even in headless mode:
    Stealth plugin (puppeteer-extra-plugin-stealth)
    Custom User-Agent
    Disabled automation flags
    navigator.webdriver patched


💡 Author

Made by Avinash