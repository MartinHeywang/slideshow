const home = document.querySelector(".tooling__home");
const previous = document.querySelector(".tooling__prev");
const next = document.querySelector(".tooling__next");
const settings = document.querySelector(".tooling__settings");
const progress = document.querySelector(".tooling__progress");

const firstSlide = document.querySelector(".slide:first-of-type");
const lastSlide = document.querySelector(".slide:last-of-type");
const allSlides = Array.from(document.querySelectorAll(".slide"));
const allListedSlides = Array.from(document.querySelectorAll(".slide:not(.slide--unlisted)"));

let currentSlide = document.querySelector(".slide:target");
let slideHistory = [];

const onSlideChange = () => {
    slideHistory.push(currentSlide);
    currentSlide = document.querySelector(".slide:target");

    updateProgress();

    if(!allListedSlides.includes(currentSlide)) {
        previous.disabled = true;
        next.disabled = true;
        return;
    }

    previous.disabled = false;
    next.disabled = false;
    if (currentSlide === firstSlide) previous.disabled = true;
    if (currentSlide === lastSlide) next.disabled = true;
};

const updateProgress = () => {
    if(!allListedSlides.includes(currentSlide)) {
        progress.textContent = "";
        return;
    }

    const current = allListedSlides.indexOf(currentSlide) + 1;
    const count = allListedSlides.length;

    progress.textContent = `${current.toString().padStart(2, "0")}/${count}`;
};

const goHome = () => (location.hash = "#home");

const goPrevious = () => {
    const previousSlide = allListedSlides[allListedSlides.indexOf(currentSlide) - 1];
    location.hash = previousSlide.id;
};

const goNext = () => {
    const nextSlide = allListedSlides[allListedSlides.indexOf(currentSlide) + 1];
    location.hash = nextSlide.id;
};

const goBack = () => {
    if(slideHistory.length < 1) return location.hash = "#home";
    location.hash = slideHistory[slideHistory.length - 1].id;
    slideHistory.pop();
}

const goSettings = () => {
    location.hash = "#settings";
}

const copyLink = () => {
    navigator.clipboard.writeText("https://martinheywang.github.io/slideshow-log4j-vulnerability");
};

const init = () => {
    window.addEventListener("hashchange", onSlideChange);

    home.addEventListener("click", goHome);
    previous.addEventListener("click", goPrevious);
    next.addEventListener("click", goNext);
    settings.addEventListener("click", goSettings);

    document.addEventListener("keydown", event => {
        const bindings = {
            Home: () => goHome(),
            ArrowLeft: () => !previous.disabled && goPrevious(),
            ArrowRight: () => !next.disabled && goNext(),
        };

        bindings[event.key]?.();
    });
    
    onSlideChange();
};
init();

if (location.hash === "") location.hash = "#home";
