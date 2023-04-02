import { Burger } from '../../assets/js/burger.js';

Burger();

console.group('%cShelter#2', 'color: red');
console.log('Вёрстка страницы Main соответствует макету при ширине экрана 1280px ' + '%c+14', 'color: red');
console.log('Вёрстка страницы Main соответствует макету при ширине экрана 768px ' + '%c+14', 'color: red');
console.log('Вёрстка страницы Main соответствует макету при ширине экрана 320px ' + '%c+14', 'color: red');
console.log('Вёрстка страницы Pets соответствует макету при ширине экрана 1280px ' + '%c+6', 'color: red');
console.log('Вёрстка страницы Pets соответствует макету при ширине экрана 768px ' + '%c+6', 'color: red');
console.log('Вёрстка страницы Pets соответствует макету при ширине экрана 320px ' + '%c+6', 'color: red');
console.log(
    'Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки ' + '%c+20',
    'color: red'
);
console.log('Верстка резиновая ' + '%c+8', 'color: red');
console.log('Иконка бургер-меню ' + '%c+4', 'color: red');
console.log('Верстка обеих страниц валидная ' + '%c+8', 'color: red');
console.log('%cВСЕГО: +100', 'color: red');
console.groupEnd();
