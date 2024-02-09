const weatherType = ["sunny","snow","rain","cloudy"];
const weatherImage=["https://tourscanner.com/blog/wp-content/uploads/2021/07/fun-things-to-do-in-Philadelphia.jpg","https://cms.accuweather.com/wp-content/uploads/2023/10/AP186061491503.jpg?w=632","https://www.inquirer.com/resizer/a67H2Hr1ELGlw3fwmeLEMYB3Q2g=/760x507/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/pmn/ZEJWMFYT6ZAUPP2BGB34Q53BDQ.jpg","https://media.phillyvoice.com/media/images/Fog_Philly_Skyline.e1917393.fill-1200x630-c0.png"]

async function fetchWeather(){
    let input= document.getElementById("search").value;
    const weatherData= document.getElementById("weather-data");
    weatherData.style.display= "flex";
    const apiKey="YOUR API KEY HERE!"

    if(input==""){
        weatherData.innerHTML=`
        <div>
        <h2>Invalid Input</h2>
        <p>Please try again using a valid <b><u>city name<u><b>!<p>
        </div>`;
        return;
    }

    async function getLonAndLat(){
        const countryCode=1;
        geocodeURL= `http://api.openweathermap.org/geo/1.0/direct?q=${input.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`
        const response= await fetch(geocodeURL);
        if(!response.ok){
            console.log("Bad Response! ", response.status);
            return;
        }
        const data= await response.json();
        if(data.length == 0) {
            console.log("Something went wrong here.");
            weatherDataSection.innerHTML = `
            <div>
            <h2>Invalid Input: "${searchInput}"</h2>
            <p>Please try again with a valid <b><u>city name<b></u>!</p>
            </div>`;
            return;
          } 
          else {
            return data[0];
          }     
    }

    async function getWeatherData(lon, lat){
        const weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        const response= await fetch(weatherURL);
        if(!response.ok){
            console.log("Bad Response! ", response.status);
            return;
        }

        const weather= await response.json();
        weatherData.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png">
        <h2>${weather.name}</h2>
        <p><strong>Temperature:</strong> ${Math.round((weather.main.temp -273)*(9/5)+32)}°F</p>
        <p><strong>Description:</strong> ${weather.weather[0].description}</p>
        </div>
        `

        if(weather.weather[0].description=="snow"){
            html.css("background-image","https://cms.accuweather.com/wp-content/uploads/2023/10/AP186061491503.jpg?w=632")
        }
    }

    
    document.getElementById("search").value="";
    const coordinates= await getLonAndLat();
    getWeatherData(coordinates.lon, coordinates.lat);
}
