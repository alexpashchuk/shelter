const carousel = document.querySelector('.slider-carousel');
const slideLeft = document.querySelector('#slide-left');
const slideActive = document.querySelector('#slide-active');
const slideRight = document.querySelector('#slide-right');
const btnLeft = document.querySelector('#slider-btn-left');
const btnRight = document.querySelector('#slider-btn-right');
const desktop = window.matchMedia('(min-width: 1280px)');
const tablet = window.matchMedia('(max-width: 1279px) and (min-width: 768px)');

const response = await fetch('../../assets/data/pets.json');
const pets = await response.json();

window.addEventListener('load', () => {
    resizeCards();
});

window.addEventListener('resize', () => {
    resizeCards();
});

const createCardTemplate = (slideItems, petCard) => {
    const { img, name, type } = petCard || {};
    const card = document.createElement('div');
    slideItems.appendChild(card);
    card.outerHTML = `<div class="card-pets" data-name="${name}">
        <img src="${img}" alt="${type} ${name}" width="270" height="270">
            <h4>${name}</h4>
            <button class="secondary">Learn more</button>
    </div>`;
};

let arr = [];

let startArray = Array.from({ length: 8 })
    .fill(null)
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5);

const resizeCards = () => {
    arr = [...startArray];
    if (desktop.matches) {
        // countCards = 3;
        arr.splice(3);
    } else if (tablet.matches) {
        // countCards = 2;
        arr.splice(2);
    } else {
        // countCards = 1;
        arr.splice(1);
    }
    while (slideActive.firstChild || slideLeft.firstChild || slideRight.firstChild) {
        slideActive.removeChild(slideActive.firstChild);
        slideLeft.removeChild(slideLeft.firstChild);
        slideRight.removeChild(slideRight.firstChild);
    }
    createActiveSlider();
    createLeftRightSlide();
    // createLeftSlide();
    // createRightSlide();
};

const createActiveSlider = () => {
    arr.forEach((item) => createCardTemplate(slideActive, pets[item]));
};

let randomArrLeft;
let randomArrRight;
const getRandomArrLeft = () => {
    randomArrLeft = [...arr];
    while (randomArrLeft.length < arr.length * 2) {
        let index = Math.floor(Math.random() * 8);
        if (!randomArrLeft.includes(index)) {
            randomArrLeft.push(index);
        }
    }
    randomArrLeft.splice(0, arr.length);
};

const getRandomArrRight = () => {
    randomArrRight = [...arr];
    while (randomArrRight.length < arr.length * 2) {
        let index = Math.floor(Math.random() * 8);
        if (!randomArrRight.includes(index)) {
            randomArrRight.push(index);
        }
    }
    randomArrRight.splice(0, arr.length);
};

const createLeftRightSlide = () => {
    getRandomArrLeft();
    getRandomArrRight();
    randomArrRight.forEach((item) => {
        createCardTemplate(slideRight, pets[item]);
    });
    randomArrLeft.forEach((item) => {
        createCardTemplate(slideLeft, pets[item]);
    });
};

const moveLeft = () => {
    arr = randomArrLeft;
    carousel.classList.add('transition-left');
    btnLeft.removeEventListener('click', moveLeft);
    btnRight.removeEventListener('click', moveRight);
};

const moveRight = () => {
    arr = randomArrRight;
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
        slideLeft.innerHTML = '';
        slideRight.innerHTML = '';
        createLeftRightSlide();
    } else {
        carousel.classList.remove('transition-right');
        slideActive.innerHTML = slideRight.innerHTML;
        slideLeft.innerHTML = '';
        slideRight.innerHTML = '';
        createLeftRightSlide();
    }

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
