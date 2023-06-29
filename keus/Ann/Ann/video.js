/** 
 * The below function is used for the text fadeIn
 * @param {HTMLElement} el
 * @param {number} durationInMs
 * @returns {text}
 */
function fadeIn(el) {
    let text = gsap.timeline().to(el, { autoAlpha: 1, duration: 0 });
    return text;
}

/** 
 * The below function is used for the text fadeout
 * @param {HTMLElement} el
 * @param {number} durationInMs
 * @returns {text}
 */

function fadeOut(el) {
    let text = gsap.timeline().to(el, { autoAlpha: 0, duration: 1 });
    return text;
}

/** 
 * The below function is used to play the video
 * @param {HTMLElement} el
 * @param {number} durationInMs
 */
function playVideo(el) {
    let vid = document.getElementById(el);
    vid.currentTime = 0;
    vid.play();
    console.log("playing video");
}

//Text transition
let text = gsap
    .timeline()
    .add(fadeIn(".text"))
    .add(fadeOut(".text"))
    .to("#twilight", { duration: 5 })
    .set(".v-container", { background: "White" })


ScrollTrigger.create({
    scrub: true,
    trigger: ".v-container",
    start: "top top", //trigger is the same height as the viewport 
    end: "+=5rem", //setting the size for the scroll trigger 
    animation: text,
    pin: true,
    onToggle: (self) => (self.isActive ? playVideo("twilight") : ""),
});