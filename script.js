const APIKey = '78cb59a95e36ae41378d5d8950b8e54c';
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const cityNameElement = document.getElementById('cityNameElement');
const tempratureElement = document.getElementById('tempratureElement');
const weatherDescriptionElement = document.getElementById('weatherDiscription');
const humidityElement = document.getElementById('humidityElement');
const windSpeedElement = document.getElementById('windSpeedElement');
const weatherIconElement = document.getElementById('weatherIcon');
const unitSelectionLabels = document.getElementsByClassName('unitSelectionLabel');
const unitRadioInputs = document.getElementsByName('unitSelectionRadio');
const minTempLabel = document.getElementById('minTemp');
const maxTempLabel = document.getElementById('maxTemp');

searchField.focus(); 

Array.from(unitSelectionLabels).forEach(element => {
    element.style.display = 'none'; 
});

maxTempLabel.style.display = 'none';
minTempLabel.style.display = 'none';

let currentCity;
let selectedUnit;

searchButton.addEventListener('click', event => {
    currentCity = searchField.value;
    fetchAPI();
})

async function fetchAPI() {
    try {
        let unit;
        for(let input of unitRadioInputs) {
            if(input.checked) {
                selectedUnit = input.value;
                console.log(selectedUnit);
        }
            }   
        unit = selectedUnit == 'Celsius' ? 'metric' : 'imperial';

        console.log(currentCity);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIKey}&units=${unit}`);
        if(response.status == 404 || !response.ok) {
            tempratureElement.textContent = 'Invalid city name!';
            weatherDescriptionElement.textContent = '';
            windSpeedElement.innerHTML = '';
            humidityElement.innerHTML = '';
            cityNameElement.innerHTML = ``;
            const unitSelectionLabels = document.getElementsByClassName('unitSelectionLabel');
            Array.from(unitSelectionLabels).forEach(element => {
                element.style.display = 'none'; 
            });
            minTempLabel.textContent = '';
            maxTempLabel.textContent = '';

            throw new Error("Response wasn't ok!");
        }
        Array.from(unitSelectionLabels).forEach(element => {
            element.style.display = 'block'; 
        });
        const data = await response.json();
        cityNameElement.innerHTML = `<img id="locationIcon" src="https://th.bing.com/th/id/R.1d41d1f32177a1bc5ead6ab2867e2e67?rik=o8s29wXrd9SHwA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-location-location-black-png-image-4231-1200.png&ehk=kIO1Jynemn%2bb1PmR%2fJgUS4uH4WnLJHrz5SbkNYKmGWA%3d&risl=&pid=ImgRaw&r=0">${data.name}`
        console.log(cityNameElement);
        const temprature = data.main.temp;
        tempratureElement.innerHTML = `${temprature.toFixed(1)}°${selectedUnit == 'Celsius' ? 'C' : 'F'}`
        weatherDescription = data.weather[0].description;
        weatherDescriptionElement.style.textTransform = 'capitalize';
        weatherDescriptionElement.textContent = weatherDescription;
        const humidity = data.main.humidity;
        humidityElement.innerHTML = `${humidity.toFixed(0)}%<br><span class="smallText">Humidity</span>`;
        const windSpeed = data.wind.speed;
        windSpeedElement.innerHTML = `${windSpeed.toFixed(1)} ${selectedUnit == 'Celsius' ? 'km/h' : 'mph'}<br><span class="smallText">Wind Speed</span>`;
        const weatherIcon = data.weather[0].icon;
        searchField.value = ``;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;
        minTempLabel.textContent = `Min Temp: ${minTemp.toFixed(1)}`;
        maxTempLabel.textContent = `Max Temp: ${maxTemp.toFixed(1)}`;
        maxTempLabel.style.display = 'block';
        minTempLabel.style.display = 'block';

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

Array.from(unitRadioInputs).forEach(element => {
    element.addEventListener('change', fetchAPI)
})

document.body.addEventListener("keyup", event => {
    if(event.key == 'Enter') {
        if(searchField.value !== '') {
            currentCity = searchField.value;
            searchField.focus();
            fetchAPI();
        }
    }
})

document.addEventListener("DOMContentLoaded", function() {
    const searchField = document.getElementById('searchField');

    searchField.addEventListener("click", function() {
        searchField.focus(); 
    });
});
