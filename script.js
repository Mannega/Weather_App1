const weatherAPIKey = '78cb59a95e36ae41378d5d8950b8e54c';
const pixabayAPIkey = '46557556-5d5dd211c1f0dad1fa606b0d6';
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const cityNameElement = document.getElementById('cityNameElement');
const temperatureElement = document.getElementById('tempratureElement');
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

searchButton.addEventListener('click', () => {
    if (searchField.value === '') {
        alert("Search field can't be empty");
    } else {
        currentCity = searchField.value;
        fetchAPI();
    }
});

async function fetchAPI() {
    try {
        for (let input of unitRadioInputs) {
            if (input.checked) {
                selectedUnit = input.value;
            }
        }
        const unit = selectedUnit === 'Celsius' ? 'metric' : 'imperial';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${weatherAPIKey}&units=${unit}`);
        
        if (!response.ok) {
            throw new Error("Invalid city name!");
        }

        Array.from(unitSelectionLabels).forEach(element => {
            element.style.display = 'block';
        });

        const data = await response.json();
        console.log(data);
        await fetchImage(data.name);
        setTimeout(() => {
            return;
        }, 1000);

        cityNameElement.innerHTML = `<img id="locationIcon" src="https://th.bing.com/th/id/R.1d41d1f32177a1bc5ead6ab2867e2e67?rik=o8s29wXrd9SHwA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-location-location-black-png-image-4231-1200.png&ehk=kIO1Jynemn%2bb1PmR%2fJgUS4uH4WnLJHrz5SbkNYKmGWA%3d&risl=&pid=ImgRaw&r=0">${data.name}`;
        temperatureElement.innerHTML = `${data.main.temp.toFixed(1)}°${selectedUnit === 'Celsius' ? 'C' : 'F'}`;
        
        weatherDescriptionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        humidityElement.innerHTML = `${data.main.humidity.toFixed(0)}%<br><span class="smallText">Humidity</span>`;
        windSpeedElement.innerHTML = `${data.wind.speed.toFixed(1)} ${selectedUnit === 'Celsius' ? 'km/h' : 'mph'}<br><span class="smallText">Wind Speed</span>`;
        
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;
        minTempLabel.textContent = `Min Temp: ${minTemp.toFixed(1)}`;
        maxTempLabel.textContent = `Max Temp: ${maxTemp.toFixed(1)}`;
        maxTempLabel.style.display = 'block';
        minTempLabel.style.display = 'block';
        
    } catch (error) {
        console.error(error);
        alert(error.message); // Alert the error to the user
    }
}

Array.from(unitRadioInputs).forEach(element => {
    element.addEventListener('change', fetchAPI);
});

document.body.addEventListener("keyup", event => {
    if (event.key === 'Enter') {
        if (searchField.value !== '') {
            currentCity = searchField.value;
            searchField.value = '';
            fetchAPI();
        }
    }
});

async function fetchImage(name) {
    const response = await fetch(`https://pixabay.com/api/?key=${pixabayAPIkey}&q=${encodeURIComponent(name + ' city')}&image_type=photo`);
    
    if (response.ok) {
        const data = await response.json();
        if (data.hits.length > 0) {
            const imageURL = data.hits[0].largeImageURL; // Use the second image from the results
            document.body.style.backgroundImage = `url(${imageURL})`;
        } else {
            console.error('No images found for the search query.');
            document.body.style.backgroundColor = 'rgb(28, 39, 68)'; // Fallback color
        }
    } else {
        console.error('Error fetching the image:', response.statusText);
        document.body.style.backgroundColor = 'rgb(28, 39, 68)'; // Fallback color
    }
}

// Automatically focus on the search field when the page loads
document.addEventListener("DOMContentLoaded", function() {
    searchField.addEventListener("click", function() {
        searchField.focus(); 
    });
});
