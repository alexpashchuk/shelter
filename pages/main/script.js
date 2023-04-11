const carousel = document.querySelector('.slider-carousel');
const slideLeft = document.querySelector('#slide-left');
const slideActive = document.querySelector('#slide-active');
const slideRight = document.querySelector('#slide-right');
const btnLeft = document.querySelector('#slider-btn-left');
const btnRight = document.querySelector('#slider-btn-right');

// const response = await fetch('../../assets/data/pets.json');
// const pets = await response.json();

const pets = [
    {
        name: 'Jennifer',
        img: '../../assets/images/jennifer.png',
        type: 'Dog',
        breed: 'Labrador',
        description:
            "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        age: '2 months',
        inoculations: ['none'],
        diseases: ['none'],
        parasites: ['none']
    },
    {
        name: 'Sophia',
        img: '../../assets/images/sophia.png',
        type: 'Dog',
        breed: 'Shih tzu',
        description:
            "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        age: '1 month',
        inoculations: ['parvovirus'],
        diseases: ['none'],
        parasites: ['none']
    },
    {
        name: 'Woody',
        img: '../../assets/images/woody.png',
        type: 'Dog',
        breed: 'Golden Retriever',
        description:
            'Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.',
        age: '3 years 6 months',
        inoculations: ['adenovirus', 'distemper'],
        diseases: ['right back leg mobility reduced'],
        parasites: ['none']
    },
    {
        name: 'Scarlett',
        img: '../../assets/images/scarlett.png',
        type: 'Dog',
        breed: 'Jack Russell Terrier',
        description:
            'Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.',
        age: '3 months',
        inoculations: ['parainfluenza'],
        diseases: ['none'],
        parasites: ['none']
    },
    {
        name: 'Katrine',
        img: '../../assets/images/katrine.png',
        type: 'Cat',
        breed: 'British Shorthair',
        description:
            'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.',
        age: '6 months',
        inoculations: ['panleukopenia'],
        diseases: ['none'],
        parasites: ['none']
    },
    {
        name: 'Timmy',
        img: '../../assets/images/timmy.png',
        type: 'Cat',
        breed: 'British Shorthair',
        description:
            'Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.',
        age: '2 years 3 months',
        inoculations: ['calicivirus', 'viral rhinotracheitis'],
        diseases: ['kidney stones'],
        parasites: ['none']
    },
    {
        name: 'Freddie',
        img: '../../assets/images/freddie.png',
        type: 'Cat',
        breed: 'British Shorthair',
        description:
            'Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.',
        age: '2 months',
        inoculations: ['rabies'],
        diseases: ['none'],
        parasites: ['none']
    },
    {
        name: 'Charly',
        img: '../../assets/images/charly.png',
        type: 'Dog',
        breed: 'Jack Russell Terrier',
        description:
            'This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.',
        age: '8 years',
        inoculations: ['bordetella bronchiseptica', 'leptospirosis'],
        diseases: ['deafness', 'blindness'],
        parasites: ['lice', 'fleas']
    }
];

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
