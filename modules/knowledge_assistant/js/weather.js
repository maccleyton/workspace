// js/weather.js
import { getWeather } from './api.js';

export class Weather {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="weather-widget">
                <h3>🌤️ Previsão do Tempo</h3>
                <div class="weather-form">
                    <input type="text" id="cityInput" class="weather-input" placeholder="Digite o nome da cidade...">
                    <button id="getWeatherBtn" class="weather-btn">Buscar</button>
                </div>
                <div id="weatherResult" class="weather-result"></div>
            </div>
        `;
    }

    attachEventListeners() {
        const cityInput = this.container.querySelector('#cityInput');
        const getWeatherBtn = this.container.querySelector('#getWeatherBtn');

        getWeatherBtn.addEventListener('click', () => this.fetchWeather());
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.fetchWeather();
        });
    }

    async fetchWeather() {
        const cityInput = this.container.querySelector('#cityInput');
        const resultDiv = this.container.querySelector('#weatherResult');
        const city = cityInput.value.trim();

        if (!city) {
            resultDiv.innerHTML = `<p class="weather-error">Por favor, digite uma cidade.</p>`;
            return;
        }

        resultDiv.innerHTML = `<p class="weather-loading">Buscando clima...</p>`;
        
        try {
            const weatherData = await getWeather(city);
            resultDiv.innerHTML = `
                <div class="weather-info">
                    <h4>${weatherData.city}</h4>
                    <p class="weather-temp">${weatherData.temp}°C</p>
                    <p class="weather-desc">${weatherData.description}</p>
                    <div class="weather-details">
                        <span>💧 ${weatherData.humidity}%</span>
                        <span>💨 ${weatherData.wind} km/h</span>
                    </div>
                </div>
            `;
        } catch (error) {
            resultDiv.innerHTML = `<p class="weather-error">${error.message}</p>`;
        }
    }
}