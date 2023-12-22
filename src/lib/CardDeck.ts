import Card from './Card';

class CardDeck {
  private cards: Card[];

  constructor() {
    this.cards = [];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
    const suits = ['diams', 'hearts', 'clubs', 'spades'];

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  getCard(): Card {
    return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0];
  }

  getCards(howMany: number): Card[] {
    const drawnCards: Card[] = [];
    for (let i = 0; i < howMany; i++) {
      drawnCards.push(this.getCard());
    }
    return drawnCards;
  }
}

export default CardDeck;
