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
    const form = document.querySelector('form');
    const city = document.querySelector('#citySearch');
    const cityDisplay = document.querySelector('#cityD');
    const countryDisplay = document.querySelector('#countryD');
    const tempDiv = document.querySelector('#temp');
    form.addEventListener('submit', async function(e){
        e.preventDefault();
        data =  await apiCalls.getWeatherData(city.value);
        displayLocation();
        displayTemp();
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
    return{};
})();