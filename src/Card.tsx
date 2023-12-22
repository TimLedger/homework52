import React from 'react';

interface CardProps {
  rank: string;
  suit: string;
}

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  return (
    <span className={`card rank-${rank} ${suit}`}>
      <span className="rank">{getRankSymbol(rank)}</span>
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

  function getRankSymbol(rank: string) { 
    switch (rank) {
      case '2':
        return '2';
      case '3':
        return '3';
      case '4':
        return '4';
      case '5':
        return '5';
      case '6':
        return '6';
      case '7':
        return '7';
      case '8':
        return '8';
      case '9':
        return '9';
      case '10':
        return '10';
      case 'j':
        return 'J';
      case 'q':
        return 'Q';
      case 'k':
        return 'K';
      case 'a':
        return 'A';
      default:
        return '';
    }
  }

export default Card;