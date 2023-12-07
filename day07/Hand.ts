import { Card, CardLabel, isCardLabel } from "./Card.ts";

const HAND_SIZE = 5;

const HAND_TYPES = [
  "FIVE_OF_A_KIND", // AAAAA
  "FOUR_OF_A_KIND", // AA8AA
  "FULL_HOUSE", // 23332
  "THREE_OF_A_KIND", // TTT98
  "TWO_PAIR", // 23432
  "ONE_PAIR", // A23A4
  "HIGH_CARD", // 23456
] as const;

type HandType = (typeof HAND_TYPES)[number];

export class Hand {
  cards: Card[] = Array(HAND_SIZE);

  constructor(c: Card[]) {
    console.assert(
      c.length === HAND_SIZE,
      `A hand should contain exactly ${HAND_SIZE} cards`
    );

    c.forEach((card, idx) => {
      this.cards[idx] = card;
    });

    this.cards.toString = () => {
      return "Hand: " + this.cards.map((c) => c.label).join("");
    };
  }

  getType(): HandType {
    const cardsMap = new Map<CardLabel, number>();
    for (let idx = 0; idx < this.cards.length; idx++) {
      const c = this.cards[idx];
      cardsMap.set(c.label, (cardsMap.get(c.label) ?? 0) + 1);
    }

    switch (cardsMap.size) {
      case 1:
        return "FIVE_OF_A_KIND";
      case 2: {
        const [c1, c2] = cardsMap.values();
        if ((c1 === 4 || c2 === 4) && (c1 === 1 || c2 === 1)) {
          return "FOUR_OF_A_KIND";
        } else if ((c1 === 3 || c2 === 3) && (c1 === 2 || c2 === 2)) {
          return "FULL_HOUSE";
        } else {
          throw new Error("Invalid case");
        }
      }
      case 3: {
        const keys = Array.from(cardsMap.keys());
        for (let i = 0; i < keys.length; i++) {
          const value = cardsMap.get(keys[i] as CardLabel);
          if (value === 3) {
            return "THREE_OF_A_KIND";
          } else if (value === 2) {
            return "TWO_PAIR";
          }
        }
        throw new Error("Invalid case");
      }
      case 4: {
        return "ONE_PAIR";
      }
      default:
        return "HIGH_CARD";
    }
  }

  getTypeValue() {
    const type = this.getType();
    return Hand.getTypeValueFrom(type);
  }

  static getTypeValueFrom(type: HandType) {
    return HAND_TYPES.length - HAND_TYPES.indexOf(type);
  }

  /**
   *
   */
  static compare(a: Hand, b: Hand) {
    const A = a.getTypeValue();
    const B = b.getTypeValue();
    if (A === B) {
      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i].label === b.cards[i].label) {
          continue;
        } else {
          return Card.compare(a.cards[i], b.cards[i]);
        }
      }
      throw new Error(`Should not happen. Cards are equal ${a} ${b}`);
    } else {
      return A - B;
    }
  }
}

export function createHandFromString(s: string): Hand {
  const cardLabels = s.split("");
  const cards: Card[] = [];
  console.assert(
    cardLabels.length === HAND_SIZE,
    `A hand should contain exactly ${HAND_SIZE} cards`
  );

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (isCardLabel(c)) {
      const _c = c as CardLabel;
      cards.push(new Card(_c));
    } else {
      throw new Error(`Invalid card label: ${c}`);
    }
  }

  const h = new Hand(cards);
  return h;
}
