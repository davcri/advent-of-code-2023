const CARD_LABELS = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

const CARD_VALUES = CARD_LABELS.map((c, idx) => CARD_LABELS.length - idx);

export type CardLabel = (typeof CARD_LABELS)[number];

export const isCardLabel = (l: string): l is CardLabel =>
  CARD_LABELS.includes(l as CardLabel);

export class Card {
  label: CardLabel;

  constructor(l: CardLabel) {
    this.label = l;
  }

  copy(c: Card) {
    this.label = c.label;
  }

  static compare(a: Card, b: Card) {
    return (
      CARD_VALUES[CARD_LABELS.indexOf(a.label)] -
      CARD_VALUES[CARD_LABELS.indexOf(b.label)]
    );
  }
}
