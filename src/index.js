import style from "./scss/index.scss";

//Burger menu
const burgerBtn = document.querySelector('.burger');
const open = document.querySelector('.fa-bars');
const close = document.querySelector('.fa-times');
const nav = document.querySelector('.nav')

const addActive = () => {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        open.classList.add('hide');
        close.classList.remove('hide');
    } else {
        open.classList.remove('hide');
        close.classList.add('hide');
    }
}
burgerBtn.addEventListener('click', addActive)

// Date form 
const thisDay = document.getElementById('today');
const tommorow = document.getElementById('tommorow');
let today = new Date();
let tommorowDay = new Date(today);
tommorowDay.setDate(tommorowDay.getDate()+1);

let day = today.getDate() <10 ? `0${today.getDate()}`: `${today.getDate()}`;
let month = (today.getMonth()+1) <10 ? `0${(today.getMonth()+1)}`: `${(today.getMonth()+1)}`;
let year = today.getFullYear();
let dayTommorow = (tommorowDay.getDate()) <10 ? `0${tommorowDay.getDate()}`: `${tommorowDay.getDate()}`;
let monthTommmorow = (tommorowDay.getMonth()+1) <10 ? `0${tommorowDay.getMonth()+1}`: `${(tommorowDay.getMonth()+1)}`;
let yearTommorow = tommorowDay.getFullYear();

let dateFormat = `${year}-${month}-${day}`;
let dateFormat2 = `${yearTommorow}-${monthTommmorow}-${dayTommorow}`;
let todayMin = thisDay.setAttribute('min', dateFormat);
let tommorowMin = tommorow.setAttribute('min', dateFormat2);
thisDay.setAttribute('value', dateFormat);
tommorow.setAttribute('value', dateFormat2);

//Seletet list form
fetch("https://api.jsonbin.io/b/606f4872ceba857326712ed1")
    .then((resp) => resp.json()) 
    .then((data) => {
        data.forEach(function (element) {
            document.getElementById("listOfCities").innerHTML += `<option value="${element.city}"> ${element.city} </option>`;//lista dla odlotu
            document.getElementById("listOfCities2").innerHTML += `<option value="${element.city}"> ${element.city} </option>`;// lista dla przylotu z wyłączeniem miasta odlotu 
        })
    })
    .catch((err) => console.log(err))

// Weather APP
const input = document.querySelector('#cityNameInput');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const pressure = document.querySelector('.pressure');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apilink = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '&appid=1063abb9b196175704486b6c818e5cc7';
const units = '&units=metric';
const lang = '&lang=pl'

let city;
let url;

if('geolocation' in navigator){  
    navigator.geolocation.getCurrentPosition(setPosition);  
}else{  
    console.log(error);
}  

function setPosition(position){  
    let lat = position.coords.latitude;  
    let lon = position.coords.longitude;  
    getWeather(lat, lon); 

}  

const getWeather = (lat, lon) => {
    
    city = (!input.value) ? `lat=${lat}&lon=${lon}`: `q=${input.value}`; 
    url = apilink + city + apiKey + lang + units;

    fetch(url)
        .then((res)=> res.json())
        .then(data => {
            const temp = data.main.temp;
            const hum = data.main.humidity;
            const pres = data.main.pressure;
            const status = Object.assign({}, ...data.weather);
            
            cityName.textContent = data.name;
            pressure.textContent = pres + 'hPa';
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            warning.textContent = '';
            input.value = '';

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', "https://freesvg.org/img/weather-storm.png")
            } else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', "https://freesvg.org/img/weather-showers-scattered.png")
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', "https://freesvg.org/img/weather-showers.png")
            } else if  (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', "https://freesvg.org/img/Schnee.png")
            } else if (status.id >= 700 && status.id < 799) {
                photo.setAttribute('src', "https://freesvg.org/img/fog.png")
            } else if (status.id==800) {
                photo.setAttribute('src', "https://freesvg.org/img/1364063978.png")
            } else if (status.id > 800 && status.id < 900) {
                photo.setAttribute('src', "https://freesvg.org/img/Cloud_1_by_Merlin2525.png")
            } else {
                document.getElementsByClassName("photo").src = "./assets/unknown.png";
                photo.setAttribute('src', "https://pl.freepik.com/darmowe-ikony/znak-zapytania_744108.htm")
            }
        })
        .catch(()=>{warning.textContent ='Nie mogę pobrać lokalizacji.'})
    };

const enterCheck = () => {
    if (event.keyCode===13) {
        getWeather();
    }
}
input.addEventListener('keyup', enterCheck)
btn.addEventListener('click', getWeather);

// Year footer
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`