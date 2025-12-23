
document.getElementById("wishForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("wish-name");
    const wishesInput = document.getElementById("wish-wishes");

    const name = nameInput.value.trim();
    const wishes = wishesInput.value.trim();

    if (!name || !wishes) {
        alert("Please fill both fields!");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", wishes);
    formData.append("type", "wish");

    // sending text on submit button
    const submitButton = this.querySelector('input[type="submit"]');
    submitButton.value = "Sending...";
    submitButton.style.pointerEvents = "none";

    try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycby2viueBJ_CeP6G9nAI61viJo9Po2GdnoGZDOZnDvV4AyIYMbtyfSguVjNBp7DSXOZx-w/exec",
          {
            method: "POST",
            body: formData
          }
        );

        if (res.ok) {
            clos();
            this.reset();
            // alert("Wish sent 🎉");
            // the submit button text changes to 'Wish Sent!' and is disabled
            const submitButton = this.querySelector('input[type="submit"]');
            submitButton.value = "Wish Sent!";
            submitButton.style.pointerEvents = "none";
        } else {
            alert("Server error");
        }
    } catch (err) {
        alert("Network error");
        console.error(err);
    }
});
