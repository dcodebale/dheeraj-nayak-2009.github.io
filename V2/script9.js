
// to check if it is my birthday:
// bday = 10 march
let isBirthday = false;
const today = new Date();
if (today.getDate() === 10 && today.getMonth() === 2) {
    isBirthday = true;
    fetch('https://script.google.com/macros/s/AKfycby2viueBJ_CeP6G9nAI61viJo9Po2GdnoGZDOZnDvV4AyIYMbtyfSguVjNBp7DSXOZx-w/exec?type=wish')
    .then(response => response.json())
    .then(data => {
        const wellWishersDiv = document.querySelector('.well-wishers');
        wellWishersDiv.innerHTML = '<div class="wish-header">Birthday Wishes</div>';
        data.forEach(item => {
            const bRow = document.createElement('div');
            bRow.className = 'bRow';
            bRow.innerHTML = `<div class="wishername">${item.name}</div><div class="bText">${item.message}</div>`;
            wellWishersDiv.appendChild(bRow);
        });
    })
    .catch(error => console.error('Error fetching wishes:', error));

    // remove the hide class
    document.querySelector('.hide').style.display = 'block';
}
