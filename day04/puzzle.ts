// https://adventofcode.com/2023/day/4

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

/**
 * @note I really don't like this implementation. It doesn't seem intuitive to me.
 * @param line
 */
function parseLineAsNumbers(line: string): number[] {
  const numbers = line
    .split(" ")
    .filter((n) => n !== "") // Take into account that between each number there could be multiple spaces
    .map((n) => parseInt(n));
  return numbers;
}

class Scratchcard {
  winningNumbers: number[];
  cardNumbers: number[];
  _memoizedMatches: number[] | undefined;

  /**
   * @param scratchcard <winning numbers> | <cardNumbers>
   * EG: "41 48 83 86 17 | 83 86 6 31 17 9 48 53"
   */
  constructor(scratchcard: string) {
    const parsed = this.parse(scratchcard);
    this.winningNumbers = parsed.winningNumbers;
    this.cardNumbers = parsed.cardNumbers;
  }

  parse(line: string): { winningNumbers: number[]; cardNumbers: number[] } {
    const splittedLine = line.split(" | ");
    const winningNumbers = parseLineAsNumbers(splittedLine[0]);
    const cardNumbers = parseLineAsNumbers(splittedLine[1]);
    return {
      winningNumbers,
      cardNumbers,
    };
  }

  getWinningNumberMatches(): number[] {
    if (this._memoizedMatches !== undefined) {
      return this._memoizedMatches;
    }
    const matches: number[] = [];
    this.winningNumbers.forEach((winningNumber) => {
      if (this.cardNumbers.includes(winningNumber)) {
        matches.push(winningNumber);
      }
    });
    this._memoizedMatches = matches;
    return matches;
  }
}

class ScratchcardPile {
  scratchcards: Scratchcard[];

  constructor(scratchcardPile: string) {
    const cards = scratchcardPile.split("\n").map((line) => {
      const split = line.split(": ");
      return split[1].trim();
    });

    this.scratchcards = cards.map((line) => new Scratchcard(line));
  }

  getScore(): number {
    let totalScore = 0;
    this.scratchcards.forEach((card) => {
      let cardScore = 0;
      const matches = card.getWinningNumberMatches();
      matches.forEach((match) => {
        if (cardScore === 0) {
          cardScore = 1;
        } else {
          cardScore *= 2;
        }
      });
      totalScore += cardScore;
    });
    return totalScore;
  }

  getScratchcardsTotal(): number {
    let totalScratchcards = 0;
    const cardDuplicates = new Map<number, number>(); // <card id, duplicates count>

    this.scratchcards.forEach((card, cardIndex) => {
      const cardsCount = 1 + (cardDuplicates.get(cardIndex) ?? 0);
      for (let duplicateIndex = 0; duplicateIndex < cardsCount; duplicateIndex++) {
        totalScratchcards += 1;
        const wnMatches = card.getWinningNumberMatches();
        wnMatches.forEach((m, matchIndex) => {
          const currentCardDuplicates =
            cardDuplicates.get(cardIndex + 1 + matchIndex) ?? 0;
          cardDuplicates.set(cardIndex + 1 + matchIndex, currentCardDuplicates + 1);
        });
      }
    });

    return totalScratchcards;
  }
}

helper.benchmark(async () => {
  if (puzzleIndex === 1) {
    puzzle1(puzzleInput);
  } else if (puzzleIndex === 2) {
    puzzle2(puzzleInput);
  } else {
    throw new Error("Invalid puzzle index");
  }
});

function puzzle1(input: string) {
  const pile = new ScratchcardPile(input);
  console.log("🚀 ~ pile.getScore():", pile.getScore());
}

function puzzle2(input: string) {
  const pile = new ScratchcardPile(input);
  const result = pile.getScratchcardsTotal();
  console.log("🚀 ~ pile.getScratchcardsTotal():", result);
}
