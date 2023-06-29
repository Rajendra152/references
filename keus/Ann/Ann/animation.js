//..........................text transition(Mad)...................................
gsap.registerPlugin(ScrollTrigger);

//..............................section pin....................................
//First section timeline
const tl1 = new TimelineMax({
        scrollTrigger: {
            trigger: ".page-container1",
            start: "top top",
            pin: true,
            scrub: 0.5
        }
    })
    .to(".img-container", { autoAlpha: 1, ease: "power1.in", stagger: 0.6, duration: 2 }, 0)
    .to({}, { duration: 3 });

// Second section timeline
const tl2 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container2",
        start: "top top",
        pin: true,
        scrub: 5,
        ease: Linear.easeNone,
        toggleActions: "play none reverse none",
    }

}).from('.img-front', { y: 150 }, { y: -800 }, { duration: 1 }, 0)
tl2.from(".line1, .line2", { autoAlpha: 0, stagger: 0.05, duration: 2, ease: "Power1.in" });

tl2.to(".line1, .line2", { opacity: 0, ease: "Power1.in" });

tl2.from(".line3, .line4", { autoAlpha: 0, duration: 3, ease: "Power1.in" });

tl2.to(".line3, .line4", { opacity: 0, ease: "Power1.in" });

tl2.from(".line5, .line6", { autoAlpha: 0, duration: 3, ease: "Power1.in" });

tl2.to({}, { duration: 5 });


//third section timeline
const tl3 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container3",
        start: "top top",
        pin: true,
        scrub: true
    }
})



// fourth section timeline
const tl4 = new TimelineMax({
        scrollTrigger: {
            trigger: ".page-container4",
            start: "top top",
            pin: true,
            scrub: 5
        }
    }).from(".line51", { autoAlpha: 0, duration: 6, stagger: 0.5, scale: 1, ease: "Power1.in" })
    .from('.img-front1', { y: 50 }, { y: -800 }, { duration: 1 }, 0)
    .to({}, { duration: 2 })



// fifth section timeline
const tl5 = new TimelineMax({
        scrollTrigger: {
            trigger: ".page-container5",
            start: "top top",
            pin: true,
            scrub: 5
        }
    }).from('.img-front2', { y: 50 }, { y: -800 }, { duration: 1 }, 0)
    .from(".line52", { autoAlpha: 0, duration: 5, stagger: 0.5, scale: 1, ease: "Power1.in" })
    .to({}, { duration: 2 })



// sixth section timeline
const tl6 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container6",
        start: "top top",
        pin: true,
        scrub: 5
    }
}) //.from(".line6", { autoAlpha: 0, duration: 2, stagger: 0.5, scale: 1, ease: "Power1.in" })
.from('.img-front3', { y: 50 }, { y: -3000 }, { duration: 1 }, 0)
.from(".line7", { autoAlpha: 0, duration: 5, stagger: 0.5, scale: 1, ease: "Power1.in" })
.to(".line7", { opacity: 0, ease: "Power1.in" })
.from(".line8", { autoAlpha: 0, duration: 5, stagger: 0.5, scale: 1, ease: "Power1.in" })
.to({}, { duration: 2 });


//seventh section timeline
const tl7 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container7",
        start: "top top",
        pin: true,
        scrub: true
    }
});



// eigth section timeline
const tl8 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container8",
        start: "top top",
        pin: true,
        scrub: true
    }
})
tl8.from(".line9", { autoAlpha: 0, duration: 2, stagger: 0.5, scale: 1, ease: "Power1.in" })

tl8.to(".line9", { opacity: 0, ease: "Power1.in" });

tl8.from(".line10", { autoAlpha: 0, duration: 2, stagger: 0.5, scale: 1, ease: "Power1.in" })

tl8.to({}, { duration: 2 });


//ninth section timeline
const tl9 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container9",
        start: "top top",
        pin: true,
        scrub: true
    }
});

const tl10 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container10",
        start: "top top",
        pin: true,
        scrub: true
    }
});

const tl11 = new TimelineMax({
    scrollTrigger: {
        trigger: ".page-container11",
        start: "top top",
        pin: true,
        scrub: true
    }
});

// reveal point from bottom and top of the window
var revealerpoint = 150;
window.addEventListener('scroll', reveal);
//reveal();

function reveal() {
    var revealers = document.querySelectorAll('.revealer');
    for (var i = 0; i < revealers.length; i++) {
        var windowheight = window.innerHeight;
        var revealertop = revealers[i].getBoundingClientRect().top;
        var revealerbottom = revealers[i].getBoundingClientRect().bottom;
        if (revealertop < windowheight - revealerpoint) {
            revealers[i].classList.add('active')
        } else {
            revealers[i].classList.remove('active');
        };
        if (revealerbottom < 0 + revealerpoint) {
            revealers[i].classList.remove('active');
        }
    }
};