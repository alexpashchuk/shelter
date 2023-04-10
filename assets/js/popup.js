const response = await fetch('../../assets/data/pets.json');
const pets = await response.json();

const sliderCarousel = document.querySelector('.slider-carousel');
const modal = document.querySelector('.modal');
const modalButton = modal.querySelector('.modal-button');
const modalContent = modal.querySelector('.modal-content');
const mask = document.querySelector('.mask');
const html = document.querySelector('html');

sliderCarousel.addEventListener('click', (event) => {
    if (event.target.closest('.card-pets')) {
        // let dataName = event.target.closest('.card-pets').dataset.name;
        let itemPets = pets.find((item) => item.name === event.target.closest('.card-pets').dataset.name);
        createModal(itemPets);
        mask.classList.add('mask-active');
        html.classList.add('lock');
    }
});

const createModal = (itemPets) => {
    const { img, name, type, breed, description, age, inoculations, diseases, parasites } = itemPets || {};

    modalContent.insertAdjacentHTML(
        'beforeend',
        `	
		<img src="${img}" alt="${type} ${name}" >
		<div class="modal-info">
			<h3 class="modal-title">${name}</h3>
			<h4 class="modal-subtitle">${type} - ${breed}</h4>
			<h5 class="modal-description">${description}</h5>
			<ul class="modal-list">
				<li class="modal-item">Age:<span class="modal-item-text"> ${age}</span></li>
				<li class="modal-item">Inoculations:<span class="modal-item-text"> ${inoculations}</span> </li>
				<li class="modal-item">Diseases:<span class="modal-item-text"> ${diseases}</span> </li>
				<li class="modal-item">Parasites:<span class="modal-item-text"> ${parasites}</span> </li>
			</ul>
		</div>	
	`
    );
    modal.classList.add('modal-active');
};

const closeModal = () => {
    modal.classList.remove('modal-active');
    html.classList.remove('lock');
    mask.classList.remove('mask-active');
    modalContent.innerHTML = '';
};

modalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});
