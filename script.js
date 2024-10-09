const APIKey = '78cb59a95e36ae41378d5d8950b8e54c';
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const cityNameElement = document.getElementById('cityNameElement');
const tempratureElement = document.getElementById('tempratureElement');
const weatherDescriptionElement = document.getElementById('weatherDiscription');
const humidityElement = document.getElementById('humidityElement');
const windSpeedElement = document.getElementById('windSpeedElement');
const weatherIconElement = document.getElementById('weatherIcon');

async function fetchAPI() {
    try {
        const cityName = searchField.value;
        console.log(cityName);
        const unit = 'metric';
        const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=${unit}`);
        if(reponse.status == 404) {
            tempratureElement.textContent = 'Invalid city name!';
            weatherDescriptionElement.textContent = '';
            windSpeedElement.innerHTML = '';
            humidityElement.innerHTML = '';
            throw new Error("Response wasn't ok!");
        }
        const data = await reponse.json();
        cityNameElement.innerHTML = `<img id="locationIcon" src="https://th.bing.com/th/id/R.1d41d1f32177a1bc5ead6ab2867e2e67?rik=o8s29wXrd9SHwA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-location-location-black-png-image-4231-1200.png&ehk=kIO1Jynemn%2bb1PmR%2fJgUS4uH4WnLJHrz5SbkNYKmGWA%3d&risl=&pid=ImgRaw&r=0">${data.name}`
        console.log(cityNameElement);
        const temprature = data.main.temp;
        tempratureElement.textContent = temprature.toFixed(0);
        weatherDescription = data.weather[0].description;
        weatherDescriptionElement.style.textTransform = 'capitalize';
        weatherDescriptionElement.textContent = weatherDescription;
        const humidity = data.main.humidity;
        humidityElement.innerHTML = `${humidity.toFixed(0)}%<br><span class="smallText">Humidity</span>`;
        const windSpeed = data.wind.speed;
        windSpeedElement.innerHTML = `${windSpeed.toFixed(1)} Km/h<br><span class="smallText">Wind Speed</span>`;
        const weatherIcon = data.weather[0].icon;
        console.log(data);
        // weatherIconElement.innerHTML = `<img src="${weatherIcon}" alt="Weather Icon`;
        // weatherIconElement.classList.remove('invisible');


        // console.log(data);
        // console.log(weatherDescription);
    }
    catch(error) {
        console.error(error);
    }
}

function enterButton() {

}

searchButton.addEventListener("click", fetchAPI);
document.body.addEventListener("keyup", (event) => {
    if(event.key == 'Enter') {
        fetchAPI();
    }
})