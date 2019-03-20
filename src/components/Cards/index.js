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
    const [timeSeconds, setTimeSeconds ] = useState(0);
    const [timeMinutes, setTimeMinutes ] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        preloadImages();
    }, []);

    useEffect(() => {
        if(!running) {
            return;
        }

        const interval = setInterval(() => {
            setTimeSeconds(timeSeconds+1);
            if (timeSeconds === 60) {
                setTimeMinutes(timeMinutes + 1);
                setTimeSeconds(0);
            }   
        }, 1000)
            
        return() => {
            clearInterval(interval);
        };
    }, [running, timeSeconds])

    const preloadImages = () => cards.map(card => new Image().src = card.url)

    const flippedCards = cards.filter(card => card.state === CARD_STATE.REVEALED);

    const handleClick = (position, name, state) => () => {

        setRunning(true);

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
        setTimeSeconds(0)
        setTimeMinutes(0)
        setRunning(false)
    };

    const minutesDecider = () => {
        if (timeMinutes < 1) {
            return "Minute";
        }
        return "Minutes";
    }

    const secondsDecider = () => {
        if (timeSeconds < 1) {
            return "Second";
        }
        return "Seconds";
    }

    return (
        <>
        {allMatched && 
        <div className="congrats">
            <div className="message">Congratulations on matching all animals!</div>
            <button className="reset" type="button" onClick={unFlipAll}>Play Again?</button>
        </div>}
        <div className="time">{timeMinutes} <div className="time--style">{minutesDecider()}</div> {timeSeconds} <div className="time--style">{secondsDecider()}</div></div>
        <div className="cards">
        {cards.map(card => <Card key={card.position} 
            onClick={handleClick(card.position, card.name, card.state)}
            url={card.url} 
            state={card.state}
            />)}
        </div>
        </>
    ); 
}

export default Cards;