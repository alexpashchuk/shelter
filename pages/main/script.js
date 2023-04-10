const carousel = document.querySelector('.slider-carousel');
const slideLeft = document.querySelector('#slide-left');
const slideActive = document.querySelector('#slide-active');
const slideRight = document.querySelector('#slide-right');
const btnLeft = document.querySelector('#slider-btn-left');
const btnRight = document.querySelector('#slider-btn-right');

const response = await fetch('../../assets/data/pets.json');
const pets = await response.json();

window.addEventListener('load', () => {
    initSlider(pets);
});

let direction;
let activeArr;
let sortedArray = [];

const getSortedArray = (petsArr) => {
    let initArr = [];
    let nextArr = [];
    let currArr = [];
    let pastArr = [];

    if (!activeArr) {
        petsArr.forEach((_, i) => initArr.push(i));
        initArr
            .sort(() => Math.random() - 0.5)
            .forEach((el, index) => {
                index < 3 ? currArr.push(el) : null;
            });
    } else {
        currArr = activeArr;
    }

    const getSortSlides = (petsArr) => {
        for (let index = 0; index < 3; index++) {
            let num = Math.floor(Math.random() * 8);
            while (petsArr.includes(num) || currArr.includes(num)) {
                num = Math.floor(Math.random() * 8);
            }
            petsArr.push(num);
        }
    };

    if (direction !== 'right') {
        getSortSlides(nextArr);
    } else {
        nextArr = petsArr.slice(3, 6);
    }
    if (direction !== 'left') {
        getSortSlides(pastArr);
    } else {
        pastArr = petsArr.slice(3, 6);
    }

    return [...pastArr, ...currArr, ...nextArr];
};

const createCardTemplate = (slideItem, petCard, isReplace) => {
    const { img, name, type } = petCard || {};
    const card = document.createElement('div');
    isReplace ? slideItem.replaceWith(card) : slideItem.append(card);
    card.outerHTML = `<div class="card-pets" data-name="${name}">
        <img src="${img}" alt="${type} ${name}" width="270" height="270">
            <h4>${name}</h4>
            <button class="secondary">Learn more</button>
    </div>`;
};

const initSlider = () => {
    sortedArray = getSortedArray(pets);

    sortedArray.forEach((_, i) => {
        if (i < 3) {
            createCardTemplate(slideLeft, pets[sortedArray[i]], false);
        } else if (i > 5) {
            createCardTemplate(slideRight, pets[sortedArray[i]], false);
        } else {
            createCardTemplate(slideActive, pets[sortedArray[i]], false);
        }
    });
};

const updateSlider = () => {
    const cards = carousel.querySelectorAll('.card-pets');
    cards.forEach((item, i) => {
        createCardTemplate(item, pets[sortedArray[i]], true);
    });
};

const moveLeft = () => {
    carousel.classList.add('transition-left');
    btnLeft.removeEventListener('click', moveLeft);
    btnRight.removeEventListener('click', moveRight);
};

const moveRight = () => {
    carousel.classList.add('transition-right');
    btnRight.removeEventListener('click', moveRight);
    btnLeft.removeEventListener('click', moveLeft);
};

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

carousel.addEventListener('animationend', (event) => {
    if (event.animationName === 'move-left') {
        carousel.classList.remove('transition-left');
        slideActive.innerHTML = slideLeft.innerHTML;
        direction = 'right';
        activeArr = sortedArray.slice(0, 3);
    } else {
        carousel.classList.remove('transition-right');
        slideActive.innerHTML = slideRight.innerHTML;
        direction = 'left';
        activeArr = sortedArray.slice(-3);
    }

    sortedArray = getSortedArray(sortedArray);
    updateSlider();

    btnLeft.addEventListener('click', moveLeft);
    btnRight.addEventListener('click', moveRight);
});

console.group('%cShelter#3', 'color: red');
console.log('Реализация burger menu на обеих страницах ' + '%c+26', 'color: red');
console.log('Реализация слайдера-карусели на странице Main ' + '%c+36', 'color: red');
console.log('Реализация пагинации на странице Pets ' + '%c+36', 'color: red');
console.log('Реализация попап на обеих страницах: ' + '%c+12', 'color: red');
console.log('%cВСЕГО: +110', 'color: red');
console.groupEnd();
