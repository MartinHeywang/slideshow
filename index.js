const home = document.querySelector(".tooling__home");
const previous = document.querySelector(".tooling__prev");
const next = document.querySelector(".tooling__next");

const firstSlide = document.querySelector(".slide:first-of-type");
const lastSlide = document.querySelector(".slide:last-of-type");
const allSlides = Array.from(document.querySelectorAll(".slide"));

let currentSlide = document.querySelector(".slide:not(.slide--hidden)");

const hideSlides = () => allSlides.forEach(slide => slide.classList.add("slide--hidden"));

const goHome = () => {
    hideSlides();
    currentSlide = firstSlide;
    currentSlide.classList.remove("slide--hidden");

    previous.disabled = true;
    next.disabled = false;
};

const goPrevious = () => {
    hideSlides();
    currentSlide = allSlides[allSlides.indexOf(currentSlide) - 1];
    currentSlide.classList.remove("slide--hidden");

    if(currentSlide === firstSlide) previous.disabled = true;
    next.disabled = false;
};

const goNext = () => {
    hideSlides();
    currentSlide = allSlides[allSlides.indexOf(currentSlide) + 1];
    currentSlide.classList.remove("slide--hidden");

    if(currentSlide === lastSlide) next.disabled = true;
    previous.disabled = false;
};

home.addEventListener("click", goHome);
previous.addEventListener("click", goPrevious);
next.addEventListener("click", goNext);