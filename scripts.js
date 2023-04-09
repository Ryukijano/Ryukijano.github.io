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
