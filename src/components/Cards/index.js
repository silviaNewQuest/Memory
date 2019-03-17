import React , {useState} from 'react';
import classnames from 'classnames';
import './styles.scss';
import DefaultState, {CARD_STATE} from './card.js';


const Card = ({state, url, onClick}) => (
    <div className={classnames("card", state.toLowerCase())} 
    style={{backgroundImage:`url(${url})`}} onClick={onClick}></div>
)


const Cards = () => {
    const [cards, setCards ] = useState(DefaultState);
    const [disabled, setDisabled] = useState(false);
    console.log(cards)
    const flippedCards = cards.filter(card => card.state === CARD_STATE.REVEALED);

    const unFlipAll = cards.map(card => {
        return {...card, state: CARD_STATE.UNREVEALED};
    });

    const resetCards = () => {
        setCards(unFlipAll);
    }


    const handleClick = (position, name, state) => () => {

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
                    setTimeout(setCards, 1000, unFlip);
                }
            }        
        }

    }

    if (cards.forEach(card => card.state === CARD_STATE.MATCHED)) {
        setCards(unFlipAll);
    }

    return (
        <div className="cards">
        {cards.map(card => <Card key={card.position} onClick={handleClick(card.position, card.name, card.state)} 
            url={card.url} 
            state={card.state}
            />)}
        </div>
    ); 
    
}

export default Cards;