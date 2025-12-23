
// =======================
// DATE OF BIRTH
// =======================
const dob = new Date(2009, 2, 10); // 10 March 2009 (month is 0-based)

// =======================
// LIVE CLOCK
// =======================
function updateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.querySelector('time').innerHTML =
        `>>> IST: <tm>${hours%12}:${minutes}:${seconds}</tm> ${hours >= 12 ? 'PM' : 'AM'}`;
}
// in 12 hr format
setInterval(updateTime, 1000);
updateTime(); // initial call

// =======================
// AGE (YEARS + MONTHS)
// =======================
function calculateAgeYrsMonths(dob) {
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
}

const age = calculateAgeYrsMonths(dob);
document.querySelector('dynmicage').textContent =
    `>>> Age: ${age.years} years, ${age.months} months`;

// =======================
// DAYS LIVED
// =======================
const diffTime = Date.now() - dob.getTime();
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

document.querySelector('dayslived').textContent =
    `>>> Days Lived: ${diffDays.toLocaleString()} days`;
