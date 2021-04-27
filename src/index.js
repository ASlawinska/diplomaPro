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
        function showAtributeDeparture() {
            // Get the value from the input
            let valueDeparture = inputDeparture.value;
            // looking for index of element correct with choosing value
            for (let i = 0; i < inputDeparture.list.options.length; i++) {
                if (valueDeparture===inputDeparture.list.options[i].text) {
                    let continentDeparture = data[i].continent;
                    let countryDeparture = data[i].country;
                    departureAtribute = [continentDeparture, countryDeparture];
                    console.log(departureAtribute);
                }
            }
        };
        let arrivalAtribute;
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
                    console.log(arrivalAtribute);//tutaj zwraca oczewikwane wartości
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
                console.log("krajowy");
            } else if (departureAtribute[0]===arrivalAtribute[0]) {
                planeUnknow.style.display = 'none';
                planeInternational.style.display = 'flex';
                console.log("miedzynarodowy");
            } else {
                planeUnknow.style.display = 'none';
                planeIntercontinental.style.display = 'flex';
                console.log('międzykontynetalny');
            };
    };
    const checkIfBothIsFillAndShowPlane=()=>{
        if(inputDeparture.value && inputArrival.value){
            planePicture();
            console.log('ok');
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
console.log(popupRule);
let popupRuleDesktop = document.querySelector('.popupRulesBTNDesktop');
let popupPopularDirection = document.querySelector('.popupPopularDirectionBTN');
let popupPopularDirectionDesktop = document.querySelector('.popupPopularDirectionBTNDesktop');
let popupSing = document.querySelector('.popupSingBTN');
let popupSingDesktop = document.querySelector('.popupSingBTNDesktop');
let popupCloseRule = document.querySelector('.popupCloseRule');
let popupClosePopularWay = document.querySelector('.popupClosePW');
let popupCloseSingInUp= document.querySelector('.popupCloseSingInUp');
//Otwieranie popupa rules
const openPopupRule = () => {
    popup.style.display = 'flex';
    rule.style.display = 'flex';
};
//Otwieranie popupa popularDiriction
const openPopupPopularWay = () => {
    popupPW.style.display = 'flex';
};
//Otwieranie popupa singUpIN
const openPopupsingInUp = () => {
    singInUp.style.display = 'flex';
};
//Zamykanie popupa rule
const closePopupRule = () => {
    popup.style.display = 'none';
    rule.style.display = 'none';

};
//Zamykanie popupaPopularWay
const closePopupPopularWay = () => {
    popupPW.style.display = 'none';
};
//Zamykanie popupa  singUpIN
const closePopupsingInUp = () => {
    singInUp.style.display = 'none';

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

// Year footer
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`