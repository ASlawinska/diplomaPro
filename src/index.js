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
let day = today.getDate() <10 ? `0${today.getDate()}`: `${today.getDate()}`;
let dayTommorow = (today.getDate()+1) <10 ? `0${today.getDate()+1}`: `${today.getDate()+1}`;
let month = (today.getMonth()+1) <10 ? `0${(today.getMonth()+1)}`: `${(today.getMonth()+1)}`;
let year = today.getFullYear();


let dateFormat = `${year}-${month}-${day}`;
let dateFormat2 = `${year}-${month}-${dayTommorow}`;
let todayMin = thisDay.setAttribute('min', dateFormat);
let tommorowMin = tommorow.setAttribute('min', dateFormat2);
thisDay.setAttribute('value', dateFormat);
tommorow.setAttribute('value', dateFormat2);

//Weather APP
const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apilink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=1063abb9b196175704486b6c818e5cc7';
const units = '&units=metric';

let city;
let url;

const getWeather = () => {
    city = (!input.value) ? 'Warsaw': input.value; 
    url = apilink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather);
            
            cityName.textContent = res.data.name;
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            warning.textContent = '';
            input.value = '';

            // if (status.id >= 200 && status.id < 300) {
            //     photo.setAttribute('src', "../img/thunderstorm.png")
            // } else if (status.id >= 300 && status.id < 400) {
            //     photo.setAttribute('src', "../img/drizzle.png")
            // } else if (status.id >= 500 && status.id < 600) {
            //     photo.setAttribute('src', "../img/rain.png")
            // } else if  (status.id >= 600 && status.id < 700) {
            //     photo.setAttribute('src', "../img/ice.png")
            // } else if (status.id >= 700 && status.id < 799) {
            //     photo.setAttribute('src', "../img/fog.png")
            // } else if (status.id==800) {
            //     photo.setAttribute('src', "../img/sun.png")
            // } else if (status.id > 800 && status.id < 900) {
            //     photo.setAttribute('src', "../img/cloud.png")
            // } else {
            //     photo.setAttribute('src', "../img/unknown.png")
            // }
        })
        .catch(()=>{warning.textContent ='Wpisz poprawną nazwę miasta'})
    };

const enterCheck = () => {
    if (event.keyCode===13) {
        getWeather();
    }
}
getWeather();
input.addEventListener('keyup', enterCheck)
btn.addEventListener('click', getWeather);

// Year footer
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`