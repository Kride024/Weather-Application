let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature=document.querySelector(".weather_temperature");
let w_minTem = document.querySelector("weather_min");
let w_maxTem = document.querySelector("weather_max");
// when you make a request using the fetch() function, the response contains data in the form of a JSON string. The res.json() method is used to asynchronously parse JSON string into a Javascript object.

//here getting country code
const getCountryName=(code)=>{
    return  new Intl.DisplayNames([code], { type: "region" }).of(code);
}
const getWeatherData = async ()=>{
    const weatherUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=pune&APPID=848e99beedb48e3e249e75eb3efffe06`;
    try{
    const res = await fetch (weatherUrl);
    const data = await res.json();
    const {main,name,weather,wind,sys,dt}=data;
    cityName.innerHTML=`${name},${getCountryName(sys.country)}`;
    
} catch (error){
    console.log(error);
    }
    
}

document.body.addEventListener("load",getWeatherData());