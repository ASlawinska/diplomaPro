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


// Year footer
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`