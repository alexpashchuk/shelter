export const Burger = () => {
    const burger = document.querySelector('.burger');
    const logo = document.querySelector('.logo');
    const menu = document.querySelector('.menu');
    const body = document.querySelector('body');
    const mask = document.querySelector('.mask');
    const links = document.querySelectorAll('.menu-list > li');

    const toggleMenu = () => {
        burger.classList.toggle('rotate');
        logo.classList.toggle('move');
        menu.classList.toggle('menu-active');
        body.classList.toggle('lock');
        mask.classList.toggle('mask-active');
    };

    const closeMenu = () => {
        // const clickMenu = e.composedPath().includes(menu);
        // const clickBurger = e.composedPath().includes(burger);
        // const clickMask = e.composedPath().includes(mask);
        burger.classList.remove('rotate');
        logo.classList.remove('move');
        menu.classList.remove('menu-active');
        body.classList.remove('lock');
        mask.classList.remove('mask-active');
    };

    burger.addEventListener('click', toggleMenu);
    logo.addEventListener('click', closeMenu);
    mask.addEventListener('click', closeMenu);
    [...links].forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
};