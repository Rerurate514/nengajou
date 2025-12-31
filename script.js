const nengaCard = document.getElementById('nengaCard');
const cardInner = nengaCard.querySelector('.flip-card-inner');

let isDragging = false;
let previousX, previousY;
let currentRotateX = 0;
let currentRotateY = 0;

nengaCard.addEventListener('pointerdown', (e) => {
    isDragging = true;
    previousX = e.clientX;
    previousY = e.clientY;
    nengaCard.style.cursor = 'grabbing';
});

window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousX;
    const deltaY = e.clientY - previousY;

    previousX = e.clientX;
    previousY = e.clientY;

    currentRotateY += deltaX * 0.5;
    currentRotateX -= deltaY * 0.5;

    cardInner.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
    nengaCard.style.cursor = 'grab';
});
