const temp = (function(){
    function toFahrenheit(kelvin){
        let fahrenheitTemp = (1.8 * (kelvin-273.15) + 32);
        return fahrenheitTemp.toFixed(0);
    }

    function toCelsius(kelvin){
        let celsiusTemp = (kelvin - 273.15);
        return celsiusTemp.toFixed(0);
    }

    return {toFahrenheit, toCelsius};
})();

const apiCalls = (function(){
    async function getWeatherData(city){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41de0b2033f4a4897e9a51f99316c532`, {mode:"cors"});
            const weatherData = await response.json();
            console.log(weatherData);
            return weatherData;
        }catch(error){
            console.log("WEATHER NO WORK SRY.");
        }
    }

    return{getWeatherData};
})();

const displayController = (function(){
    let data;
    const container = document.querySelector('#container');
    const form = document.querySelector('form');
    const city = document.querySelector('#citySearch');
    const cityDisplay = document.querySelector('#cityD');
    const countryDisplay = document.querySelector('#countryD');
    const tempDiv = document.querySelector('#temp');
    const pic = document.querySelector('#pic');
    form.addEventListener('submit', async function(e){
        e.preventDefault();
        data =  await apiCalls.getWeatherData(city.value);
        container.style.display = 'block';
        runJokes();
        displayLocation();
        displayTemp();
        displayPic();
        displayBottomInfo();
        form.reset();
    });

    function displayLocation(){
        console.log(data.name);
        cityDisplay.innerHTML = `${data.name}`;
        if(data.sys.country == 'US')
        {
            data.sys.country = 'United States';
        }
        countryDisplay.innerHTML = `${data.sys.country}`;
    }

    function displayTemp(){
        tempDiv.innerHTML = `${temp.toFahrenheit(data.main.temp)}°`;
    }

    function displayPic(){
        if(data.weather[0].main == 'Rain'){
            pic.setAttribute('src', 'images/weather-rainy.svg');
            container.style.backgroundColor = '#9ca3af';
        }
        else if(data.weather[0].main == 'Clouds'){
            pic.setAttribute('src', 'images/weather-cloudy.svg');
            container.style.backgroundColor = '#9ca3af';
        }
        else if(data.weather[0].main == 'Clear'){
            pic.setAttribute('src', 'images/weather-sunny.svg');
            container.style.backgroundColor = '#7dd3fc';
        }
        else if(data.weather[0].main == 'Snow'){
            pic.setAttribute('src', 'images/weather-snowy.svg');
            container.style.backgroundColor = '#d8b4fe';
        }
        else if(data.weather[0].main == 'Thunderstorm'){
            pic.setAttribute('src', 'images/lightning-rainy.svg');
            container.style.backgroundColor = '#475569';
        }
    }

    function displayBottomInfo(){
        const fl = document.querySelector('#five');
        fl.innerHTML = temp.toFahrenheit(data.main.feels_like);
        const minT = document.querySelector('#one');
        minT.innerHTML = temp.toFahrenheit(data.main.temp_min);
        const maxT = document.querySelector('#two');
        maxT.innerHTML = temp.toFahrenheit(data.main.temp_max);
        const windSp = document.querySelector('#three');
        windSp.innerHTML = data.wind.speed;
        const humid = document.querySelector('#four');
        humid.innerHTML = data.main.humidity;
    }

    function runJokes(){
        const sound = document.querySelector('#gaddi');
        if(data.name == "Brampton")
        {
        sound.play();
        }
    }

    return{};
})();