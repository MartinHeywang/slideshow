const home = document.querySelector(".tooling__home");
const previous = document.querySelector(".tooling__prev");
const next = document.querySelector(".tooling__next");
const copy = document.querySelector(".tooling__copy");
const progress = document.querySelector(".tooling__progress");

const firstSlide = document.querySelector(".slide:first-of-type");
const lastSlide = document.querySelector(".slide:last-of-type");
const allSlides = Array.from(document.querySelectorAll(".slide"));

let currentSlide = document.querySelector(".slide:target");

const update = () => {
    currentSlide = document.querySelector(".slide:target");

    updateProgress();

    previous.disabled = false;
    next.disabled = false;
    if (currentSlide === firstSlide) previous.disabled = true;
    if (currentSlide === lastSlide) next.disabled = true;
};

const updateProgress = () => {
    const current = allSlides.indexOf(currentSlide) + 1;
    const count = allSlides.length;

    progress.textContent = `${current.toString().padStart(1, "0")}/${count}`;
};

const goHome = () => (location.hash = "#home");

const goPrevious = () => {
    const previousSlide = allSlides[allSlides.indexOf(currentSlide) - 1];
    location.hash = previousSlide.id;

    if (currentSlide === firstSlide) previous.disabled = true;
    next.disabled = false;

    updateProgress();
};

const goNext = () => {
    const nextSlide = allSlides[allSlides.indexOf(currentSlide) + 1];
    location.hash = nextSlide.id;

    if (currentSlide === lastSlide) next.disabled = true;
    previous.disabled = false;

    updateProgress();
};

const copyLink = () => {
    navigator.clipboard.writeText(location.href);

    copy.classList.add("tooling__copy--copied");
    setTimeout(() => {
        copy.classList.remove("tooling__copy--copied");
    }, 2000)
};

const init = () => {
    window.addEventListener("hashchange", update);

    home.addEventListener("click", goHome);
    previous.addEventListener("click", goPrevious);
    next.addEventListener("click", goNext);
    copy.addEventListener("click", copyLink);

    document.addEventListener("keydown", event => {
        const bindings = {
            Home: () => goHome(),
            ArrowLeft: () => !previous.disabled && goPrevious(),
            ArrowRight: () => !next.disabled && goNext(),
        };

        bindings[event.key]?.();
    });
    
    update();
};
init();

if (location.hash === "") location.hash = "#home";
