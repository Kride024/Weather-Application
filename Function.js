let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature=document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
// part 3 reference
let weather_feel = document.querySelector(".weather_feelsLike");
let weather_humidity = document.querySelector(".weather_humidity");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure=document.querySelector(".weather_pressure");
// when you make a request using the fetch() function, the response contains data in the form of a JSON string. The res.json() method is used to asynchronously parse JSON string into a Javascript object.
let citySearch = document.querySelector(".weather_search");
//here getting country code
const getCountryName=(code)=>{
    return  new Intl.DisplayNames([code], { type: "region" }).of(code);
}

//To get date and time
const getDateTime=(dt)=>{
    const curDate = new Date(dt * 1000);
    console.log(curDate);
    
    const options ={
        weekday: "long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        // second:"numeric" ,
    };
    
    const formatter = new Intl.DateTimeFormat("en-US",options);
    console.log(formatter);
    return formatter.format(curDate);
    
    
}
let city ="pune";
// search functionality
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=document.querySelector(".city_name");
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});


const getWeatherData = async ()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=848e99beedb48e3e249e75eb3efffe06`;
    try{
    const res = await fetch (weatherUrl);
    const data = await res.json();
    const {main,name,weather,wind,sys,dt}=data;
    cityName.innerHTML=`${name},${getCountryName(sys.country)}`;
    dateTime.innerHTML=getDateTime(dt);
    
    w_forecast.innerHTML=weather[0].main;
    w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    
    w_temperature.innerHTML=`${main.temp}&#176`;
    w_minTem.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`
    w_maxTem.innerHTML=`Max: ${main.temp_max.toFixed()}&#176`
    
    // 3rd part
    weather_feel.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
    weather_humidity.innerHTML=`${main.humidity}%`;
    weather_wind.innerHTML=`${wind.speed}m/s`;
    weather_pressure.innerHTML=`${main.pressure}hPa`;
} catch (error){
    console.log(error);
    cityName.innerHTML=error;
    }
    
}

document.body.addEventListener("load",getWeatherData());