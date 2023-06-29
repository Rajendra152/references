var scrollHt = document.body.scrollTop;
var breakpoint = [1, 3, 5, 7, 9];
var vid = document.getElementById('vid');
vid.pause();
var lastSt = 0;
vid.currentTime = 0;
currentTimeIdx = 0;
var timer = null;
window.onscroll = function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastSt) {
            if (currentTimeIdx !== 5) {
                currentTimeIdx++;
                playVideoReverse(breakpoint[currentTimeIdx], 0.1);
            }
        } else {
            if (currentTimeIdx !== 0) {
                currentTimeIdx--;
                playVideoReverse(breakpoint[currentTimeIdx], -0.1);
            }
        }
        lastSt = st < 0 ? 0 : st;
    }, 150);
}
var intervalRewind = null;
var miniMax = document.getElementById('miniMax');
var multiCore = document.getElementById('multiCore');
var devicesText = document.getElementById('devicesText');
miniMax.style.display = "block";
multiCore.style.display = "none";
devicesText.style.display = "none";

function playVideoReverse(endTime, factor) {
    clearInterval(intervalRewind)

    function checkTime() {

        vid.playbackRate = 1.0
        if (factor < 0 && vid.currentTime <= endTime) {
            if (Math.round(vid.currentTime) === 1) {
                miniMax.style.display = "block";
                multiCore.style.display = "none";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 3) {
                miniMax.style.display = "none";
                multiCore.style.display = "none";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 5) {
                miniMax.style.display = "none";
                multiCore.style.display = "block";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 7) {
                miniMax.style.display = "none";
                multiCore.style.display = "none";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 9) {
                miniMax.style.display = "none";
                multiCore.style.display = "none";
                devicesText.style.display = "block";
            }
            clearInterval(intervalRewind);
            vid.pause();
        }
        if (factor > 0 && vid.currentTime >= endTime) {
            if (Math.round(vid.currentTime) === 1) {
                miniMax.style.display = "block";
                multiCore.style.display = "none";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 3) {
                miniMax.style.display = "none";
                multiCore.style.display = "none";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 5) {
                miniMax.style.display = "none";
                multiCore.style.display = "block";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 7) {
                miniMax.style.display = "none";
                multiCore.style.display = "none";
                devicesText.style.display = "none";
            }
            if (Math.round(vid.currentTime) === 9) {
                miniMax.style.display = "none";
                multiCore.style.display = "none";
                devicesText.style.display = "block";
            }
            clearInterval(intervalRewind);
            vid.pause();
        } else {
            vid.currentTime = vid.currentTime + factor; // - 0.1;
        }
    }

    intervalRewind = setInterval(checkTime, 150);
}
window.addEventListener("scroll", reveal);


function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    // console.log("reval", reveals.length)

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        // getBoundingClientRect object provides information about the size of an element
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 200;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}


function getYPosition() {
    var top = window.pageYOffset || document.documentElement.scrollTop
    return top;
}