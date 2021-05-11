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
//Visible slide
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const nextSlide = document.querySelector(".nextSlide");
const summaryButton =document.querySelector(".summaryButton")
const logo = document.querySelector(".logo");
//Opening slide1, hidding slide2&3
const visibleSlide1 = () => {
    slide1.style.display = 'flex';
    slide2.style.display = 'none';
    slide3.style.display = 'none';
};
//Opening slide2, hidding slide1&3
const visibleSlide2 = () => {
    slide1.style.display = 'none';
    slide2.style.display = 'flex';
    slide3.style.display = 'none';
};
//Opening slide3, hidding slide1&2
const visibleSlide3 = () => {
    slide1.style.display = 'none';
    slide2.style.display = 'none';
    slide3.style.display = 'flex';
};
//listening
logo.addEventListener("click", visibleSlide1);
nextSlide.addEventListener("click", visibleSlide2);
summaryButton.addEventListener("click", visibleSlide3);

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
fetch("https://api.jsonbin.io/b/606f4872ceba857326712ed1/2")
    .then((resp) => resp.json()) 
    .then((data) => {
        data.forEach(function (element) {
            document.getElementById("listOfCities").innerHTML += `<option value="${element.city}" data-country="${element.country}" data-continent="${element.continent}"> ${element.city} </option>`;
        })//skąd
        // pobranie wartości wybranej
        let inputDeparture = document.getElementById('cityNameInput');

        data.forEach(function (element) {
            document.getElementById("listOfCitiesArrival").innerHTML += `<option value="${element.city}" data-country="${element.country}" data-continent="${element.continent}"> ${element.city} </option>`;//do
        });
        let inputArrival = document.getElementById('cityNameInputArrival');
        
        // Funkcja ukazująca atrybuty
        let departureAtribute
        let geoDeparture
        function showAtributeDeparture() {
            // Get the value from the input
            let valueDeparture = inputDeparture.value;
            // looking for index of element correct with choosing value
            for (let i = 0; i < inputDeparture.list.options.length; i++) {
                if (valueDeparture===inputDeparture.list.options[i].text) {
                    let continentDeparture = data[i].continent;
                    let countryDeparture = data[i].country;
                    let hour = data[i].hour;
                    departureAtribute = [continentDeparture, countryDeparture, hour];
                    let latitudeDepartre = data[i].lat;
                    let longitudeDepartre = data[i].lon;
                    geoDeparture = [latitudeDepartre, longitudeDepartre]
                    console.log(geoDeparture);
                }
            }
        };
        let arrivalAtribute;
        let geoArrival;
        function showAtributeArrival() {
            // Get the value from the input
            let valueArrival = inputArrival.value;
            // looking for index of element correct with choosing value
            for (let i = 0; i < inputArrival.list.options.length; i++) {
                if (valueArrival!=inputArrival.list.options[i].text) {
                    
                } else {
                    let continentArrival = data[i].continent;
                    let countryArrival = data[i].country;
                    arrivalAtribute = [continentArrival, countryArrival];
                    let latitudeArrival = data[i].lat;
                    let longitudeArrival = data[i].lon;
                    geoArrival = [latitudeArrival, longitudeArrival]
                    console.log(geoArrival);//tutaj zwraca oczewikwane wartości
                }
            }
        };
        //nasłuchiwanie
        inputDeparture.addEventListener('input', ()=>{showAtributeDeparture();
            getWeather();
            checkIfBothIsFillAndShowPlane();});
        inputArrival.addEventListener('input', ()=>{showAtributeArrival();checkIfBothIsFillAndShowPlane();});


    // Wyświetlanie Obrazka samolotu
        const planePicture = function() {
            // pobranie elementów 
            let planeUnknow = document.querySelector('.unknown');
            let planeCountry = document.querySelector('.country');
            let planeInternational = document.querySelector('.international');
            let planeIntercontinental = document.querySelector('.intercontinental');

            //wywołanie właściwego obrazu
            if (departureAtribute[1]===arrivalAtribute[1]) {
                planeUnknow.style.display = 'none';
                planeCountry.style.display = 'flex';
                planeInternational.style.display = 'none';
                planeIntercontinental.style.display = 'none';
                fetch('https://api.jsonbin.io/b/609140f9d64cd16802a9beb7')
                .then((resp)=>resp.json())
                .then((data)=>{
                    document.getElementById("listOfSeats").innerHTML='';
                    data.forEach(function (element) {
                        document.getElementById("listOfSeats").innerHTML += `<option value="${element.seat}"</option>`;
                })})
            } else if (departureAtribute[0]===arrivalAtribute[0]) {
                planeUnknow.style.display = 'none';
                planeCountry.style.display = 'none';
                planeInternational.style.display = 'flex';
                planeIntercontinental.style.display = 'none';
                fetch('https://api.jsonbin.io/b/609132cd8a409667ca05b861')
                    .then((resp)=>resp.json())
                    .then((data)=>{
                        document.getElementById("listOfSeats").innerHTML='';
                        data.forEach(function (element) {
                            document.getElementById("listOfSeats").innerHTML += `<option value="${element.seat}"</option>`;
                    })})
            } else {
                planeUnknow.style.display = 'none';
                planeCountry.style.display = 'none';
                planeInternational.style.display = 'none';
                planeIntercontinental.style.display = 'flex';
                fetch('https://api.jsonbin.io/b/60913eb28a409667ca05cedc')
                .then((resp)=>resp.json())
                .then((data)=>{
                    document.getElementById("listOfSeats").innerHTML='';
                    data.forEach(function (element) {
                        document.getElementById("listOfSeats").innerHTML += `<option value="${element.seat}"</option>`;
                })})
            };
    };
    // Calculte distance between departure and arrival place
    const degreesToRadians = degrees => degrees * (Math.PI / 180);
    const radiansToDegrees = radians => radians * (180 / Math.PI);
    const centralSubtendedAngle = (locationX, locationY) => {
        const locationXLatRadians = degreesToRadians(locationX[0])
        console.log(locationXLatRadians);
        const locationYLatRadians = degreesToRadians(locationY[0])
        return radiansToDegrees(
            Math.acos(
                Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) + Math.cos(locationXLatRadians) * Math.cos    (locationYLatRadians) * Math.cos(degreesToRadians(Math.abs(locationX[1] - locationY[1])
                        )
                    )
                )
            )
    }
    const earthRadius = 6371//km
    const greatCircleDistance = angle => 2 * Math.PI * earthRadius * (angle / 360)
    const distanceBetweenLocations = (locationX, locationY) =>
        greatCircleDistance(centralSubtendedAngle(locationX, locationY))
//cheking if input have value
    const checkIfBothIsFillAndShowPlane=()=>{
        if(inputDeparture.value && inputArrival.value){
            planePicture();
            distanceBetweenLocations(geoDeparture, geoArrival);
        } else {
            console.log('nie');
        }
    };
    
})
    .catch((err) => console.log(err));

