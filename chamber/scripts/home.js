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
    const iconImg = document.createElement("img");
    const temp = document.querySelector("#temp");
    const desc = document.querySelector("#temp-desc");
    const high = document.querySelector("#high");
    const low = document.querySelector("#low");
    const humidity = document.querySelector("#humidity");
    // const sunrise = document.querySelector("#sunrise");
    // const sunset = document.querySelector("#sunset");
    
    const weatherIcon = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;

    iconImg.setAttribute("src", weatherIcon);
    iconImg.setAttribute("alt", currentData.weather[0].description);
    iconImg.setAttribute("width",70);
    iconImg.setAttribute("height",70);
    icon.appendChild(iconImg);
    temp.innerHTML = `${currentData.main.temp.toFixed(0)}&deg;C</span>`;
    desc.innerHTML = currentData.weather[0].description;
    high.innerHTML = `${currentData.main.temp_max.toFixed(0)}&deg;C`;
    low.innerHTML = `${currentData.main.temp_min.toFixed(0)}&deg;C`;
    humidity.innerHTML = `${currentData.main.humidity}%`;
    // sunrise.innerHTML = currentData.sys.sunrise;
    // sunset.innerHTML = currentData.sys.sunset;
}

async function displayForecast() {
    const first = document.querySelector("#first");
    const second = document.querySelector("#second");
    const third = document.querySelector("#third");

    const forecast = await getForecastData();

    first.innerHTML = `${forecast[0].date}: <span class="temps">${forecast[0].high}&deg;C</span>`;
    second.innerHTML = `${forecast[1].date}: <span class="temps">${forecast[1].high}&deg;C</span>`;
    third.innerHTML = `${forecast[2].date}: <span class="temps">${forecast[2].high}&deg;C</span>`;
}

async function getForecastData() {
    const forecastData = await apiFetch(urlForecast);
    
    const firstDate = forecastData.list[0].dt_txt; // use the first forecast item as the first date to forecast 
    
    let first = new Date(firstDate);
    first = first.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});

    let second = new Date(firstDate);
    second.setDate(second.getDate() + 1);
    second = second.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});

    let third = new Date(firstDate);
    third.setDate(third.getDate() + 2);
    third = third.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});

    let firstData = [];
    let secondData = [];
    let nextData = [];

    forecastData.list.forEach(entry => {
        let date = new Date(entry.dt_txt);
        date = date.toLocaleDateString('en-US', {weekday: "long", month: "numeric", day: "numeric"});
        
        if (date === first) {
            firstData.push(entry.main.temp);
        } else if (date === second) {
            secondData.push(entry.main.temp);
        } else if (date === third) {
            nextData.push(entry.main.temp);
        }
    })

    let firstHigh = Math.max(...firstData).toFixed(0);
    let secondHigh = Math.max(...secondData).toFixed(0);
    let thirdHigh = Math.max(...nextData).toFixed(0);

    const returnData = [{
        "date": first.split(",")[0],
        "high": firstHigh
    }, 
    {
        "date": second.split(",")[0],
        "high": secondHigh
    },
    {
        "date": third.split(",")[0],
        "high": thirdHigh  
    }]

    return returnData;
}

// Get and display member directory cards
import { displayMembers } from "./members.js";
const cards = document.querySelector("#home-dir-cards");
displayMembers(cards, true);
