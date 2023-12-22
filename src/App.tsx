import React, { useState } from 'react';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';
import Card from './Card';

const App: React.FC = () => {
  const [hand, setHand] = useState<Array<{ rank: string; suit: string }>>([]);
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [replacePerformed, setReplacePerformed] = useState<boolean>(false);  
  const cardDeck = new CardDeck();

  const dealCards = () => {
    const deck = new CardDeck();
    const newHand = deck.getCards(5);
    const pokerHand = new PokerHand(newHand);
    const outcome = pokerHand.getOutcome();
    setOutcomeMessage(`Рука: ${outcome}`);
    setHand(newHand);
    setSelectedCardIndexes([]);
    setErrorMessage(null);
    setReplacePerformed(false);  
  };

  const handleCheckboxChange = (index: number) => {
    if (replacePerformed) {
      setErrorMessage('Вы уже заменили карты. Нажмите "Раздать карты" для новой раздачи.');
      return;
    }

    if (selectedCardIndexes.includes(index)) {
      setSelectedCardIndexes(selectedCardIndexes.filter((i) => i !== index));
    } else {
      setSelectedCardIndexes([...selectedCardIndexes, index]);
    }
  };

  const handleReplace = () => {
    if (replacePerformed) {
      setErrorMessage('Вы уже заменили карты. Нажмите "Раздать карты" для новой раздачи.');
      return;
    }

    const newHand = [...hand];
    const cardsToReplace = selectedCardIndexes.length;
 
    const newCards = cardDeck.getCards(cardsToReplace);

    selectedCardIndexes.forEach((index, i) => {
      newHand[index] = newCards[i];
    });

    const pokerHand = new PokerHand(newHand);
    const newOutcome = pokerHand.getOutcome();
    setOutcomeMessage(`Рука: ${newOutcome}`);
    setHand(newHand);
    setSelectedCardIndexes([]);
    setErrorMessage(null);
    setReplacePerformed(true);  
  };

  return (
    <div>
      <button onClick={dealCards}>Раздать карты</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {outcomeMessage && <div>{outcomeMessage}</div>}
      {hand.length > 0 && (
        <div>
          <div className="playingCards faceImages">
            {hand.map((card, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedCardIndexes.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
                <Card rank={card.rank} suit={card.suit} />
              </label>
            ))}
          </div>
          <button onClick={handleReplace} disabled={cardDeck.remainingCards() < selectedCardIndexes.length}>
            Заменить выбранные карты
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
