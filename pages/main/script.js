import { Burger } from '../../assets/js/burger.js';

Burger();

console.group('%cShelter#1', 'color: red');
console.group('%cСтраница Main', 'color: yellow');
console.log('Проверка верстки.' + '%c+7', 'color: red');
console.log('Вёрстка соответствует макету. ' + '%c+35', 'color: red');
console.log('Требования к css. ' + '%c+6', 'color: red');
console.log('Интерактивность элементов. ' + '%c+12', 'color: red');
console.log('%cВСЕГО: +60', 'color: yellow');
console.groupEnd();

console.group('%cСтраница Pets', 'color: yellow');
console.log('Проверка верстки. ' + '%c+7', 'color: red');
console.log('Вёрстка соответствует макету. ' + '%c+15', 'color: red');
console.log('Требования к css. ' + '%c+4', 'color: red');
console.log('Интерактивность элементов. ' + '%c+14', 'color: red');
console.log('%cВСЕГО: +40', 'color: yellow');
console.groupEnd();

console.log('%cВСЕГО: +100', 'color: red');
console.groupEnd();
