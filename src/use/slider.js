"use srict";


const carousel_container = document.querySelector(".carousel_container");
const all_card = document.querySelectorAll(".carousel_container > div");

const btn_next = document.querySelector(".btn_next");
const btn_previous = document.querySelector(".btn_previous");
const complete_absence_on_the_page = document.querySelector(
    ".complete_absence_on_the_page"
);

let n = 0;
let p = Math.round(all_card.length - 1);
btn_next.addEventListener("click", function (e) {
    n++;
    p--;
    carousel_container.setAttribute(
        "style",
        `transform: translateX(-${790 * n}px);`
    );

    if (n > 0) {
        btn_previous.classList.remove("complete_absence_on_the_page");
    }

    if (p == 0) {
        btn_next.classList.add("complete_absence_on_the_page");
    }
});

btn_previous.addEventListener("click", function (e) {
    p++;
    n--;
    carousel_container.setAttribute(
        "style",
        `transform: translateX(-${790 * n}px);`
    );

    if (p > 0) {
        btn_next.classList.remove("complete_absence_on_the_page");
    }

    if (n == 0) {
        btn_previous.classList.add("complete_absence_on_the_page");
    }
});