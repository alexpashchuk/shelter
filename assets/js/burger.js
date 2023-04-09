const burger = document.querySelector('.burger');
// const logo = document.querySelector('.logo');
const menu = document.querySelector('.menu');
const html = document.querySelector('html');
const mask = document.querySelector('.mask');
const links = document.querySelectorAll('.menu-list > li');

const toggleMenu = () => {
    burger.classList.toggle('rotate');
    // logo.classList.toggle('move');
    menu.classList.toggle('menu-active');
    html.classList.toggle('lock');
    mask.classList.toggle('mask-active');
};

const closeMenu = () => {
    burger.classList.remove('rotate');
    // logo.classList.remove('move');
    menu.classList.remove('menu-active');
    html.classList.remove('lock');
    mask.classList.remove('mask-active');
};

burger.addEventListener('click', toggleMenu);
// logo.addEventListener('click', closeMenu);
mask.addEventListener('click', closeMenu);
[...links].forEach((link) => {
    link.addEventListener('click', closeMenu);
});
