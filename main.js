'use strict';

document.querySelector('.year').textContent = new Date().getFullYear();


const menu_button = document.querySelector('.header__mobile-nav-btn');

// const header = document.querySelector('.header');
// const bodyEl = document.querySelector('body');
const htmlEl = document.querySelector('html');

// const nav__list = document.querySelector('.nav__list');
// const header__nav = document.querySelector('.header__nav');

const heroSectionEl = document.querySelector('.section-hero');
const headeEl = document.querySelector('.header');




menu_button.addEventListener('click', function (e) {
    // if (!e.target.closest('.header__mobile-nav-btn')) return;
    // const [icon1, icon2] = menu_button.children;
    // icon1.classList.toggle('hide');
    // icon2.classList.toggle('hide');
    htmlEl.classList.toggle('open-menu');
})


//% smooth scrolling can be implemented just in css !!!!
//! DOESN'T work on SAFARI
// ON IPHONES CHROME USES SAFARI UNDER HOOD
// html { scroll-behavior: smooth; }
document.body.addEventListener('click', function (e) {
    // Prevent fast default scrolling
    e.preventDefault();

    console.log(e.target);

    // Mobile navigation: If user clicks between items occasionaly
    if (e.target.classList.contains('nav__list')) return;

    // Mobile navigation: If user clicks outside nav list - hide
    if (e.target.classList.contains('header__nav')) htmlEl.classList.toggle('open-menu');

    // Check if user clicks on <a> with href that starts with "#"
    const clickedLink = e.target.closest('a[href^="#"]');
    const clickedLinkHrefValue = clickedLink?.getAttribute('href');

    console.log(clickedLink);

    if (!clickedLink) return;

    // Move to the top of the page
    if (clickedLinkHrefValue === '#') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return;
    }

    // Else: there is navigation between page sections:

    const scrollToElem = document.querySelector(clickedLinkHrefValue);
    scrollToElem.scrollIntoView({ behavior: 'smooth' });

    // Mobile navigation: Hide nav list 
    if (e.target.closest(".nav__list")) htmlEl.classList.remove('open-menu');
})


const options = {
    root: null,
    treshold: 0,
    // rootMargin: '-6.0rem'
    //! only in px or %
    rootMargin: '-60px'
};

const observer = new IntersectionObserver(function (entries) {
    console.log(entries);
    const [entry] = entries;
    if (!entry.isIntersecting) {
        document.body.classList.add('sticky');
    } else {
        document.body.classList.remove('sticky');
    }
}, options)
observer.observe(heroSectionEl)


// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

