

const cardNames = ['bear', 'bird', 'cat', 'cow', 'deer', 'dog', 'duck', 'elephant', 'giraffe', 'lion', 'panda', 'pig', 'rabbit', 'racoon', 'squirrel'];

const deuplicatedCards = cardNames.concat(cardNames);
const shuffledCards = shuffle(deuplicatedCards);


function shuffle(array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export const CARD_STATE = {
    UNREVEALED: 'UNREVEALED',
    REVEALED: 'REVEALED',
    MATCHED: 'MATCHED',
};

const DefaultState = shuffledCards.map((card, index) => {
    return {
        position: index,
        url: `/images/${card}.svg`,
        name: card,
        state: CARD_STATE.UNREVEALED
    };
});    

export default DefaultState;