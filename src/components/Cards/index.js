import React , {useState, useEffect} from 'react';
import './styles.scss';
import shuffleCards from './state';
import Card from './card';
import { preloadImages, isAllMatched, minutesDecider, secondsDecider } from './utils';
import { handleClick } from './handlers';
import { unFlipAll} from './handlers';

const Cards = () => {
    const [cards, setCards ] = useState(shuffleCards());
    const [seconds, setSeconds ] = useState(0);
    const [running, setRunning] = useState(false);
    
    useEffect(() => {
        preloadImages(cards);
    }, []);

    useEffect(() => {
        if (isAllMatched(cards)) {
            setRunning(false);
        }
    }, [cards]);

    useEffect(() => {
        if(!running) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds(seconds + 1);
        }, 1000)
            
        return() => {
            clearInterval(interval);
        };
    }, [running, seconds])

    return (
        <>
            {isAllMatched(cards) && 
            <div className="congrats">
                <div className="message">Congratulations on matching all animals!</div>
                <button className="reset" type="button" onClick={() => unFlipAll(setCards, setSeconds, setRunning)}>Play Again?</button>
            </div>}
            <div className="time"> {Math.floor(seconds / 60)} <div className="time--style">{minutesDecider(seconds)}</div> {seconds % 60} <div className="time--style">{secondsDecider(seconds)}</div></div>
            <div className="cards">
            {cards.map(card => <Card key={card.position} 
                onClick={handleClick(cards, setCards, setRunning, card.position, card.name, card.state)}
                url={card.url} 
                state={card.state}
                />)}
            </div>
        </>
    ); 
}

export default Cards;