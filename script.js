const APIKey = '78cb59a95e36ae41378d5d8950b8e54c';

async function fetchAPI() {
    try {
        const cityName = 'riyadh';
        const unit = 'metric';
        const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=${unit}`);
        if(!reponse.ok) {
            throw new Error("Response wasn't ok!");
        }
        const data = await reponse.json();
        console.log(data);
    }
    catch(error) {
        console.error(error);
    }
}

fetchAPI();