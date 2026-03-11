# 🌤️ Weather Forecast (WFC)

A premium, cinematic, and mobile-first weather forecasting web application. Designed with high-end aesthetics, smooth animations, and actionable safety protocols.

![Weather Forecast Banner](https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1200)

## 🚀 Live Demo
**Check out the live project here:** [https://gpavananithish.github.io/WFC](https://gpavananithish.github.io/WFC)

---

## ✨ Key Features

- **📱 Cinematic Mobile Experience**: A full-width background slider that cycles through stunning weather photography with smooth "Ken Burns" fade-and-scale animations.
- **📍 Real-Time Accuracy**: Integration with the **OpenWeatherMap API** for precise current conditions and 5-day forecasts.
- **🏙️ Hyper-Local Default**: Automatically fetches and displays weather for **Hyderabad** on initial load.
- **🛡️ Safety & Precautions**: Comprehensive safety protocols for Solar, Monsoon, Blizzard, and Storm conditions.
- **🔄 Animated Icon Brand**: A dynamic header logo that cycles through high-quality animated weather SVGs.
- **🌓 Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile with a specialized "brand-first" 2-line header for phones.

---

## 🛠️ Tech Stack

- **Frontend**: 
    - ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) **HTML5** (Semantic structure)
    - ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) **CSS3** (Vanilla, Grid, Flexbox, Keyframe Animations)
    - ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript** (ES6+, Fetch API, Dynamic DOM)
- **APIs**:
    - **OpenWeatherMap API** (Meteorological data)
    - **OpenWeatherMap Geocoding API** (Location services)

---

## 🎨 Design & Resources

- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)
- **Icons**:
    - [Font Awesome 6](https://fontawesome.com/) (Solid & Brands)
    - [Bas Milius Weather Icons](https://github.com/basmilius/weather-icons) (Animated SVGs)
- **Imagery**:
    - [Unsplash](https://unsplash.com/) & [Pexels](https://www.pexels.com/) (Cinematic Weather Photography)

---

## 📂 Project Structure

```text
WFC/
├── index.html          # Root Redirect / Landing Page
├── .gitignore          # Git exclusion file
├── css/
│   └── style.css       # Master stylesheet with mobile media queries
├── js/
│   └── script.js       # Core logic, API handling, and Logo animations
├── html/
│   ├── weather.html    # Main forecast dashboard
│   ├── about.html      # Project and team information
│   └── measures.html   # Safety protocols & precautions
└── static/             # Local assets and images
```

---

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gpavananithish/WFC.git
   ```
2. **Open the project**:
   Open the root `index.html` in your favorite browser.
3. **API Configuration**:
   The project uses a built-in API key. For personal use, you can replace it in `js/script.js`:
   ```javascript
   const API_KEY = "YOUR_API_KEY_HERE";
   ```

---

## 📄 License
This project is for educational purposes. All rights reserved &copy; 2023 Weather Forecast.
