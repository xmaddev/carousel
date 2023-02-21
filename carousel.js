const carousel = (obj) => {
	// Define variable
	let startX,diff;
	let IsMouseDown,carouselOffset=0;
	const carousel = document.querySelector('.carousel');
	const wrapper = carousel.querySelector('.wrapper');
	const wrapperImg = carousel.querySelector('.wrapper_img');
	const imageWidth = wrapperImg.offsetWidth;

	// Init param from object
	carousel.style.width = `calc( ${obj.width}px + (${obj.padding}px * ${obj.elements} * 2))`;
	document.documentElement.style.setProperty("--padding-carousel-wrapper_img",obj.padding);

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

	// Event for unpress mouse button
	carousel.addEventListener('mouseup', (e) => {
		IsMouseDown = false;
		const endX = (e.clientX - carousel.offsetLeft);
		const diff = endX - startX;
		if( diff > 0 && carouselOffset < 0) 
			carouselOffset += carousel.offsetWidth;
		else if( diff < 0 && carouselOffset > -(wrapper.clientWidth - (obj.elements * imageWidth))) 
			carouselOffset -= carousel.offsetWidth;
		
		wrapper.style.left = carouselOffset;
		wrapper.style.transition = "1s";
	});
}