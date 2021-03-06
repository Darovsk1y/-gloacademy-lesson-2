const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

let cartButton = document.querySelector('.button-cart');
let modalCart = document.querySelector('#modal-cart');
let modalClose = document.querySelector('.modal-close');

function openModal() {
	modalCart.classList.add('show');
}
function closeModal() {
	modalCart.classList.remove('show');
}

cartButton.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

(function () {

	let scrollLinks = document.querySelectorAll('a.scroll-link');
	for (let i = 0; i < scrollLinks.length; i++) {
		scrollLinks[i].addEventListener('click', function(e){
			e.preventDefault();
			const id = this.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		});
	}
}) ()

// Lesson 2

const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async function() {
	const result = await fetch('db/db.json');
	if (!result.ok){
		throw 'Ошибочка вышла:' + result.status
	}
	return result.json();
}

const createCard = function(objCard) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	console.log(objCard)
	card.innerHTML = `
					<div class="goods-card">
					${objCard.label ? 
						`<span class="label">${objCard.label}</span>` :
						 ''}
						<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
						<h3 class="goods-title">${objCard.name}</h3>
						<p class="goods-description">${objCard.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id=${objCard.id}>
							<span class="button-price">${objCard.price}</span>
						</button>
					</div>
	`;
	return card;
}
const renderCards = function(data) {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	cards.forEach(function (card){
		longGoodsList.append(card)
	});
	document.body.classList.add('show-goods');
};

more.addEventListener('click', function(event) {
	event.preventDefault;

	document.querySelector('.header').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	});
	getGoods().then(renderCards);
});

const filterCards = function(field, value) {
	getGoods().then(function(data) {
		const filteredGoods = data.filter(function(good) {
			return good[field] === value
		});
		return filteredGoods;
	})
	.then(renderCards);
};

navigationLink.forEach(function(link){
	link.addEventListener('click', function(event){
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	})
});