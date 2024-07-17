displayWeather("#banff-weather", 51.1784, -115.5708);
displayWeather("#jasper-weather", 52.8735, -118.0857);
displayWeather("#kananaskis-weather", 50.9179, -115.1463);

async function displayWeather(locationId, lat, lon) {
    const location = document.querySelector(locationId);

    const data = await getWeatherString(lat, lon);   

    if (data) {
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const weatherIcon = document.createElement("img");
        const weatherTemp = `${data.main.temp.toFixed(0)}&deg;C`;
        const weatherDesc = data.weather[0].description; 
        const weatherFeelsLike = `${data.main.feels_like.toFixed(0)}&deg`;
        
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", data.weather[0].description);

        location.innerHTML = `
            <div class="weather-grid">
                <img class="weather-img" src="${iconsrc}" alt="${weatherDesc}">
                <p class="weather-temp">${weatherTemp}</p>
                <div class="weather-details">
                <p class="weather-desc">${weatherDesc}</p>
                <p class="weather-feel">Feels Like: ${weatherFeelsLike}</p>
                </div>
            </div>
            `;
    }
    
    

    // const jasper = document.querySelector("#jasper-weather");
    // const kananaskis = document.querySelector("#kananaskis-weather");
}
async function getWeatherString(lat, lon) {
    try {
        const appId = "c7701c5138b8af4e708d6a9a5167b11c";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
    
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            throw Error(await response.text());
        }
    
    } catch (error) {
        console.error(error);
    }
}

