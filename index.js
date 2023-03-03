const apiCalls = (function(){
async function getLonLat(){
    try{
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${displayController.city.value},${displayController.state.value},${displayController.country.value}&appid=41de0b2033f4a4897e9a51f99316c532`,{mode: "cors"});
        const locationData = await response.json();
        getWeatherData(locationData[0].lat, locationData[0].lon);
    } catch(error){
        console.log('LOCATION NO WORK SRY.');
    }
}

async function getWeatherData(lat, lon){
    try{
        console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=41de0b2033f4a4897e9a51f99316c532`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=41de0b2033f4a4897e9a51f99316c532`, {mode:"cors"});
        const weatherData = await response.json();
        console.log(weatherData);
    }catch(error){
        console.log("WEATHER NO WORK SRY.");
    }
}
return{getLonLat};
})();

const displayController = (function(){
    const form = document.querySelector('form');
    const city = document.querySelector('#citySearch');
    const state = document.querySelector('#stateSearch');
    const country = document.querySelector('#countrySearch');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        apiCalls.getLonLat();
        form.reset();
    });
    return{city, state, country};
})();