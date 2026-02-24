
// Doc done scripts
document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll when link clicked
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 100
		}, 800);
		return false;
	});

	// Phone mask
	function maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elems = document.querySelectorAll(selector);
	
		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			console.log(template);
			let i = 0,
				newValue = template.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = newValue.indexOf("_");
			if (i !== -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}";
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type === "blur" && this.value.length < 5) {
				this.value = "";
			}
	
		}
	
		for (const elem of elems) {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		}
		
	}
		
	maskPhone('input[type="tel"]')

	// TEXT INPUT VALIDATE
	document.querySelectorAll('input[name="name"]').forEach(input => {
		input.addEventListener('keydown', function(e){
		  if( e.key.match(/[0-9]/) ) return e.preventDefault();
		}); 
		
		input.addEventListener('input', function(e){
		  input.value = input.value.replace(/[0-9]/g, "");
		});
	})

	// FIXED HEADER ON SCROLL
	document.addEventListener('scroll', e => {
		if(!document.querySelector('header').classList.contains('custom')) {
			if (this.pageYOffset > 10) {
				document.querySelector('header').classList.add('fixed')
			} else {
				document.querySelector('header').classList.remove('fixed')
			}
		}
	})
	
	// MODAL NAV
	document.querySelector('.burger').addEventListener('click', e => {
		e.preventDefault()
		if (!e.target.closest('.burger').classList.contains('active')) {
			e.target.closest('.burger').classList.add('active')
			document.querySelector('.modal__nav').classList.add('active')
			document.querySelector('.modal__nav').classList.add('visible')
			document.querySelector('body').classList.add('hidden')
			document.querySelector('header').classList.add('nav__active')
		} else {
			e.target.closest('.burger').classList.remove('active')
			document.querySelector('.modal__nav').classList.remove('active')
			document.querySelector('.modal__nav').classList.remove('visible')
			document.querySelector('body').classList.remove('hidden')
			document.querySelector('header').classList.remove('nav__active')
		}
	})

	// SHOW/HIDE MODAL
	function showModal(item, modal) {
		document.querySelectorAll(item).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault()
				document.querySelector(modal).classList.add('active')
				document.querySelector('body').classList.add('hidden')
			})
		})
	}

	function hideModal(item, modal) {
		document.querySelectorAll(item).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault()
				document.querySelector(modal).classList.remove('active')
				document.querySelector('body').classList.remove('hidden')
			})
		})
	}

	showModal('.open__call', '.modal__call')
	hideModal('.modal__call .modal__overlay', '.modal__call')
	hideModal('.modal__call .modal__close', '.modal__call')


	// EXP MODAL
	const slidesExp = document.querySelectorAll('.exp__item');
	const modalExp = document.querySelector('.modal__exp');

	const modalExpTitle = modalExp.querySelector('.modal__exp__header .title');
	const modalExpDate = modalExp.querySelector('.modal__exp__header .text');
	const modalExpContent = modalExp.querySelector('.modal__exp__content');

	slidesExp.forEach(slide => {
		slide.addEventListener('click', e => {
			e.preventDefault();

			const hidden = slide.querySelector('.exp__hiddden');
			if (!hidden) return;

			const title = hidden.querySelector('.title')?.innerHTML || '';
			const date = hidden.querySelector('.date')?.innerHTML || '';
			const content = hidden.querySelector('.text')?.innerHTML || '';

			// Записываем данные в модалку
			modalExpTitle.innerHTML = title;
			modalExpDate.innerHTML = date;
			modalExpContent.innerHTML = content;
		});
	});

	// REVIEWS MODAL
	const MAX_LENGTH = 200;

	const modalReviews = document.querySelector('.modal__reviews');
	const modalReviewsPhoto = modalReviews.querySelector('.reviews__item__photo');
	const modalReviewsName = modalReviews.querySelector('.reviews__item__header .title');
	const modalReviewsRole = modalReviews.querySelector('.reviews__item__header .text');
	const modalReviewsContent = modalReviews.querySelector('.reviews__item__content');

	// Обрезка текста отзывов
	document.querySelectorAll('.reviews__item').forEach(item => {
		const textEl = item.querySelector('.reviews__item__content .text');
		const moreBtn = item.querySelector('.more');

		if (!textEl) return;

		const fullText = textEl.innerText.trim();
		item.dataset.fullText = fullText;

		if (fullText.length > MAX_LENGTH) {
			textEl.innerText = fullText.slice(0, MAX_LENGTH).trim() + '…';
			if (moreBtn) moreBtn.style.display = 'flex';
		} else {
			if (moreBtn) moreBtn.style.display = 'none';
		}
	});

	// Делегирование клика по "Показать полностью"
	document.addEventListener('click', e => {
		const moreBtn = e.target.closest('.reviews__item .more');
		if (!moreBtn) return;

		e.preventDefault();

		const item = moreBtn.closest('.reviews__item');

		const photoSrc = item.querySelector('.reviews__item__photo')?.src || '';
		const name = item.querySelector('.reviews__item__header .title')?.innerText || '';
		const role = item.querySelector('.reviews__item__header .text')?.innerText || '';
		const fullText = item.dataset.fullText || '';

		// Заполняем модалку
		modalReviewsPhoto.src = photoSrc;
		modalReviewsPhoto.alt = name;
		modalReviewsName.innerText = name;
		modalReviewsRole.innerText = role;
		modalReviewsContent.innerHTML = `<p class="text">${fullText}</p>`;
	});

	// SERVICE MODAL
	
	const modalService = document.querySelector('.modal__call')
	const titleMain = modalService.querySelector('.modal__call__form .title.fz24');
	const titleSub = modalService.querySelector('.modal__call__form .title.fz18');

	const hiddenServiceInput = modalService.querySelector('input[name="service"]');
	const selectService = modalService.querySelector('select[name="service"]');

	document.addEventListener('click', e => {
		const btn = e.target.closest('.service__btn');
		if (!btn) return;

		e.preventDefault();

		const serviceName = btn.dataset.service || '';

		// Меняем заголовки
		titleMain.textContent = 'Заказать консультацию';
		titleSub.textContent = `Выбранная услуга: ${serviceName}`;

		// Прокидываем услугу в скрытое поле
		if (hiddenServiceInput) {
			hiddenServiceInput.value = serviceName;
		}

		// Пытаемся выбрать услугу в select (если совпадает option)
		if (selectService) {
			const url = window.location.href;
		
			if (url.includes('juridical')) {
				selectService.value = 'Юридические услуги';
			} else if (url.includes('financial')) {
				selectService.value = 'Финансовые услуги';
			} else {
				selectService.selectedIndex = 0;
			}
		}
	});

	const faqItems = document.querySelectorAll('.accordeon')

	function accordeon(elements, button, parent, body, inner) {
		document.querySelectorAll(button).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault()
				if (!e.target.closest(parent).classList.contains('active')) {
					elements.forEach(item => {
						item.classList.remove('active')
						item.querySelector(body).style.height = '0px'
					})
					e.target.closest(parent).classList.add('active')
					e.target.closest(parent).querySelector(body).style.height = e.target.closest(parent).querySelector(inner).offsetHeight + 'px'
				} else {
					elements.forEach(item => {
						item.classList.remove('active')
						item.querySelector(body).style.height = '0px'
					})
				}
			})
		})
	}
	
	// accordeon(faqItems, '.accordeon__header', '.accordeon', '.accordeon__body', '.accordeon__body__inner')

})


