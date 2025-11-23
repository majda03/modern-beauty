// reveal.js – lagano pojavljivanje slika pri scrollu

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".grid img");

    // sve slike kreću sakrivene (CSS će odraditi vizualni dio)
    items.forEach(img => {
        img.classList.add("will-reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    // ako ne želiš da nestaju kad se scrolla nazad gore:
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    items.forEach(img => observer.observe(img));
});
