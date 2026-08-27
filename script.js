/* =========================================================
   AI PRODUCTIVITY PLATFORM
   JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (mobileMenu.classList.contains("open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        /* Close menu after clicking a link */

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }


    /* =====================================================
       2. SMOOTH SCROLL
       ===================================================== */

    const allLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    allLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* =====================================================
       3. ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       4. HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.style.background =
                "rgba(7, 9, 20, 0.92)";

            header.style.borderBottomColor =
                "rgba(255,255,255,0.08)";

        } else {

            header.style.background =
                "rgba(7, 9, 20, 0.7)";

            header.style.borderBottomColor =
                "rgba(255,255,255,0.04)";
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       5. TASK CHECKBOX INTERACTION
       ===================================================== */

    const taskItems =
        document.querySelectorAll(".task-item");

    taskItems.forEach(task => {

        const checkbox =
            task.querySelector(".task-check");

        if (!checkbox) return;

        checkbox.addEventListener("click", () => {

            task.classList.toggle("completed");

            const icon =
                checkbox.querySelector("i");

            if (
                task.classList.contains("completed")
            ) {

                if (icon) {
                    icon.classList.remove(
                        "fa-check"
                    );

                    icon.classList.add(
                        "fa-check"
                    );
                }

            }
        });

    });


    /* =====================================================
       6. PRODUCTIVITY SCORE
       ===================================================== */

    const scoreRing =
        document.querySelector(".score-ring");

    if (scoreRing) {

        let score = 87;

        scoreRing.addEventListener(
            "mouseenter",
            () => {

                scoreRing.style.transform =
                    "scale(1.08)";

                scoreRing.style.transition =
                    "0.3s ease";

            }
        );

        scoreRing.addEventListener(
            "mouseleave",
            () => {

                scoreRing.style.transform =
                    "scale(1)";

            }
        );

    }


    /* =====================================================
       7. REVEAL ANIMATIONS
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .step-card, .review-card, .analytics-card"
        );

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       8. STAGGER CARD ANIMATION
       ===================================================== */

    const cardGroups = [
        ".features-grid",
        ".steps-grid",
        ".reviews-grid"
    ];

    cardGroups.forEach(groupSelector => {

        const group =
            document.querySelector(groupSelector);

        if (!group) return;

        const cards =
            group.querySelectorAll(
                ".feature-card, .step-card, .review-card"
            );

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =====================================================
       9. COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            ".stat-box strong"
        );

    function animateCounter(element) {

        const text =
            element.textContent.trim();

        const match =
            text.match(/[\d,.]+/);

        if (!match) return;

        const numericValue =
            parseFloat(
                match[0].replace(/,/g, "")
            );

        if (isNaN(numericValue)) return;

        const suffix =
            text.replace(match[0], "");

        const duration = 1500;

        const startTime =
            performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                numericValue * eased;

            element.textContent =
                Math.floor(currentValue)
                .toLocaleString() +
                suffix;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    numericValue
                    .toLocaleString() +
                    suffix;
            }
        }

        requestAnimationFrame(
            updateCounter
        );
    }


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !entry.target.dataset.animated
                        ) {

                            entry.target.dataset.animated =
                                "true";

                            animateCounter(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.7
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }


    /* =====================================================
       10. DASHBOARD TASKS
       ===================================================== */

    const taskTimes =
        document.querySelectorAll(
            ".task-time"
        );

    taskTimes.forEach(time => {

        time.addEventListener(
            "mouseenter",
            () => {

                time.style.color =
                    "#a78bfa";

            }
        );

        time.addEventListener(
            "mouseleave",
            () => {

                time.style.color =
                    "";

            }
        );

    });


    /* =====================================================
       11. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-button, .secondary-button, .nav-button"
        );

    buttons.forEach(button => {

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement("span");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                const x =
                    event.clientX -
                    rect.left -
                    size / 2;

                const y =
                    event.clientY -
                    rect.top -
                    size / 2;

                ripple.style.position =
                    "absolute";

                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${x}px`;

                ripple.style.top =
                    `${y}px`;

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(255,255,255,0.18)";

                ripple.style.transform =
                    "scale(0)";

                ripple.style.pointerEvents =
                    "none";

                ripple.style.animation =
                    "buttonRipple 0.6s ease-out";

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 650);

            }
        );
    });


    /* =====================================================
       12. ADD RIPPLE ANIMATION
       ===================================================== */

    const rippleStyle =
        document.createElement("style");

    rippleStyle.textContent = `
        @keyframes buttonRipple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(
        rippleStyle
    );


    /* =====================================================
       13. PARALLAX HERO EFFECT
       ===================================================== */

    const dashboard =
        document.querySelector(
            ".dashboard-card"
        );

    if (
        dashboard &&
        window.innerWidth > 900
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (window.innerWidth / 2 -
                    event.clientX) /
                    80;

                const y =
                    (window.innerHeight / 2 -
                    event.clientY) /
                    100;

                dashboard.style.transform =
                    `rotateY(${x - 4}deg)
                     rotateX(${y + 2}deg)`;

            }
        );

    }


    /* =====================================================
       14. ANALYTICS PERIOD BUTTON
       ===================================================== */

    const periodButton =
        document.querySelector(
            ".period-button"
        );

    if (periodButton) {

        periodButton.addEventListener(
            "click",
            () => {

                const periods = [
                    "This week",
                    "This month",
                    "This year"
                ];

                const current =
                    periodButton
                    .querySelector("span");

                if (!current) return;

                const currentIndex =
                    periods.indexOf(
                        current.textContent
                    );

                const nextIndex =
                    (currentIndex + 1) %
                    periods.length;

                current.textContent =
                    periods[nextIndex];

            }
        );

    }


    /* =====================================================
       15. AI INSIGHT
       ===================================================== */

    const aiInsight =
        document.querySelector(
            ".ai-insight"
        );

    if (aiInsight) {

        aiInsight.addEventListener(
            "click",
            () => {

                aiInsight.style.borderColor =
                    "rgba(139,92,246,0.4)";

                aiInsight.style.transform =
                    "translateY(-2px)";

                setTimeout(() => {

                    aiInsight.style.borderColor =
                        "";

                    aiInsight.style.transform =
                        "";

                }, 500);

            }
        );

        aiInsight.style.cursor =
            "pointer";
    }


    /* =====================================================
       16. FEATURE CARD TILT
       ===================================================== */

    const featureCards =
        document.querySelectorAll(
            ".feature-card"
        );

    if (window.innerWidth > 850) {

        featureCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -5;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 5;

                    card.style.transform =
                        `translateY(-9px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       17. CURRENT YEAR
       ===================================================== */

    const yearElement =
        document.querySelector(
            "#current-year"
        );

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       18. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

    console.log(
        "AI Productivity Platform loaded successfully 🚀"
    );

});