const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "4cabf6db1b5e9b42875f08ac1693ba6a"; // API key for OpenWeatherMap API

const weatherIconMap = {
    "Clear": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    "Clouds": "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    "Rain": "https://cdn-icons-png.flaticon.com/512/4088/4088981.png",
    "Drizzle": "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    "Thunderstorm": "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
    "Snow": "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    "Mist": "https://cdn-icons-png.flaticon.com/512/175/175956.png",
    "Smoke": "https://cdn-icons-png.flaticon.com/512/3556/3556828.png",
    "Haze": "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    "Dust": "https://cdn-icons-png.flaticon.com/512/612/612260.png",
    "Fog": "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}- ${month} -${year}`;
}

const createWeatherCard = (cityName, weatherItem, index) => {
    const mainWeather = weatherItem.weather[0].main;
    const iconUrl = weatherIconMap[mainWeather] || `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`;
    const temp = (weatherItem.main.temp - 273.15).toFixed(2);
    const feelsLike = (weatherItem.main.feels_like - 273.15).toFixed(2);
    const humidity = weatherItem.main.humidity;
    const wind = weatherItem.wind.speed;
    const pressure = weatherItem.main.pressure;
    const visibility = (weatherItem.visibility / 1000).toFixed(1);
    const rainProb = (weatherItem.pop * 100).toFixed(0);
    const formattedDate = formatDate(weatherItem.dt_txt.split(" ")[0]);

    if(index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2><i class="fa-solid fa-location-dot"></i> ${cityName} (${formattedDate})</h2>
                    <h6><i class="fa-solid fa-temperature-half"></i> Temperature: ${temp}°C</h6>
                    <h6><i class="fa-solid fa-person-rays"></i> Feels like: ${feelsLike}°C</h6>
                    <h6><i class="fa-solid fa-wind"></i> Wind: ${wind} M/S</h6>
                    <h6><i class="fa-solid fa-droplet"></i> Humidity: ${humidity}%</h6>
                    <h6><i class="fa-solid fa-gauge-high"></i> Pressure: ${pressure} hPa</h6>
                    <h6><i class="fa-solid fa-eye"></i> Visibility: ${visibility} KM</h6>
                    <h6><i class="fa-solid fa-cloud-rain"></i> Rain Probability: ${rainProb}%</h6>
                </div>
                <div class="icon">
                    <img src="${iconUrl}" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3><i class="fa-solid fa-calendar-day"></i> ${formattedDate}</h3>
                    <img src="${iconUrl}" alt="weather-icon">
                    <h6><i class="fa-solid fa-temperature-half"></i> Temp: ${temp}°C</h6>
                    <h6><i class="fa-solid fa-person-rays"></i> Feels: ${feelsLike}°C</h6>
                    <h6><i class="fa-solid fa-cloud-rain"></i> Rain: ${rainProb}%</h6>
                    <h6><i class="fa-solid fa-wind"></i> Wind: ${wind} M/S</h6>
                    <h6><i class="fa-solid fa-droplet"></i> Humidity: ${humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";
        document.querySelector(".days-forecast").style.display = "block";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

if (locationButton) locationButton.addEventListener("click", getUserCoordinates);
if (searchButton) searchButton.addEventListener("click", getCityCoordinates);
if (cityInput) cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

// Initial weather for Hyderabad on page load
window.addEventListener("load", () => {
    if (cityInput) {
        cityInput.value = "Hyderabad";
        getCityCoordinates();
    }
});

// Animated Logo Logic
const logoImg = document.getElementById("logo-img");
if (logoImg) {
    const animatedIcons = [
    "https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg",
    "https://basmilius.github.io/weather-icons/production/fill/all/cloudy.svg",
    "https://basmilius.github.io/weather-icons/production/fill/all/rain.svg",
    "https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day.svg",
    "https://basmilius.github.io/weather-icons/production/fill/all/snow.svg"
];

let currentIconIndex = 0;

// Fallback if SVGs fail
logoImg.onerror = () => {
    console.error("Failed to load animated logo, using fallback.");
    logoImg.src = "https://cdn-icons-png.flaticon.com/512/831/831268.png";
};

setInterval(() => {
    logoImg.style.opacity = 0;
    setTimeout(() => {
        currentIconIndex = (currentIconIndex + 1) % animatedIcons.length;
        logoImg.src = animatedIcons[currentIconIndex];
        logoImg.style.opacity = 1;
    }, 500);
}, 3000);
}