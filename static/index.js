const cityInput = document.getElementById("myInput");
const locationButton = document.getElementById("mybtn");
const backButton = document.getElementById("mybtn1");
const infotxt = document.getElementById("info");
const weatherinfo = document.getElementById("weatherinfo");
const apikey = '31c3f8c6bb6a86da97a6e05aaa3f2d6a';
let api;

backButton.addEventListener("click",()=>{
    location.reload();
});

// #button

locationButton.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Your browser doesn't support API");
    }
    });

function onSuccess(position){
    let {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    fetchData();
}

function onError(error){
    infotxt.innerText = error.message;
}

// #inputtext

cityInput.addEventListener("keyup", e=>{
    if(e.key =="Enter" && cityInput.value != ""){
        requestAPI(cityInput.value);
    }
})

function requestAPI(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    fetchData();
    }

function fetchData(){
    infotxt.innerText = "Getting Details...";
    fetch(api).then(response => response.json()).then(result => weatherDetails(result)); 
}

function weatherDetails(info){
    if(info.cod == "404"){
        infotxt.innerText = `${cityInput.value} isn't a valid city`;
    }
    else{
        infotxt.style.display = "none";
        cityInput.style.display = "none";
        locationButton.style.display = "none";
        weatherinfo.style.visibility = "visible";
        weatherinfo.style.width = "100%";
        weatherinfo.style.height = "auto";
        backButton.style.visibility = "visible";
        backButton.style.width = "100%";
        backButton.style.height = "auto";

        infotxt.innerText = "Details fetched";
        const city = info.name;
        const country = info.sys.country;
        const {description, icon} = info.weather[0];
        let {feels_like, temp} = info.main;
        feels_like = (feels_like - 273.15).toFixed(2);
        temp = (temp - 273.15).toFixed(2);
        document.getElementById("city").innerText = `${city} , ${country}`;
        document.getElementById("description").innerText = `${description} in the city`;
        document.getElementById("feelslike").innerText = `Feels like: ${feels_like}°C`;
        document.getElementById("temp").innerText = `Temperature: ${temp}°C`;
        document.getElementById("weatherimg").src = ` http://openweathermap.org/img/wn/${icon}@2x.png`;
   
}}