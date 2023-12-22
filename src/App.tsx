import React, { useState } from 'react';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';
import Card from './Card';

const App: React.FC = () => {
  const [hand, setHand] = useState<Array<{ rank: string; suit: string }>>([]);
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  const cardDeck = new CardDeck();

  const dealCards = () => {
    const deck = new CardDeck();
    const newHand = deck.getCards(5);
    const pokerHand = new PokerHand(newHand);
    const outcome = pokerHand.getOutcome();
    setOutcomeMessage(`Рука: ${outcome}`); 
    setHand(newHand);
    setSelectedCardIndexes([]);
  };

  const handleCheckboxChange = (index: number) => { 
    if (selectedCardIndexes.includes(index)) {
      setSelectedCardIndexes(selectedCardIndexes.filter((i) => i !== index));
    } else {
      setSelectedCardIndexes([...selectedCardIndexes, index]);
    }
  };

  const handleReplace = () => {
    const newHand = [...hand];

    selectedCardIndexes.forEach((index) => { 
      newHand[index] = cardDeck.getCard();
    });

    const pokerHand = new PokerHand(newHand);
    const newOutcome = pokerHand.getOutcome();
    setOutcomeMessage(`Рука: ${newOutcome}`);
   
    setHand(newHand);
    setSelectedCardIndexes([]);
  }; 
   
  return (
    <div>
    <button onClick={dealCards}>Раздать карты</button>
    {outcomeMessage && <div>{outcomeMessage}</div>}
    {hand.length > 0 && (
      <div>
        <div className="playingCards faceImages">
          {hand.map((card, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedCardIndexes.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
              <Card rank={card.rank} suit={card.suit} />
            </div>
          ))}
        </div>
        <button onClick={handleReplace}>Заменить выбранные карты</button>
      </div>
    )}
  </div> 
  );
};

export default App;
    