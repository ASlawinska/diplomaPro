import style from "./scss/index.scss";

//Burger menu
const burgerBtn = document.querySelector('.burger');
const open = document.querySelector('.fa-bars');
const close = document.querySelector('.fa-times');
const nav = document.querySelector('.navBur')

const addActive = () => {
    nav.classList.toggle('activeBur');
    if (nav.classList.contains('activeBur')) {
        open.classList.add('hide');
        close.classList.remove('hide');
    } else {
        open.classList.remove('hide');
        close.classList.add('hide');
    }
}
burgerBtn.addEventListener('click', addActive)
//Visible slide
// const slide1 = document.querySelector(".slide1");
const chooseDirection = document.querySelector(".chooseDirection");
const weather = document.querySelector(".weather");
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const summary = document.querySelector(".summary");
const summaryButton =document.querySelector(".summaryButton")
const logo = document.querySelector(".logo");
//Opening slide1, hidding slide2&3
const visibleSlide1 = () => {
    chooseDirection.style.display = 'flex';
    weather.style.display = 'flex';
    slide1.style.display = 'flex';
    slide2.style.display = 'none';
    summary.style.display = 'none';
};
//Opening slide2, hidding slide1&3
const visibleSlide2 = () => {
    chooseDirection.style.display = 'none';
    weather.style.display = 'none';
    slide1.style.display = 'none';
    slide2.style.display = 'flex';
    summary.style.display = 'none';
    planePicture();
    distanceBetweenLocations(geoDeparture, geoArrival)
};
//Opening slide3, hidding slide1&2
const visibleSlide3 = () => {
    chooseDirection.style.display = 'none';
    slide1.style.display = 'flex';
    weather.style.display = 'flex';
    slide2.style.display = 'none';
    summary.style.display = 'flex';
};
//listening
logo.addEventListener("click", visibleSlide1);
summaryButton.addEventListener("click", ()=>{visibleSlide3(), getWeatherArrival(), infoFlight(),distanceBetweenLocations(geoDeparture, geoArrival), calculate()});

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

