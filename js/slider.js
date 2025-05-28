const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
const totalSlides = slides.length;

// Move to the current slide using transform
function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Show next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
}

// Show previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

// Auto slide every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// Reset timer when user interacts
function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

// Event listeners
next.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

prev.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});

// Initialize position
updateSlidePosition();
