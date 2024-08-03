// JavaScript to handle the popup functionality

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-popup');
    let currentsong = new Audio();

    // Show popup
    playButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    // Close popup when clicking on the close button
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside of the popup
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
