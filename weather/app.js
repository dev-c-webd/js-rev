const form = document.querySelector(".weatherForm");
const card = document.querySelector(".card");
const cityInput = document.querySelector(".cityInput");

const apikey = "7af61ae6d6f9d8d77c95d201cbf98eff";

form.addEventListener("submit", async event=> {
    
    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
            
        } catch (error) {
            displayError(error);
        }
        
    } else {
        displayError("plaease enter a city");
    }

})

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("could not get data");
    }

    return await response.json();
}

function displayWeatherData(data) {
     
    const { name: city,
            main: { temp, humidity },
        weather: [{ description, id }] } = data;
    
    card.textContent = "";
    card.style.display = "flex";    

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    // const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(2)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    // weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    // weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    // card.appendChild(weatherEmoji);


}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}