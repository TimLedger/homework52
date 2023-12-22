import Card from './Card';

type HandOutcome =
  | 'Роял-флэш'
  | 'Стрит-флэш'
  | 'Каре'
  | 'Фулл-хаус'
  | 'Флэш'
  | 'Стрит'
  | 'Тройка'
  | 'Две пары'
  | 'Одна пара'
  | 'Старшая карта';

class PokerHand {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  private isRoyalFlush(): boolean { 
    const royalRanks = ['10', 'J', 'Q', 'K', 'A'];
    const suits = new Set(this.cards.map((card) => card.suit));

    if (suits.size === 1) {
      const ranks = new Set(this.cards.map((card) => card.rank));
      return royalRanks.every((rank) => ranks.has(rank));
    }

    return false;
  }

  private isStraightFlush(): boolean { 
    return this.isStraight() && this.isFlush();
  }

  private isFourOfAKind(): boolean { 
    const rankCount: Record<string, number> = {};

    for (const card of this.cards) {
      rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;

      if (rankCount[card.rank] === 4) {
        return true;
      }
    }

    return false;
  }

  private isFullHouse(): boolean { 
    const rankCount: Record<string, number> = {};

    for (const card of this.cards) {
      rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
    }

    const values = Object.values(rankCount);
    return values.includes(3) && values.includes(2);
  }

  private isFlush(): boolean { 
    const firstSuit = this.cards[0].suit;
    return this.cards.every((card) => card.suit === firstSuit);
  }

  private isStraight(): boolean { 
    const sortedRanks = this.cards.map((card) => card.rank).sort();

    for (let i = 1; i < sortedRanks.length; i++) {
      const currentRankIndex = '23456789TJQKA'.indexOf(sortedRanks[i]);
      const previousRankIndex = '23456789TJQKA'.indexOf(sortedRanks[i - 1]);

      if (currentRankIndex - previousRankIndex !== 1) {
        return false;
      }
    }

    return true;
  }

  private isThreeOfAKind(): boolean { 
    const rankCount: Record<string, number> = {};

    for (const card of this.cards) {
      rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;

      if (rankCount[card.rank] === 3) {
        return true;
      }
    }

    return false;
  }

  private isTwoPair(): boolean { 
    const rankCount: Record<string, number> = {};
    let pairCount = 0;

    for (const card of this.cards) {
      rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;

      if (rankCount[card.rank] === 2) {
        pairCount++;
      }
    }

    return pairCount === 2;
  }

  private isOnePair(): boolean { 
    const rankCount: Record<string, number> = {};

    for (const card of this.cards) {
      rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;

      if (rankCount[card.rank] === 2) {
        return true;
      }
    }

    return false;
  }

  getOutcome(): HandOutcome {
    if (this.isRoyalFlush()) {
      return 'Роял-флэш';
    }

    if (this.isStraightFlush()) {
      return 'Стрит-флэш';
    }

    if (this.isFourOfAKind()) {
      return 'Каре';
    }

    if (this.isFullHouse()) {
      return 'Фулл-хаус';
    }

    if (this.isFlush()) {
      return 'Флэш';
    }

    if (this.isStraight()) {
      return 'Стрит';
    }

    if (this.isThreeOfAKind()) {
      return 'Тройка';
    }

    if (this.isTwoPair()) {
      return 'Две пары';
    }

    if (this.isOnePair()) {
      return 'Одна пара';
    }

    return 'Старшая карта';
  }
}

export default PokerHand;
