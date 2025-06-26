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
