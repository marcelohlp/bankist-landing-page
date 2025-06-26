"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const sectionOne = document.getElementById("section--1");

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btnOpen) => btnOpen.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

btnScrollTo.addEventListener("click", (event) => {
    // Old method
    // const sectionOneCoords = sectionOne.getBoundingClientRect(); // => Gets the exact position and size of the element relative to the viewport.
    // window.scrollTo({
    //     left: sectionOneCoords.left + window.scrollx,
    //     top: sectionOneCoords.top + window.scrollY,
    //     behavior: "smooth",
    // });

    sectionOne.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll(".nav__link").forEach((link) => {
//     link.addEventListener("click", (event) => {
//         event.preventDefault();
//         const id = link.getAttribute("href");
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     });
// });

// The previous methodology works well, although it creates many DOM elements using the "forEach" method. In this case, a better approach that
// achieves the same result is to delegate this functionality using the parent element and selecting the element that is the target of the event.

document.querySelector(".nav__links").addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains("nav__link")) {
        const sectionId = target.getAttribute("href");
        document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
    }
});

// TABBED COMPONENT

const tabsButton = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".operations__tab");
    // The closest method is used to get the nearest button that contains the class ".operations__tab", because the user might click an element
    // inside the button rather than the button itself.

    if (!clickedButton) return; // Nothing happens if no button is selected.

    tabsButton.forEach((button) => button.classList.remove("operations__tab--active"));
    clickedButton.classList.add("operations__tab--active");

    const tabNumber = clickedButton.dataset.tab;

    tabsContent.forEach((content) => content.classList.remove("operations__content--active"));
    document.querySelector(`.operations__content--${tabNumber}`).classList.add("operations__content--active");
});

// MENU FADE ANIMATION

const navigation = document.querySelector(".nav");

// Handler function only accepts one argument: the "event" argument.
function handlerNavigationMouseHover(event) {
    const hoveredElement = event.target;

    if (!hoveredElement.classList.contains("nav__link")) return;

    const siblings = hoveredElement.closest(".nav").querySelectorAll(".nav__link");
    const logo = hoveredElement.closest(".nav").querySelector("img");

    siblings.forEach((element) => {
        if (element !== hoveredElement) element.style.opacity = this.opacity;
    });
    logo.style.opacity = this.opacity;
}

// Using the bind method to pass arguments or an object to a handler function.
// The bind method creates a new function that, when called, has its "this" keyword set to the provided value.
navigation.addEventListener("mouseover", handlerNavigationMouseHover.bind({ opacity: 0.5 }));

navigation.addEventListener("mouseout", handlerNavigationMouseHover.bind({ opacity: 1.0 }));

// STICKY NAVIGATION

// Old method
// const intialCoords = sectionOne.getBoundingClientRect();

// window.addEventListener("scroll", () => {
//     if (window.scrollY > intialCoords.top) navigation.classList.add("sticky");
//     else navigation.classList.remove("sticky");
// });

// Intersection Observer API => Allows you to detect when a target element enters or exits the visible area of the viewport, enabling efficient
// handling of events like lazy loading, animations, or infinite scrolling—without relying on scroll events.

const header = document.querySelector(".header");
const navigationHeight = navigation.getBoundingClientRect().height;

const observerOptions = {
    root: null,
    // => Sets the element used as the viewport for checking visibility of the target. When set to null, the browser viewport is used as the root.
    threshold: 0,
    // => Defines how much of the target element must be visible before the callback is triggered. A value of 0 means any part of the element
    // entering the viewport triggers the observer.
    rootMargin: `-${navigationHeight}px`,
    // => Expands or shrinks the root’s bounding box before checking for intersection. A value like -80px at the top means the target must pass 80px
    // into the viewport before being considered visible. Useful for accounting for fixed headers or early/late triggers.
};

const observerCallback = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) navigation.classList.add("sticky");
    else navigation.classList.remove("sticky");
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(header);

// REVEALLING SECTIONS

const allSections = document.querySelectorAll(".section");

const revealSections = function (entries, observer) {
    entries.forEach((entry) => {
        const target = entry.target;
        if (!entry.isIntersecting) return;
        target.classList.remove("section--hidden");
        observer.unobserve(target);
    });
};

const revealSectionsObject = {
    root: null,
    threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSections, revealSectionsObject);

allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES

const lazyImages = document.querySelectorAll("img[data-src]");

const loadImage = function (entries, observer) {
    entries.forEach((entry) => {
        const target = entry.target;

        if (!entry.isIntersecting) return;

        target.src = target.dataset.src;

        target.addEventListener("load", () => target.classList.remove("lazy-img"));

        observer.unobserve(target);
    });
};

const loadImageObject = {
    root: null,
    threshold: 0.0,
    rootMargin: "200px",
};

const imageObserver = new IntersectionObserver(loadImage, revealSectionsObject);

lazyImages.forEach((image) => imageObserver.observe(image));