// Weather APP
const inputDeparture = document.querySelector('#cityNameInput');
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
    
    city = (!inputDeparture.value) ? `lat=${lat}&lon=${lon}`: `q=${inputDeparture.value}`; 
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

// pobieranie wartości input zdef. przez uzytkownika


//POPUP
let popup = document.querySelector('.popup');
let popupPW = document.querySelector('.popupPW');
let rule = document.querySelector('.rule');
let singInUp = document.querySelector('.popupsingInUp');
let popupRule = document.querySelector('.popupRulesBTN');
let popupRuleDesktop = document.querySelector('.popupRulesBTNDesktop');
let popupPopularDirection = document.querySelector('.popupPopularDirectionBTN');
let popupPopularDirectionDesktop = document.querySelector('.popupPopularDirectionBTNDesktop');
let popupSing = document.querySelector('.popupSingBTN');
let popupSingDesktop = document.querySelector('.popupSingBTNDesktop');
let popupCloseRule = document.querySelector('.popupCloseRule');
let popupClosePopularWay = document.querySelector('.popupClosePW');
let popupCloseSingInUp= document.querySelector('.popupCloseSingInUp');
//Opening popup rules
const openPopupRule = () => {
    popup.style.display = 'flex';
    rule.style.display = 'flex';
};
//Opening  popup popularDiriction
const openPopupPopularWay = () => {
    popupPW.style.display = 'flex';
};
//Opening  popup singUpIN
const openPopupsingInUp = () => {
    singInUp.style.display = 'flex';
};
//Closing popupa rule
const closePopupRule = () => {
    popup.style.display = 'none';
    rule.style.display = 'none';

};
//Closing popupaPopularWay
const closePopupPopularWay = () => {
    popupPW.style.display = 'none';
};
//Closing popupa  singUpIN
const closePopupsingInUp = () => {
    singInUp.style.display = 'none';
    // popupSing.value.innerHTML="Jesteś zalogowany";
    // popupSingDesktop.value.innerHTML="Jesteś zalogowany";
};
popupRule.addEventListener('click', openPopupRule);
popupRuleDesktop.addEventListener('click', openPopupRule);
popupPopularDirection.addEventListener('click', openPopupPopularWay);
popupPopularDirectionDesktop.addEventListener('click', openPopupPopularWay);
popupSing.addEventListener('click', openPopupsingInUp);
popupSingDesktop.addEventListener('click', openPopupsingInUp);
popupCloseRule.addEventListener('click', closePopupRule);
popupClosePopularWay.addEventListener('click', closePopupPopularWay);
popupCloseSingInUp.addEventListener('click', closePopupsingInUp);


