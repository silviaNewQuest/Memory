import { CARD_STATE } from './state';
import { getFlippedCards } from './utils';
import shuffleCards from './state';


export const unFlipAll = (setCards, setSeconds, setRunning) => {
    setCards(shuffleCards());
    setSeconds(0);
    setRunning(false);
};

export const handleClick = (cards, setCards, setRunning, position, name, state) => () => {
    const flippedCards = getFlippedCards(cards);

    if (cards.filter(e => e.state === CARD_STATE.REVEALED).length >1) {
        return;
    }

    if(state === CARD_STATE.MATCHED) {
        return;
    }

    setRunning(true);

    const revealedState = cards.map(card => {
        return card.position === position ? {...card, state: CARD_STATE.REVEALED} : card;
    });


    const matchedState = revealedState.map(card => {
        return card.state === CARD_STATE.REVEALED ? {...card, state: CARD_STATE.MATCHED} : card;
    });

    const unFlip = revealedState.map(card => {
        return card.state === CARD_STATE.REVEALED ? {...card, state: CARD_STATE.UNREVEALED} : card;
    });

    if (flippedCards.length === 0) {
        setCards(revealedState);
    } else {
        if(flippedCards[0].position === position) {
            return
        } else {
            setCards(revealedState);
            if (flippedCards[0].name === name) {
                setCards(matchedState);
            } else {            
                setTimeout(setCards, 600, unFlip);
            }
        }        
    }
}