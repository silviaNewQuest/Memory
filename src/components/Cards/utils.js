import { CARD_STATE } from './state';

export const minutesDecider = (seconds) => {
    if (seconds < 60) {
        return "Minute";
    }
    return "Minutes";
}

export const secondsDecider = (seconds) => {
    if (seconds < 1) {
        return "Second";
    }
    return "Seconds";
}

export const isAllMatched = cards => cards.every(e => e.state === CARD_STATE.MATCHED);
export const preloadImages = cards => cards.forEach(card => new Image().src = card.url);
export const getFlippedCards = cards => cards.filter(card => card.state === CARD_STATE.REVEALED);