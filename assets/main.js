const globals = {
	n: 4,
	current: 0,
	previous: 3,
	next: 1,
};

const utils = {
	carouselStepRight: () => {
		globals.previous = globals.current;
		globals.current = globals.next;
		globals.next = (globals.next + 1) % globals.n;
	},
	carouselStepLeft: () => {
		globals.next = globals.current;
		globals.current = globals.previous;
		globals.previous = (globals.n + globals.previous - 1) % globals.n;
	},
};

/*function smoothScroll(e, width, direction, step = 10, delay = 2) {
	let scroll = 0;
	const timer = setInterval(() => {
		scroll += direction * step;
		if (scroll > width) {
			window.clearInterval(timer);
			return;
		}
		e.scrollLeft += direction * step;
	}, delay);
}*/

function carouselMove(e, stepFn) {
	stepFn();
	const current = document.getElementById(`slide-${globals.current}`);
	const hscroll = current.offsetWidth * globals.current;
	const carouselContainer = document.getElementById("carousel-container");
	carouselContainer.scrollTo({
		top: 0,
		left: hscroll,
	});
}

function attachEventListeners() {
	const carouselRight = document.getElementById("carousel-next");
	const carouselLeft = document.getElementById("carousel-previous");
	carouselRight.addEventListener("click", (e) => { carouselMove(e, utils.carouselStepRight); });
	carouselLeft.addEventListener("click", (e) => { carouselMove(e, utils.carouselStepLeft); });
}

function onLoad() {
	attachEventListeners();
}

window.addEventListener("load", onLoad);
