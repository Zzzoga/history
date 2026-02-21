var teamSlidder = new Swiper(".team__slider.swiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	freeMode: false,
	navigation: {
		nextEl: "section.team .arrow.next",
		prevEl: "section.team .arrow.prev",
	},
	breakpoints: {
		540: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
	},
});

var reviewsSlidder = new Swiper(".partners__slider.swiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	freeMode: false,
	breakpoints: {
		600: {
			slidesPerView: 2,
			spaceBetween: 12,
		},
		820: {
			slidesPerView: 3,
			spaceBetween: 14,
		},
		1024: {
			slidesPerView: 4,
			spaceBetween: 16,
		},
		1440: {
			slidesPerView: 5,
			spaceBetween: 20,
		},
	},
	pagination: {
		el: ".partners__slider__nav",
	}
});

var reviewsSlidder = new Swiper(".exp__slider.swiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	freeMode: false,
	navigation: {
		nextEl: "section.exp .arrow.next",
		prevEl: "section.exp .arrow.prev",
	},
	breakpoints: {
		540: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
	},
});

var reviewsSlidder = new Swiper(".cert__slider.swiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	freeMode: false,
	navigation: {
		nextEl: "section.cert .arrow.next",
		prevEl: "section.cert .arrow.prev",
	},
	breakpoints: {
		540: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
	},
});

/* ===== SMALL SLIDER ===== */
const smallSlider = new Swiper('.small__gallery', {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: false,
	watchSlidesProgress: true,
	slideToClickedSlide: true,
	breakpoints: {
		540: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
	},
});

/* ===== BIG SLIDER ===== */
const bigSlider = new Swiper('.big__gallery', {
	slidesPerView: 1,
	loop: false,
	speed: 600,
	navigation: {
		nextEl: '.big__gallery__wrapper .arrow.next',
		prevEl: '.big__gallery__wrapper .arrow.prev',
	},
	thumbs: {
		swiper: smallSlider,
	},
});

/* ===== SYNCHRONIZATION (double safety) ===== */
bigSlider.on('slideChange', () => {
	smallSlider.slideTo(bigSlider.activeIndex);
});
smallSlider.on('click', () => {
	if(typeof smallSlider.clickedIndex !== 'undefined') {
		bigSlider.slideTo(smallSlider.clickedIndex);
	}
});

/* ===== FANCYBOX ===== */
Fancybox.bind('.big__gallery__item a', {
	Thumbs: false,
	Toolbar: {
		display: ["close"]
	}
});

if(document.documentElement.clientWidth <= 540) {
	var benefitsSlider = new Swiper(".benefits .swiper", {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true,
		freeMode: false,
		pagination: {
			el: ".benefits__nav",
		}
	});
}

// CERT
Fancybox.bind('[data-fancybox="certs"]', {
	Toolbar: {
		display: [
			"close"
		]
	},
	Image: {
		zoom: true,
	},
	animated: true,
});

// COMPANY SLIDER
const timelineItems = document.querySelectorAll('.time__line__item');

const companySlider = new Swiper('.company__slider', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: false,
	speed: 600,
	allowTouchMove: true,

	navigation: {
		nextEl: '.company__slider__wrapper .arrow.next',
		prevEl: '.company__slider__wrapper .arrow.prev',
	},

	on: {
		init(swiper) {
			updateTimeline(swiper.activeIndex);
		},
		slideChange(swiper) {
			updateTimeline(swiper.activeIndex);
		}
	}
});

function updateTimeline(activeIndex) {
	timelineItems.forEach((item, index) => {
		item.classList.toggle('active', index === activeIndex);
	});
}

// Клик по годам (дополнительно, логично и удобно)
timelineItems.forEach((item, index) => {
	item.addEventListener('click', () => {
		companySlider.slideTo(index);
	});
});