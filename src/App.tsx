import React, { useState } from 'react';
import CardDeck from './lib/CardDeck';
import Card from './Card';

const App: React.FC = () => {
  const [hand, setHand] = useState<Array<{ rank: string; suit: string }>>([]);

  const dealCards = () => {
    const deck = new CardDeck();
    const newHand = deck.getCards(5);
    setHand(newHand);
  };

  return (
    <div>
      <button onClick={dealCards}>Раздать карты</button>
      {hand.length > 0 && (
        <div className="playingCards faceImages">
          {hand.map((card, index) => (
            <Card key={index} rank={card.rank} suit={card.suit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;