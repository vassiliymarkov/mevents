"use strict"

// USER SYSTEM AND BROWSER CHECK
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

// BODY CLASS CHANGE FOR MOBILE DEVICES
if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menuArrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else {
	document.body.classList.add('_pc');
}

// ACTIVE MENU LINK DECORATION
let activeLinks = document.querySelectorAll(".menuLink");

for (let i = 0; i < activeLinks.length; i++) {
  activeLinks[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    this.className += " active";
  });
} 

// BURGER MENU
const iconMenu = document.querySelector('.menuIcon');
const menuBody = document.querySelector('.menuBody');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


// SMOOTH SCROLLING WHEN CLICKING THE MENU LINK
const menuLinks = document.querySelectorAll('.menuLink[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.menuContainer').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// FIRST SCREEN GALLERY
initImg('#firstScreen img', [
	'img/intro_01.webp', 
	'img/intro_02.webp', 
	'img/intro_03.webp', 
	'img/intro_04.webp', 
	'img/intro_05.webp'
  ]); 
  
  function initImg(selector, srcArr) {
	const img = document.querySelector(selector); 
	Object.assign(img, {
	  buf: Object.assign(new Image(), { img }), 
	  srcArr: [...srcArr], 
	  changeInterval: 5e3,
	  bufIdx: 0,
	  change: function () {
		this.style.animationName = 'img-in'; 
		this.src = this.buf.src || this.nextImage(); 
		this.buf.src = this.nextImage(); 
	  }, 
	  nextImage: function () {
		this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
		return this.srcArr[this.bufIdx];
	  }
	}); 
	img.buf.addEventListener('load', loadHandler); 
	img.addEventListener('animationend', animEndHandler); 
	img.change(); 
	return img; 
  
	function loadHandler() {
	  setTimeout(
		() => this.img.style.animationName = 'img-out', 
		this.img.changeInterval 
	  ); 
	}
	function animEndHandler({ animationName }) {
	  if (animationName === 'img-out') 
		this.change(); 
	}
  }

// RECTANGLE APPEARENCE
window.addEventListener('load', function() {
    const container = document.querySelector('.container');
    setTimeout(() => {
		container.classList.add('show');
    }, 1000);
  });