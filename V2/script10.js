
// add a loading screen that checks if anything is yet to load... images, fonts, etc. as well as sheets data for feedback as well as if it is birthday, then data from wishes of sheets
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    // sleep for 3 seconds to show loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.body.style.overflow = '';

        // confetti for birthday after loading
        if (isBirthday) {
            let duration = 3000; // 3 seconds
            let end = Date.now() + duration;
            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, 500);
});
