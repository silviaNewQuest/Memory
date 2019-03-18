import React , {useState, useEffect} from 'react';
import classnames from 'classnames';
import './styles.scss';
import shuffleCards, {CARD_STATE} from './card.js';


const Card = ({state, url, onClick}) => (
    <div className={classnames("card", state.toLowerCase())} 
    style={{backgroundImage:`url(${url})`}} onClick={onClick}></div>
)


const Cards = () => {
    const [cards, setCards ] = useState(shuffleCards());

    useEffect(() => {
        preloadImages();
    }, []);

    const preloadImages = () => cards.map(card => new Image().src = card.url)

    const flippedCards = cards.filter(card => card.state === CARD_STATE.REVEALED);

    

    const handleClick = (position, name, state) => () => {
        if(cards.filter(e => e.state === CARD_STATE.REVEALED).length >1) {
            return;
        }
        if(state === CARD_STATE.MATCHED) {
            return;
        }

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

    const allMatched = cards.every(e => e.state === CARD_STATE.MATCHED);

    const unFlipAll = () => {
        setCards(shuffleCards())
    }

    return (
        <>
        {allMatched && <div className="congrats"><div className="message">Congratulations on matching all animals!</div>
        <button className="reset" type="button" onClick={unFlipAll}>Play Again?</button></div>}
        <div className="cards">
        {cards.map(card => <Card key={card.position} onClick={handleClick(card.position, card.name, card.state)} 
            url={card.url} 
            state={card.state}
            />)}
        </div>
        </>
    ); 
}

export default Cards;