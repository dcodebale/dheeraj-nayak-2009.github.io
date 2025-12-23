
// ============================================
// SKILLS ROTATION
// ============================================

const skillsWrapper = document.querySelector('.skills-wrapper');
const skillsContainer = document.querySelector('.skills-container');
const skillsSticky = document.querySelector('.skills-sticky');
const skillOrbits = document.querySelectorAll('.skill-orbit');

const ROTATIONS = 1; // Number of revolutions

// Position skill orbits in circle
const orbitRadius = 175; // Distance from center
const isMobile = window.innerWidth <= 768;
const adjustedRadius = isMobile ? 170 : orbitRadius;

function positionSkills(rotation) {
  skillOrbits.forEach((orbit, index) => {
    const baseAngle = parseFloat(orbit.dataset.angle);
    const angleRad = (baseAngle + rotation) * (Math.PI / 180);
    
    const x = Math.cos(angleRad) * adjustedRadius;
    const y = Math.sin(angleRad) * adjustedRadius;
    
    orbit.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  });
}

// Initialize positions
positionSkills(0);

// Set gauges to 0 initially
skillOrbits.forEach(orbit => {
  const gaugeFill = orbit.querySelector('.gauge-fill');
  const skillPercent = orbit.querySelector('.skill-percent');
  
  gaugeFill.style.strokeDashoffset = '314'; // 0%
  skillPercent.textContent = '0%';
});

// Function to animate gauges to target
function animateGauges() {
  skillOrbits.forEach(orbit => {
    const targetSkill = parseFloat(orbit.dataset.skill);
    const gaugeFill = orbit.querySelector('.gauge-fill');
    const skillPercent = orbit.querySelector('.skill-percent');
    
    const offset = 314 - (314 * targetSkill / 100);
    gaugeFill.style.strokeDashoffset = offset;
    skillPercent.textContent = `${targetSkill}%`;
  });
}

// Intersection Observer to trigger gauge animation when section is fully in view
const gaugeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateGauges();
      gaugeObserver.disconnect(); // Trigger only once
    }
  });
}, { threshold: 1.0 });

if (skillsSticky) {
  gaugeObserver.observe(skillsSticky);
}

// Scroll handler for rotation
function handleSkillsScroll() {
  if (!skillsWrapper) return;
  
  const start = skillsWrapper.offsetTop;
  const end = start + skillsWrapper.offsetHeight - window.innerHeight;
  const scrollY = window.scrollY;
  
  if (scrollY >= start && scrollY <= end) {
    const progress = (scrollY - start) / (end - start);
    const rotation = progress * ROTATIONS * 360;
    positionSkills(rotation);
  }
}

// Attach scroll listener
window.addEventListener('scroll', handleSkillsScroll);

// Responsive repositioning
window.addEventListener('resize', () => {
  positionSkills(0); // Reset to initial
});

