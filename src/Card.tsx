import React from 'react';

interface CardProps {
  rank: string;
  suit: string;
}

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  return (
    <span className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{getSuitSymbol(suit)}</span>
    </span>
  );
};

function getSuitSymbol(suit: string) { 
    switch (suit) {
      case 'diams':
        return '♦';
      case 'hearts':
        return '♥';
      case 'clubs':
        return '♣';
      case 'spades':
        return '♠';
      default:
        return '';
    }
  }

export default Card;