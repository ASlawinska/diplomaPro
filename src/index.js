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


// Year footer
let today = new Date();
let year = today.getFullYear();
let footer = document.querySelector('.footer');
footer.innerHTML = `Copyright &copy; ${year} <br>AFM diploma thesis Adrianna Sławińska`