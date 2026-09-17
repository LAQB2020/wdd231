const apiKey = "a3afb7f2c9498ca774786945b8d1cf7b";
const latitude = 20.5888;
const longitude = -100.3899;

async function getWeather() {
    try {
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`;

        const response = await fetch(currentURL);

        if (!response.ok) {
            throw new Error("Could not fetch weather data.");
        }

        const data = await response.json();

        displayCurrentWeather(data);
        getForecast();

    } catch (error) {
        console.error("Error loading weather:", error);
    }
}


function displayCurrentWeather(data) {

    const temperature = document.querySelector("#temperature");
    const description = document.querySelector("#description");
    const weatherIcon = document.querySelector("#weather-icon");

    // Current temperature
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    // Weather description
    description.textContent = data.weather[0].description;

    // Weather icon
    const iconSource =
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    weatherIcon.setAttribute("src", iconSource);

    weatherIcon.setAttribute(
        "alt",
        data.weather[0].description
    );
}


async function getForecast() {
    try {
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`;

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Could not fetch forecast data.");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error("Error loading forecast:", error);
    }
}


function displayForecast(data) {

    const forecastContainer = document.querySelector("#forecast");

    if (!forecastContainer) {
        return;
    }

    forecastContainer.innerHTML = "";

    // Take one forecast for approximately the same time each day
    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecasts.slice(0, 3).forEach(day => {

        const date = new Date(day.dt * 1000);

        const card = document.createElement("article");

        card.innerHTML = `
            <h3>
                ${date.toLocaleDateString("en-US", {
                    weekday: "long"
                })}
            </h3>

            <p>${Math.round(day.main.temp)}°C</p>
        `;

        forecastContainer.appendChild(card);
    });
}


getWeather();