const securDate = () => {
    let chooseDepartureDate = document.querySelector('#today').value;
    let tommorowDay = new Date(chooseDepartureDate);
    tommorowDay.setDate(tommorowDay.getDate()+1);
    let dayTommorow = (tommorowDay.getDate()) <10 ? `0${tommorowDay.getDate()}`: `${tommorowDay.getDate()}`;
    let monthTommmorow = (tommorowDay.getMonth()+1) <10 ? `0${tommorowDay.getMonth()+1}`: `${(tommorowDay.getMonth()+1)}`;
    let yearTommorow = tommorowDay.getFullYear();

    let dateFormat2 = `${yearTommorow}-${monthTommmorow}-${dayTommorow}`;
    let tommorowMin = tommorow.setAttribute('min', dateFormat2);
    tommorow.setAttribute('value', dateFormat2);
}
thisDay.addEventListener('change', securDate )
//
const getWeatherArrival = () => {
    let chooseArrivalDate = document.querySelector('#tommorow').value;
    let chooseyear = parseInt(chooseArrivalDate.substr(0, 4));
    let choosemonth = parseInt(chooseArrivalDate.slice(5,7))-1;
    let chooseday = parseInt(chooseArrivalDate.substr(8, 10));
    let chooseArrivalDateFormat = new Date(chooseyear, choosemonth, chooseday);
    let diff = chooseArrivalDateFormat.getTime() - today.getTime();
    let diffday = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffday<=16) {
        getWeather(inputArrival.value);
    }else{
        getWeather(inputDeparture.value);
    }
}
//Adding removing option city 
let cities = [];
const createOption = (element) => {
    let option = document.createElement('option');
    option.value = element.city;
    option.setAttribute(`data-country`, element.country)
    option.setAttribute(`data-continent`, element.continent)
    option.innerText = element.city;
    return option
}
const initialData = () => {
    let data = [...cities];
    let listOfCities = document.getElementById("listOfCities");
    let listOfCitiesArrival = document.getElementById("listOfCitiesArrival");
    const optionFunction =(list) => {
        data.forEach(function (element) {
            const option = createOption(element);
            list.appendChild(option)
        })
    }
    optionFunction(listOfCities);
    optionFunction(listOfCitiesArrival);

}
const clearInput = (input, city) => {
    for (let i = 0; i < input.children.length; i++) {
        if (input.children[i].innerText === city) {
            input.children[i].remove();
        }
    }
}
const addingCity = (input, city) => {
    let j = 0;
    for (let i = 0; i < cities.length; i++, j++) {
        if ( cities[i].city !== input.children[j].innerText) {
            if (cities[i].city === city) {
                j--;
            } else {
                const option = createOption(cities[i]);
                if (j+1===input.children.length) {
                    input.appendChild(option);
                }else{
                input.insertBefore(option, input.children[j+1]);
                }
            }
        }
        
    }
}
// Adding removing sits 
let sits = [];
const createInputName = () => {
    let inputName = document.createElement('input');
    inputName.setAttribute(`placeholder`, 'Imię i nazwisko');
    inputName.setAttribute(`class`, 'passangerName');
    inputName.setAttribute(`required`, 'required');
    return inputName
}
const createOptionSits = (element) => {
    let option = document.createElement('option');
    option.value = element.seat;
    option.innerText = element.seat;
    return option
}
const createLabelSits = () => {
    let label = document.createElement('label');
    label.setAttribute(`for`, 'seats');
    label.innerText = `Miejsce: `;
    return label
}
const createInputSits = (i) => {
    let inputSits = document.createElement('input');
    inputSits.setAttribute(`type`, 'text');
    inputSits.setAttribute(`list`, `listOfSeats${i}`);
    inputSits.setAttribute(`name`, 'seats');
    inputSits.setAttribute(`class`, `class${i} inputSeat`);
    inputSits.setAttribute(`required`, 'required');
    inputSits.setAttribute(`placeholder`, 'Wybierz miejsce');
    return inputSits
}
const breakeLine = () => {
    let breakeLine = document.createElement('br');
    return breakeLine
}
const createInputLuggage = () => {
    let chooseLuggage = document.createElement('div');
    chooseLuggage.setAttribute('class', 'chooseLuggage');
    let labelLuggageHand = document.createElement('label');

    let inputLuggageHand = document.createElement('input');
    inputLuggageHand.setAttribute(`type`, 'checkbox');
    inputLuggageHand.setAttribute(`name`, 'checkbox');
    inputLuggageHand.setAttribute(`checked`, 'checked');
    inputLuggageHand.setAttribute(`value`, 'bagaż podręczny');

    
    let iHand = document.createElement('i');
    iHand.setAttribute('class', 'fas fa-suitcase');
    iHand.innerText = `Bagaż podręczny`;

    labelLuggageHand.appendChild(inputLuggageHand);
    labelLuggageHand.appendChild(iHand);

    let labelLuggageLess10kg =document.createElement('label');

    let inputLuggageLess10kg = document.createElement('input');
    inputLuggageLess10kg.setAttribute(`type`, 'checkbox');
    inputLuggageLess10kg.setAttribute(`name`, 'checkbox');
    inputLuggageLess10kg.setAttribute(`value`, 'Bagaż do 10kg');
    
    let iLess10kg = document.createElement('i');
    iLess10kg.setAttribute('class', 'fas fa-suitcase-rolling');
    iLess10kg.innerText = `Bagaż do 10kg`;

    labelLuggageLess10kg.appendChild(inputLuggageLess10kg);
    labelLuggageLess10kg.appendChild(iLess10kg);

    let labelLuggageLess25kg =document.createElement('label');
    
    let inputLuggageLess25kg = document.createElement('input');
    inputLuggageLess25kg.setAttribute(`type`, 'checkbox');
    inputLuggageLess25kg.setAttribute(`name`, 'checkbox');
    inputLuggageLess25kg.setAttribute(`value`, 'Bagaż do 25kg');
    
    let iLess25kg = document.createElement('i');
    iLess25kg.setAttribute('class', 'fas fa-luggage-cart');
    iLess25kg.innerText = `Duży bagaż do 25kg`;
    
    labelLuggageLess25kg.appendChild(inputLuggageLess25kg);
    labelLuggageLess25kg.appendChild(iLess25kg);
    
    let labelLuggageOther =document.createElement('label');

    let inputLuggageOther = document.createElement('input');
    inputLuggageOther.setAttribute(`type`, 'checkbox');
    inputLuggageOther.setAttribute(`name`, 'checkbox');
    inputLuggageOther.setAttribute(`value`, 'Bagaż niewymiarowy');
    
    let iOther = document.createElement('i');
    iOther.setAttribute('class', 'fas fa-luggage-cart');
    iOther.innerText = `Bagaż niewymiarowy`;

    labelLuggageOther.appendChild(inputLuggageOther);
    labelLuggageOther.appendChild(iOther);
    

    chooseLuggage.appendChild(labelLuggageHand);
    chooseLuggage.appendChild(breakeLine());

    chooseLuggage.appendChild(labelLuggageLess10kg);
    chooseLuggage.appendChild(breakeLine());

    chooseLuggage.appendChild(labelLuggageLess25kg);
    chooseLuggage.appendChild(breakeLine());

    chooseLuggage.appendChild(labelLuggageOther);
    chooseLuggage.appendChild(breakeLine());

    return chooseLuggage
}


