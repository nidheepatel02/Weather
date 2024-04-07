const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weatherB = document.querySelector('.weather-box');
const weatherD = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {

    //Replace (API Key) with your API Key and don't forgot to remove Brackets().
    const APIKey = '(API Key)';
    const city = document.querySelector('.search input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherB.classList.remove('active');
            weatherD.classList.remove('active');
            error.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherB.classList.add('active');
        weatherD.classList.add('active');
        error.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'Images/clear.jpg';
                break;

            case 'Rain':
                image.src = 'Images/rain.png';
                break;

            case 'Snow':
                image.src = 'Images/snow.png';
                break;

            case 'Clouds':
                image.src = 'Images/cloud.jpg';
                break;

            case 'Mist':
                image.src = 'Images/mist.png';
                break;

            default:
                image.src = 'Images/cloud.jpg';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const CloneInfoWeather = infoWeather.cloneNode(true);
        const CloneInfoHumidity = infoHumidity.cloneNode(true);
        const CloneInfoWind = infoWind.cloneNode(true);

        CloneInfoWeather.id = 'clone-info-weather';
        CloneInfoWeather.classList.add('active-clone');

        CloneInfoHumidity.id = 'clone-info-humidity';
        CloneInfoHumidity.classList.add('active-clone');

        CloneInfoWind.id = 'clone-info-wind';
        CloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", CloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", CloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", CloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
            cloneInfoWeatherFirst.classList.remove('active-clone');
            cloneInfoHumidityFirst.classList.remove('active-clone');
            cloneInfoWindFirst.classList.remove('active-clone');

            setTimeout(() => {
                cloneInfoWeatherFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();
            }, 2000);
        }

    });

});