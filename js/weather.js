
function onGeoOk(position){
    const lat= position.coords.latitude;
    const lon= position.coords.longitude;
    const unit="metric";
   // console.log("You live in",lat,lon);
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
    //console.log(url);
    fetch(url).then(response => response.json()).then(data=>{
        const weatehrConatainer=document.getElementById("weather");
        const name=data.name;
        const weather=data.weather[0].main;
        const temperature=data.main.temp;
        const weatherSpan=document.querySelectorAll('#weather span');
     //   console.log(weatherSpan);
        weatherSpan[0].innerText=name;
        weatherSpan[1].innerText=weather;
        weatherSpan[2].innerText=temperature;

    });
}
function onGeoError(){
    alert("Can't find you. NO WEATHER OR YOU.");
}
const API_KEY="4d41f4d107124b0108038792774724cf";

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);