import React, { useState } from 'react';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';
import Card from './Card';

const App: React.FC = () => {
  const [hand, setHand] = useState<Array<{ rank: string; suit: string }>>([]);
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);


  const dealCards = () => {
    const deck = new CardDeck();
    const newHand = deck.getCards(5);
    const pokerHand = new PokerHand(newHand);
    const outcome = pokerHand.getOutcome();
    setOutcomeMessage(`Рука: ${outcome}`); 
    setHand(newHand);
  };
 
  return (
    <div>
    <button onClick={dealCards}>Раздать карты</button>
    {hand.length > 0 && (
      <div>
        <div className="playingCards faceImages">
          {hand.map((card, index) => (
            <Card key={index} rank={card.rank} suit={card.suit} />
          ))}
        </div>
        {outcomeMessage && <div>{outcomeMessage}</div>}
      </div>
    )}
  </div>
  );
};

export default App;