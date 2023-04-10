const paginationRoot = document.querySelector('.our-friends-cards');
const startBtn = document.querySelector('#start');
const prevBtn = document.querySelector('#prev');
const currentBtn = document.querySelector('#current');
const nextBtn = document.querySelector('#next');
const lastBtn = document.querySelector('#end');
const desktop = window.matchMedia('(min-width: 1280px)');
const phone = window.matchMedia('(max-width: 767px)');

const response = await fetch('../../assets/data/pets.json');
const pets = await response.json();

let page = 1;
let countPage = 6;
let cards = 8;
let arr = [];

const getRandomArr = () => {
    arr.push(...pets.slice(0, 6).sort(() => Math.random() - 0.5));
    arr.push(...pets.slice(6).sort(() => Math.random() - 0.5));
    arr.push(...pets.slice(0, 4).sort(() => Math.random() - 0.5));
    arr.push(...pets.slice(4).sort(() => Math.random() - 0.5));
    arr.push(...pets.slice(0, 2).sort(() => Math.random() - 0.5));
    arr.push(...pets.slice(2).sort(() => Math.random() - 0.5));
    arr.push(...arr);
};
getRandomArr();

window.addEventListener('load', () => {
    createPaginationCards(arr);
    resizeCards();
    disableBtn(page);
});

desktop.addEventListener('change', (event) => {
    if (event.matches) {
        // window >= 1280
        // console.log('window >= 1280');
        countPage = 6;
        cards = 8;
        createPaginationCards(arr);
    } else {
        // window < 1280
        // console.log('window < 1280 ');
        countPage = 8;
        cards = 6;
        createPaginationCards(arr);
    }
});

phone.addEventListener('change', (event) => {
    if (event.matches) {
        // window < 768
        // console.log('window < 768');
        countPage = 16;
        cards = 3;
        createPaginationCards(arr);
    } else {
        //  window >= 768
        // console.log('window >= 768 ');
        countPage = 8;
        cards = 6;
        createPaginationCards(arr);
    }
});

const resizeCards = () => {
    if (phone.matches) {
        // window < 768
        // console.log('phone');
        countPage = 16;
        cards = 3;
    } else if (desktop.matches) {
        // window >= 1280
        // console.log('desktop');
        countPage = 6;
        cards = 8;
    } else {
        // 768 <= window < 1280
        // console.log('tablet');
        countPage = 8;
        cards = 6;
    }

    createPaginationCards(arr);
};

startBtn.addEventListener('click', () => {
    page = 1;
    currentBtn.innerText = page;
    createPaginationCards(arr);
    disableBtn(page);
});
prevBtn.addEventListener('click', () => {
    page -= 1;
    currentBtn.innerText = page;
    createPaginationCards(arr);
    disableBtn(page);
});
nextBtn.addEventListener('click', () => {
    page += 1;
    currentBtn.innerText = page;
    createPaginationCards(arr);
    disableBtn(page);
});
lastBtn.addEventListener('click', () => {
    page = countPage;
    currentBtn.innerText = page;
    createPaginationCards(arr);
    disableBtn(page);
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

const createPaginationCards = (arr) => {
    paginationRoot.innerHTML = '';
    let currentArr = arr.slice(cards * page - cards, cards * page);
    currentArr.forEach((_, i) => createCardTemplate(paginationRoot, currentArr[i]));
    disableBtn(page);
};

const disableBtn = (page) => {
    if (page === countPage) {
        lastBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        lastBtn.disabled = false;
        nextBtn.disabled = false;
    }
    if (page === 1) {
        startBtn.disabled = true;
        prevBtn.disabled = true;
    } else {
        startBtn.disabled = false;
        prevBtn.disabled = false;
    }
};
