
const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'];

export function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}