const createDatalistSits = (i) => {
    let datalist = document.createElement('datalist');
    datalist.setAttribute(`id`, `listOfSeats${i}`);
    datalist.setAttribute(`class`, `listOfSeats`);
    return datalist
}
const initialDataSits = (i) => {
    let data = [...sits];

    const optionFunctionSits =(list) => {
        data.forEach(function (element) {
            const option = createOptionSits(element);
            list.appendChild(option)
        })
    }
    optionFunctionSits(document.getElementById(`listOfSeats${i}`));
}
const hr = () =>{
    let hr = document.createElement('hr');
    return hr
}
const addFormSits = () => {
    let numPassanger = document.querySelector('#numbPas');
    for (let i = 1; i <= numPassanger.value; i++) {
        let infoPlane = document.querySelector('.infoPlane');
        infoPlane.appendChild(createInputName());
        infoPlane.appendChild(breakeLine());
        infoPlane.appendChild(createLabelSits());
        infoPlane.appendChild(createInputSits(i));
        infoPlane.appendChild(createDatalistSits(i));
        infoPlane.appendChild(createInputLuggage());
        infoPlane.appendChild(hr());
        initialDataSits(i);
        console.log(`addform${i}`);
}}

const clearInputSits = (input, sit) => {
    for (let i = 0; i < input.children.length; i++) {
        if (input.children[i].innerText === sit) {
            input.children[i].remove();
        }
    }
}
const addingSits = (input, sit) => {
    let j = 0;
    for (let i = 0; i < sits.length; i++, j++) {
        if ( sits[i].seat !== input.children[j].innerText) {
            if (sits[i].sit === sit) {
                j--;
            } else {
                const option = createOptionSits(sits[i]);
                if (j+1===input.children.length) {
                    input.appendChild(option);
                }else{
                input.insertBefore(option, input.children[j+1]);
                }
            }
        }
    }
}
//
let inputArrival = document.getElementById('cityNameInputArrival'); 
let inputDeparture = document.getElementById('cityNameInput');
let inputArrivallist = document.getElementById('listOfCitiesArrival'); 
let inputDeparturelist = document.getElementById('listOfCities');
let departureAtribute
let geoDeparture
function showAtributeDeparture() {
    // Get the value from the input
    let valueDeparture = inputDeparture.value;
    // looking for index of element correct with choosing value
    for (let i = 0; i < cities.length; i++) {
        if (valueDeparture===cities[i].city) {
            let continentDeparture = cities[i].continent;
            let countryDeparture = cities[i].country;
            let hour = cities[i].hour;
            departureAtribute = [continentDeparture, countryDeparture, hour];
            let latitudeDepartre = cities[i].lat;
            let longitudeDepartre = cities[i].lon;
            geoDeparture = [latitudeDepartre, longitudeDepartre]
        } else {

        }
    }
};
let arrivalAtribute;
let geoArrival;
function showAtributeArrival() {
    // Get the value from the input
    let valueArrival = inputArrival.value;

    // looking for index of element correct with choosing value
    for (let i = 0; i < cities.length; i++) {
        if (valueArrival===cities[i].city) {
            let continentArrival = cities[i].continent;
            let countryArrival = cities[i].country;
            let hour = cities[i].hour;
            arrivalAtribute = [continentArrival, countryArrival, hour];
            let latitudeArrival = cities[i].lat;
            let longitudeArrival = cities[i].lon;
            geoArrival = [latitudeArrival, longitudeArrival];
        } else {

        }
    }
};
let passangerSit = [];
let listSit = [];
let passangerName = [];
let passangerNameItem = document.querySelectorAll('.passangerName');
passangerName = Array.from(passangerNameItem);
    for (let element of passangerName) {
        element.addEventListener("change", function(event) {
        summaryButtonDisabled();})}
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
            sits = data;
            addFormSits();
            let listItem = document.querySelectorAll('.listOfSeats');
            listSit = Array.from(listItem);
            let inputSitItem = document.querySelectorAll('.inputSeat');
            passangerSit = Array.from(inputSitItem);
            for (let element of passangerSit) {
                element.addEventListener("change", function(event) {
                    summaryButtonDisabled();
                        if(event.currentTarget.value=== element.value){
                            for (let j = 0; j < listSit.length; j++) {
                                clearInputSits(listSit[j], element.value);
                                //addingSits(listSit[j], element.value);
                            }
                        }
                    }
                )
            }
        })
    } else if (departureAtribute[0]===arrivalAtribute[0]) {
        planeUnknow.style.display = 'none';
        planeCountry.style.display = 'none';
        planeInternational.style.display = 'flex';
        planeIntercontinental.style.display = 'none';
        fetch('https://api.jsonbin.io/b/609132cd8a409667ca05b861')
            .then((resp)=>resp.json())
            .then((data)=>{
                sits = data;
                addFormSits();
                let listItem = document.querySelectorAll('.listOfSeats');
                listSit = Array.from(listItem);
                let inputSitItem = document.querySelectorAll('.inputSeat');
                passangerSit = Array.from(inputSitItem);
                for (let element of passangerSit) {
                    element.addEventListener("change", function(event) {
                        summaryButtonDisabled();
                            if(event.currentTarget.value=== element.value){
                                for (let j = 0; j < listSit.length; j++) {
                                    clearInputSits(listSit[j], element.value);
                                    //addingSits(listSit[j], element.value);
                                }
                            }
                        }
                    )
                }
            })
    } else {
        planeUnknow.style.display = 'none';
        planeCountry.style.display = 'none';
        planeInternational.style.display = 'none';
        planeIntercontinental.style.display = 'flex';
        fetch('https://api.jsonbin.io/b/60913eb28a409667ca05cedc')
        .then((resp)=>resp.json())
        .then((data)=>{
            sits = data;
            addFormSits();
            let listItem = document.querySelectorAll('.listOfSeats');
            listSit = Array.from(listItem);
            let inputSitItem = document.querySelectorAll('.inputSeat');
            passangerSit = Array.from(inputSitItem);
            for (let element of passangerSit) {
                element.addEventListener("change", function(event) {
                    summaryButtonDisabled();
                        if(event.currentTarget.value=== element.value){
                            for (let j = 0; j < listSit.length; j++) {
                                clearInputSits(listSit[j], element.value);
                                //addingSits(listSit[j], element.value);
                            }
                        }
                    }
                )
            }
        })
    };
};
// Calculte distance between departure and arrival place
const degreesToRadians = degrees => degrees * (Math.PI / 180);
const radiansToDegrees = radians => radians * (180 / Math.PI);
const centralSubtendedAngle = (locationX, locationY) => {
    const locationXLatRadians = degreesToRadians(locationX[0])
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

//CostCalculate
const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');
const costInfo = document.querySelector('.cost-info');
const amountPassanger = document.querySelector('#numbPas');

const calculate = () => {
    fetch(`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
        .then(res=>res.json())
        .then(data=>{
            const currency1 = currencyOne.value;
            const currency2 = currencyTwo.value;
            // calculating the starting value of ticket based on different currency
            switch (currencyOne.value) {
                case 'PLN':
                    amountOne.value = (0.8 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'USD':
                    amountOne.value = (0.3 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'RUB':
                    amountOne.value = (18 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'EUR':
                    amountOne.value = (0.2 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'HKD':
                    amountOne.value = (2 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'MXN':
                    amountOne.value = (5 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'BRL':
                    amountOne.value = (1.5 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                case 'ZAR':
                    amountOne.value = (3,5 * distanceBetweenLocations(geoDeparture, geoArrival)).toFixed(2);
                    break;
                default:
                    break;
            }
            //rateInfo
            const rate = data.rates[currency2];
            rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(3)}${currency2}`;
            //culculating
            amountTwo.value = (amountOne.value * rate).toFixed(2);
            costInfo.textContent = `Cena wszytskich biletów: ${(amountOne.value * amountPassanger.value).toFixed(2)}${currency1}`;
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
swapBtn.addEventListener('click', swap);
    // info about flight
    const infoDeparture =document.querySelector('.infoDeparture');
    const infoDepartureDate =document.querySelector('.infoDepartureDate');
    const infoDepartureHour =document.querySelector('.infoDepartureHour');
    const sit = document.querySelector('.sit');
    const infoArrival =document.querySelector('.infoArrival');
    const infoArrivalDate =document.querySelector('.infoArrivalDate');
    const infoArrivalHour =document.querySelector('.infoArrivalHour');
    const inputDateDeparture = document.querySelector('.dateDeparture');
    const inputDateArrival = document.querySelector('.dateArrival');
    let sitArr = [];

const downloadValueSit = () => {
    for (let element of passangerSit){
        sitArr.push(`${element.value}`);
    }
}

const infoFlight = () => {
    downloadValueSit();
        infoDeparture.innerHTML = `Wylot z ${inputDeparture.value} do ${inputArrival.value}`
        infoDepartureDate.innerHTML = `Data wylotu ${inputDateDeparture.value}`
        infoDepartureHour.innerHTML = `Godzina wylotu ${departureAtribute[2]}`
        sit.innerHTML = `Miejsce ${sitArr}`
        infoArrival.innerHTML = `Powrót z ${inputArrival.value} do ${inputDeparture.value}`
        infoArrivalDate.innerHTML = `Data powrotu ${inputDateArrival.value}`
        infoArrivalHour.innerHTML = `Godzina powrotu ${arrivalAtribute[2]}`
    }
    // activation button next
    const submitDisabled = () => {
        const nextSlide = document.querySelector('.nextSlide');
        if(inputDeparture.value && inputArrival.value && inputDateDeparture.value && inputDateArrival.value && amountPassanger.value){
            const textSingUP = document.querySelector('.popupSingBTN');
            const textSingUPDesktop = document.querySelector('.popupSingBTNDesktop');
            if (textSingUP.innerText.includes('Witaj')||textSingUPDesktop.innerText.includes('Witaj')) {
                nextSlide.disabled = false;
                nextSlide.removeEventListener("click", openPopupsingInUp);
                nextSlide.addEventListener("click", visibleSlide2);
                // nextSlide.addEventListener("click", ()=>{visibleSlide2(), planePicture(), distanceBetweenLocations(geoDeparture, geoArrival)});
            } else {
                nextSlide.disabled = false;
                nextSlide.addEventListener("click", openPopupsingInUp);
            }
        } else {
            nextSlide.disabled = true;
        }
    };
    //listening
    inputDeparture.addEventListener('input', ()=>{
        showAtributeDeparture();
        getWeather(inputDeparture.value);
        submitDisabled()});
    inputArrival.addEventListener('input', ()=>{
        showAtributeArrival();
        submitDisabled();})
    infoDepartureDate.addEventListener('input', submitDisabled);
    infoArrivalDate.addEventListener('input', submitDisabled);
    amountPassanger.addEventListener('input', submitDisabled);
// activation button summarry
const summaryButtonDisabled = () => {
    const summaryButton = document.querySelector('.summaryButton');
    function hasValue(element, array){
        return element.value
    };
    let checkingValuePassangerName = passangerName.every(hasValue);
    let checkingValuePassangerSit = passangerSit.every(hasValue);

        if(checkingValuePassangerName===true && checkingValuePassangerSit===true){
            summaryButton.disabled = false;
        } else {
            summaryButton.disabled = true;
        }
    }

//Seletet list form and working with json database 
fetch("https://api.jsonbin.io/b/606f4872ceba857326712ed1/2")
    .then((resp) => resp.json()) 
    .then((data) => {
        cities = data;
        initialData();
        let onChange = (event) => {
            if(event.currentTarget=== inputArrival){
                clearInput(inputDeparturelist, inputArrival.value)
                addingCity(inputDeparturelist, inputArrival.value )
            } else {
                clearInput(inputArrivallist, inputDeparture.value);
                addingCity(inputArrivallist, inputDeparture.value);
            }
        }
        // give chossing value
        inputArrival.addEventListener('change', onChange);
        inputDeparture.addEventListener('change', onChange);
})
    .catch((err) => console.log(err));

// Weather APP
//const inputDeparture = document.querySelector('#cityNameInput');
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

let nameCity;
let url;

if('geolocation' in navigator){  
    navigator.geolocation.getCurrentPosition(setPosition);  
}else{  
    console.log(error);
}  

function setPosition(position){  
    let lat = position.coords.latitude;  
    let lon = position.coords.longitude;  
    getWeather('',lat, lon); 
}  

const getWeather = (city, lat, lon) => {
    
    nameCity = (!city) ? `lat=${lat}&lon=${lon}`: `q=${city}`; 
    url = apilink + nameCity + apiKey + lang + units;

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
let carouselOption = document.querySelector('.carousel-options');
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
        carouselOption.style.flexDirection = 'column';
        prevButtonPW.style.transform = 'rotate(90deg)';
        nextButtonPW.style.transform = 'rotate(90deg)';
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        changeCarousel();
    } else {
        isHorizontal = true;
        popupPW.style.flexDirection = 'column';
        carouselOption.style.flexDirection = 'row';
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        changeCarousel();
    }
}

// set initials
onOrientationChange();
//SingInUP validation

const pass = document.querySelector('#password');
const name = document.querySelector('#name');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#email');
const p = document.querySelector('.passinfo');
const nameinfo = document.querySelector('.nameinfo');
const lastnameinfo = document.querySelector('.lastnameinfo');
const emailinfo = document.querySelector('.emailinfo');
const letters =  /^[a-zA-Z]{1,}$/i;
const numbers = /[0-9]/;
const special = /[!@#$%^&*()]/;
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const minValue = 8;

//Autocomplite the login section
const autocomplite = () => {
    fetch(`https://api.jsonbin.io/b/60a6668c12f79a07735f593e`)
        .then (resp=>resp.json())
        .then (data =>
            console.log(data)
            
            )
}
//autocomplite();
const checkName = () => {
    if (name.value.match(letters)){
        nameinfo.innerHTML = ''
    } else {
        nameinfo.innerHTML = 'Wpisz poprawne imię.'
    }
}
const checklastname = () => {
    if (lastname.value.match(letters)){
        lastnameinfo.innerHTML = ''
    } else {
        lastnameinfo.innerHTML = 'Wpisz poprawne nazwisko'
    }
}
const checkEmail = () => {
    if (email.value.match(validRegex)){
        emailinfo.innerHTML = ''
    } else {
        emailinfo.innerHTML = 'Wpisz poprawny e-mail.'
    }
}
name.addEventListener('keyup', function () {
    if (name.value !== '') {
        checkName();
    } else {
        nameinfo.innerHTML = 'Nie podałes imienia...'
    };
});
lastname.addEventListener('keyup', function () {
    if (lastname.value !== '') {
        checklastname();
    } else {
        lastnameinfo.innerHTML = 'Nie podałes nazwiska...'
    };
});
email.addEventListener('keyup', function () {
    if (email.value !== '') {
        checkEmail();
    } else {
        emailinfo.innerHTML = 'Nie podałes adresu e-mail...'
    };
});

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
//SINGUP confirm


// activation button confirm
const confirmDisabled = () => {
    const confirm = document.querySelector('.popupCloseSingInUp');
    const textSingUP = document.querySelector('.popupSingBTN');
    const textSingUPDesktop = document.querySelector('.popupSingBTNDesktop');

    if(name.value && lastname.value && email.value && pass.value){
        confirm.disabled = false;
        textSingUP.innerText = `Witaj ${name.value}!`;
        textSingUPDesktop.innerText = `Witaj ${name.value}!`;
        submitDisabled();
    } else {
        confirm.disabled = true;
    }
};
name.addEventListener('input', confirmDisabled);
lastname.addEventListener('input', confirmDisabled);
email.addEventListener('input', confirmDisabled);
pass.addEventListener('input', confirmDisabled);

//buy tikets
let buyButton = document.querySelector('.buy');
let payPopup = document.querySelector('.pay');

const visiblePayPopup = () => {
    payPopup.style.display="flex";
}
buyButton.addEventListener('click', visiblePayPopup);

// Year footer
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`