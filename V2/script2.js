
// on clicking the button, show the popup
document.querySelector('.info button').addEventListener('click', () => {
    document.querySelector('.wishpopup').style.display = 'block';
});
// function to close the popup
function clos() {
    document.querySelector('.wishpopup').style.display = 'none';
}
