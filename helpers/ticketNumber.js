const ticketNumberGenerator = () => {
    
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
    const randomLetter = Math.floor(Math.random() * letters.length);
    const numbers = Math.floor(Math.random() * 1000000);

    return letters[randomLetter].toUpperCase() + numbers;
};

module.exports = { ticketNumberGenerator }