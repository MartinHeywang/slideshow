const home = document.querySelector(".tooling__home");
const previous = document.querySelector(".tooling__prev");
const next = document.querySelector(".tooling__next");
const settings = document.querySelector(".tooling__settings");
const progress = document.querySelector(".tooling__progress");
const presentationModeCheckbox = document.querySelector("#settings-presentation-mode-checkbox");

const modes = {
    presentation: {
        enabled: localStorage.getItem("modes.presentation.enabled") === "true" ? true : false,
    },
};

const getListedSlides = () => {
    const selector = `
        .slide${""
        }:not(.slide--unlisted)${""
        }${modes.presentation.enabled ? ":not(.slide--presentation-skip)" : ""}
    `;
    return Array.from(document.querySelectorAll(selector));
};

const slides = Array.from(document.querySelectorAll(".slide"));
let listedSlides = getListedSlides();
const firstSlide = listedSlides[0];
const lastSlide = listedSlides[listedSlides.length - 1];

let currentSlide = document.querySelector(".slide:target");
let slideHistory = [];

const onSlideChange = () => {
    console.log(`new hash: ${location.hash}`);
    slideHistory.push(currentSlide);
    currentSlide = document.querySelector(".slide:target");
    if(location.hash === "") return location.hash = "#/";
    if(!slides.some(slide => `#${slide.id}` === location.hash)) return location.hash = "#/unlisted/not-found";

    updateProgress();

    if (currentSlide.classList.contains("slide--unlisted")) {
        previous.disabled = true;
        next.disabled = true;
        return;
    } else if (!listedSlides.includes(currentSlide)) {
        location.hash = "#/";
    }

    previous.disabled = false;
    next.disabled = false;
    if (currentSlide === firstSlide) previous.disabled = true;
    if (currentSlide === lastSlide) next.disabled = true;
};

const updateProgress = () => {
    if (!listedSlides.includes(currentSlide)) {
        progress.textContent = "";
        return;
    }

    const current = listedSlides.indexOf(currentSlide) + 1;
    const count = listedSlides.length;

    progress.textContent = `${current.toString().padStart(2, "0")}/${count}`;
};

const goHome = () => (location.hash = "#/");

const goPrevious = () => {
    const previousSlide = listedSlides[listedSlides.indexOf(currentSlide) - 1];
    location.hash = previousSlide.id;
};

const goNext = () => {
    const nextSlide = listedSlides[listedSlides.indexOf(currentSlide) + 1];
    location.hash = nextSlide.id;
};

const goBack = () => {
    if (slideHistory.length < 1) return (location.hash = "#/");
    location.hash = slideHistory[slideHistory.length - 1].id;
    slideHistory.pop();
};

const goSettings = () => {
    location.hash = "#/unlisted/settings";
};

const copyLink = () => {
    navigator.clipboard.writeText("https://martinheywang.github.io/slideshow-log4j-vulnerability");
};

const onPresentationModeChange = event => {
    modes.presentation.enabled = event.target.checked;
    localStorage.setItem("modes.presentation.enabled", modes.presentation.enabled);

    listedSlides = getListedSlides();
};

const init = () => {
    window.addEventListener("hashchange", onSlideChange);

    home.addEventListener("click", goHome);
    previous.addEventListener("click", goPrevious);
    next.addEventListener("click", goNext);
    settings.addEventListener("click", goSettings);

    presentationModeCheckbox.checked = modes.presentation.enabled;
    presentationModeCheckbox.addEventListener("change", onPresentationModeChange);

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

/* UTILS */

function isEnterKey(event) {
    if (event.key === "Enter") return true;
    return false;
}

function fakeClick(selector) {
    const element = document.querySelector(selector);
    element.click();
}