// PopularWay Carousel
let carousel = document.querySelector('.carouselPW');
let cells = carousel.querySelectorAll('.carousel__cell');
let carouselOption = document.querySelector('.carousel-options')
//let cellCount= 9; // cellCount set from cells-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let isHorizontal = true;
let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius;
let theta;

function rotateCarousel() {
  let angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

let prevButtonPW = document.querySelector('.previous-button-PW');
prevButtonPW.addEventListener( 'click', function() {
    selectedIndex--;
    rotateCarousel();
});

let nextButtonPW = document.querySelector('.next-button-PW');
nextButtonPW.addEventListener( 'click', function() {
    selectedIndex++;
    rotateCarousel();
});

function changeCarousel() {
    let cellCount = 9 //cellsRange.value;
    theta = 40 //360 / cellCount;
    let cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = 288 // Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
    for ( let i=0; i < cells.length; i++ ) {
    let cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
        cell.style.opacity = 1;
        let cellAngle = theta * i;
        cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = 'none';
    }
    }

    rotateCarousel();
}

function onOrientationChange() {
    let widthScreen = window.screen.width;
    if (widthScreen < 500) {
        isHorizontal = false;
        popupPW.style.flexDirection = 'row'
        carouselOption.style.flexDirection = 'column'
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        changeCarousel();
    } else {
        isHorizontal = true;
        popupPW.style.flexDirection = 'column'
        carouselOption.style.flexDirection = 'row'
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        changeCarousel();
    }
}

// set initials
onOrientationChange();
//SingInUP validation
const pass = document.querySelector('#password');
const name = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const p = document.querySelector('.passinfo');
const nameinfo = document.querySelector('.nameinfo');
const surnameinfo = document.querySelector('.surnameinfo');
const emailinfo = document.querySelector('.emailinfo');
const letters = /[a-z]/i;
const numbers = /[0-9]/;
const special = /[!@#$%^&*()]/;
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const minValue = 8;

const checkName = () => {
    if (name.value.match(letters)){
        //name.value.trim();
        return true;
    } else {
        nameinfo.innerHTML = 'Twoje imię jest niepoprawne.'
        return false;
    }
}
const checkSurname = () => {
    if (surname.value.match(letters)){
        //surname.value.trim();
        return true;
    } else {
        surnameinfo.innerHTML = 'Twoje nazwisko jest niepoprawne.'
        return false;
    }
}
const checkEmail = () => {
    if (email.value.match(validRegex)){
        return true;
    } else {
        emailinfo.innerHTML = 'Wpisz poprawny e-mail.'
        return false;
    }
}
name.addEventListener('input', checkName);
surname.addEventListener('input', checkSurname);
email.addEventListener('input', checkEmail);

const checkPassword = () => {

    if (pass.value.length > minValue && pass.value.match(letters) && pass.value.match(numbers) && pass.value.match(special)) {
    p.innerHTML = 'Masz bardzo dobre hasło';
    } else if (pass.value.length > minValue && pass.value.match(letters) && pass.value.match(numbers)) {
        p.innerHTML = 'Masz dobre hasło';
    } else {
        p.innerHTML = 'Masz słabe hasło';
    }
};
pass.addEventListener('keyup', function () {
    if (pass.value !== '') {
        checkPassword();
    } else {
        p.innerHTML = 'Nie podałes hasła...'
    };
})
//CostCalculate
const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

const calculate = () => {
    fetch(`https://api.ratesapi.io/api/2010-01-12?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
        .then(res=>res.json())
        .then(data=>{
            const currency1 = currencyOne.value;
            const currency2 = currencyTwo.value;

            //rateInfo
            const rate = data.rates[currency2];
            rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(3)}${currency2}`;

            //culculating
            amountTwo.value = (amountOne.value * rate).toFixed(2);
        })
};
//rechanging currency
const swap = () => {
    const oldCurrenncy = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = oldCurrenncy;
}
//addeventListener
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap);
calculate();
// Year footer
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`