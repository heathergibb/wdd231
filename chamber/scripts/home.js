const lat = 49.417;
const lon = -112.868;
const appId = "c7701c5138b8af4e708d6a9a5167b11c";
const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric&cnt=24`;

displayCurrentWeather(); 
displayForecast();

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayCurrentWeather() {
    const currentData = await apiFetch(urlCurrent);

    const icon = document.querySelector("#weather-icon");
    const temp = document.querySelector("#temp");
    const desc = document.querySelector("#temp-desc");
    const high = document.querySelector("#high");
    const low = document.querySelector("#low");
    const humidity = document.querySelector("#humidity");
    // const sunrise = document.querySelector("#sunrise");
    // const sunset = document.querySelector("#sunset");
    
    const weatherIcon = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;

    icon.setAttribute("src", weatherIcon);
    icon.setAttribute("alt", currentData.weather[0].description);
    temp.innerHTML = `${currentData.main.temp.toFixed(0)}&deg;C</span>`;
    desc.innerHTML = currentData.weather[0].description;
    high.innerHTML = `${currentData.main.temp_max.toFixed(0)}&deg;C`;
    low.innerHTML = `${currentData.main.temp_min.toFixed(0)}&deg;C`;
    humidity.innerHTML = `${currentData.main.humidity}%`;
    // sunrise.innerHTML = currentData.sys.sunrise;
    // sunset.innerHTML = currentData.sys.sunset;
}

async function displayForecast() {
    const today = document.querySelector("#today");
    const tomorrow = document.querySelector("#tomorrow");
    const nextDay = document.querySelector("#next-day");

    const forecast = await getForecastData();

    today.innerHTML = `${forecast[0].date}: <span class="temps">${forecast[0].high}&deg;C</span>`;
    tomorrow.innerHTML = `${forecast[1].date}: <span class="temps">${forecast[1].high}&deg;C</span>`;
    nextDay.innerHTML = `${forecast[2].date}: <span class="temps">${forecast[2].high}&deg;C</span>`;
}

async function getForecastData() {
    const forecastData = await apiFetch(urlForecast);

    let today = new Date();
    today = today.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});
    
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});

    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 2);
    nextDay = nextDay.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});

    let todayData = [];
    let tomorrowData = [];
    let nextData = [];

    forecastData.list.forEach(entry => {
        let date = new Date(entry.dt_txt);
        date = date.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});
        
        if (date === today) {
            todayData.push(entry.main.temp);
        } else if (date === tomorrow) {
            tomorrowData.push(entry.main.temp);
        } else if (date === nextDay) {
            nextData.push(entry.main.temp);
        }
    })

    let todayHigh = Math.max(...todayData).toFixed(0);
    let tomorrowHigh = Math.max(...tomorrowData).toFixed(0);
    let nextDayHigh = Math.max(...nextData).toFixed(0);

    const returnData = [{
        "date": "Today",
        "high": todayHigh
    }, 
    {
        "date": tomorrow.split(",")[0],
        "high": tomorrowHigh
    },
    {
        "date": nextDay.split(",")[0],
        "high": nextDayHigh  
    }]

    return returnData;
}

// Get and display member directory cards
import { displayMembers } from "./members.js";
const cards = document.querySelector("#home-dir-cards");
displayMembers(cards, true);
