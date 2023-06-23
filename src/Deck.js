import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";

const Deck = () => {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const drawnCardsContainerRef = useRef(null);

    useEffect(() => {
        const getDeck = async () => {
            try {
                const deckRequest = await fetch(
                    "https://deckofcardsapi.com/api/deck/new/shuffle/"
                );
                const deckData = await deckRequest.json();
                setDeck(deckData);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getDeck();
    }, []);

    const drawCard = async () => {
        if (cards.length === 52) {
            alert("Deck is empty!");
        } else {
            const drawRequest = await fetch(
                `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
            );
            const drawData = await drawRequest.json();

            const drawnCard = drawData.cards[0];

            console.log(`${deck.deck_id}: ${deck.remaining}`);

            setCards((drawn) => [
                ...drawn,
                {
                    id: drawnCard.code,
                    image: drawnCard.image,
                },
            ]);

            setDeck((prevDeck) => ({
                ...prevDeck,
                remaining: drawData.remaining,
            }));
        }
    };

    const shuffleDeck = async () => {
        try {
            const shuffleRequest = await fetch(
                `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
            );

            const shuffleData = await shuffleRequest.json();
            setDeck(shuffleData);
            setCards([]);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div>
            <h1>Card Draw</h1>
            <button onClick={drawCard}>Draw a Card</button>
            <button onClick={shuffleDeck}>Re-Shuffle Deck</button>
            <div id="drawn-cards" ref={drawnCardsContainerRef}>
                {cards.map(details => (
                    <Card key={details.id} image={details.image} />
                ))}
            </div>

        </div>
    )

}

export default Deck;
