
const journeyWrapper = document.querySelector('.journey-wrapper');
const journeyTrack = document.querySelector('.journey-track');

window.addEventListener('scroll', () => {
  const start = journeyWrapper.offsetTop;
  const end = start + journeyWrapper.offsetHeight - window.innerHeight;
  const scrollY = window.scrollY;

  if (scrollY >= start && scrollY <= end) {
    const progress = (scrollY - start) / (end - start);

    // ✅ FIXED calculation
    const maxTranslate =
      journeyTrack.scrollWidth - journeyWrapper.clientWidth + 60; // right padding

    journeyTrack.style.transform =
      `translateX(${-progress * maxTranslate}px)`;
  }
});
