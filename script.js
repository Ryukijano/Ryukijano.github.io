$(document).ready(function () {
  // Initialize AOS
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: "ease-out-cubic",
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          const hash = this.hash;
          const targetOffsetTop = document.querySelector(hash).offsetTop;
          window.scrollTo({
            top: targetOffsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  });
});