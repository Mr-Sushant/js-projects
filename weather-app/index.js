// https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=28f563437823f72576ee1245bdb04e18

const apiKey = "28f563437823f72576ee1245bdb04e18";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city){
    const response = await fetch(apiURL+city+`&appid=${apiKey}`);

    if(response.status === 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    document.querySelector(".error").style.display = "none";
    let data = await response.json();
    console.log(data);

    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp+"°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML = data.wind.speed+" Km/h";

    let weather = data.weather[0].main;
    switch(weather){
        case "Clouds": weatherIcon.src = "Images/clouds.png"; break;
        case "Clear": weatherIcon.src = "Images/clear.png"; break;
        case "Rain": weatherIcon.src = "Images/rain.png"; break;
        case "Drizzle": weatherIcon.src = "Images/drizzle.png"; break;
        case "Mist": weatherIcon.src = "Images/mist.png"; break;

    }

    document.querySelector(".weather").style.display = "block";

}

searchBtn.addEventListener("click",() => {
    getWeather(searchBox.value);
})
