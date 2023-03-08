const carousel = (obj) => {
	// Define variable
	let startX;
	let IsMouseDown,carouselOffset=0;
	const carousel = document.querySelector('.carousel');
	const wrapper = carousel.querySelector('.wrapper');
	const wrapperImg = carousel.querySelector('.wrapper_img');
	

	// Init param from object
	carousel.style.width = `calc( ${obj.width}px + (${obj.padding}px * ${obj.elements} * 2))`;
	document.querySelector(':root').style.setProperty("--padding-carousel-wrapper_img",obj.padding);
	document.querySelector(':root').style.setProperty("--width-carousel-wrapper_img-img",obj.width / obj.elements);
	document.querySelector(':root').style.setProperty("--height-carousel-wrapper_img-img",wrapperImg.querySelector('img').height);
	const imageWidth = wrapperImg.offsetWidth;

	// Event for press mouse button
	carousel.addEventListener('mousedown', (e) => {
		IsMouseDown = true;
		startX = (e.clientX - carousel.offsetLeft);
	});

	// Event for slider right/left
	carousel.addEventListener('mousemove', (e) => {
		if(IsMouseDown){
			const endX = (e.clientX - carousel.offsetLeft);
			const diff = endX - startX;
			wrapper.style.left = carouselOffset + diff;
			wrapper.style.transition = "0s";
		}
	});

	// Method to move carousel right and left
	var MoveCarousel = (e) => {
		
		const endX = (e.clientX - carousel.offsetLeft);
		const diff = endX - startX;
		if( diff > 0 && carouselOffset < 0) 
			carouselOffset += carousel.offsetWidth;
		else if( diff < 0 && carouselOffset > -(wrapper.offsetWidth - (imageWidth * obj.elements)))
			carouselOffset -= carousel.offsetWidth;
		if (IsMouseDown) {
			wrapper.style.left = carouselOffset;
			wrapper.style.transition = "1s";
			IsMouseDown = false;
		}
	};

	// Event for unpress mouse button
	carousel.addEventListener('mouseup', MoveCarousel, false);
	carousel.addEventListener('mouseout', MoveCarousel, false);
}