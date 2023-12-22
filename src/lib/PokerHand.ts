import Card from './Card';

type HandOutcome = 'Одна пара' | 'Две пары' | 'Тройка' | 'Флэш' | 'Старшая карта';

class PokerHand {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  private isFlush(): boolean {
    const firstSuit = this.cards[0].suit;
    return this.cards.every((card) => card.suit === firstSuit);
  }

  private isPair(): boolean {
    const rankCount: Record<string, number> = {};

    for (const card of this.cards) {
      if (rankCount[card.rank]) {
        return true;  
      } else {
        rankCount[card.rank] = 1;
      }
    }

    return false;  
  }

  private isTwoPair(): boolean {
    const rankCount: Record<string, number> = {};
    let pairCount = 0;

    for (const card of this.cards) {
      if (rankCount[card.rank]) {
        pairCount++;
        if (pairCount === 2) {
          return true;  
        }
      } else {
        rankCount[card.rank] = 1;
      }
    }

    return false;  
  }

  private isThreeOfAKind(): boolean {
    const rankCount: Record<string, number> = {};

    for (const card of this.cards) {
      if (rankCount[card.rank]) {
        rankCount[card.rank]++;
        if (rankCount[card.rank] === 3) {
          return true;  
        }
      } else {
        rankCount[card.rank] = 1;
      }
    }

    return false;  
  }

  getOutcome(): HandOutcome {
    if (this.isFlush()) {
      return 'Флэш';
    }

    if (this.isThreeOfAKind()) {
      return 'Тройка';
    }

    if (this.isTwoPair()) {
      return 'Две пары';
    }

    if (this.isPair()) {
      return 'Одна пара';
    }
 
    return 'Старшая карта';
  }
}

export default PokerHand;
