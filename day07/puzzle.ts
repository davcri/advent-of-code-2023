// https://adventofcode.com/2023/day/7

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { Hand, createHandFromString } from "./Hand.ts";

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

helper.benchmarkSync(() => {
  if (puzzleIndex === 1) {
    puzzle1(puzzleInput);
  } else if (puzzleIndex === 2) {
    puzzle2(puzzleInput);
  } else {
    throw new Error("Invalid puzzle index");
  }
});

type Game = { hand: Hand; bid: number };

function puzzle1(input: string) {
  const parsedInput = input.split("\n");
  const game: Game[] = [];

  parsedInput.map((parsedLine) => {
    const [hand, bid] = parsedLine.split(" ");
    game.push({ hand: createHandFromString(hand), bid: parseInt(bid) });
  });

  // game.forEach((g, index) => {
  //   const rank = index + 1;
  // console.log(g.hand.cards.toString(), g.hand.getType(), rank);
  // });

  game.sort((ga, gb) => Hand.compare(ga.hand, gb.hand));

  let totalWinnings = 0;
  game.forEach((g, index) => {
    const rank = index + 1;
    const winnings = g.bid * rank;
    totalWinnings += winnings;
    console.log(g.hand.cards.toString(), g.hand.getType(), rank);
  });
  console.log("🚀 ~ totalWinnings:", totalWinnings);

  // const winnings = bid *
  // console.log(createHandFromString("AAAAA").getType() === "FIVE_OF_A_KIND");
  // console.log(createHandFromString("AA8AA").getType() === "FOUR_OF_A_KIND");
  // console.log(createHandFromString("23332").getType() === "FULL_HOUSE");
  // console.log(createHandFromString("TTT98").getType() === "THREE_OF_A_KIND");
  // console.log(createHandFromString("23432").getType() === "TWO_PAIR");
  // console.log(createHandFromString("A23A4").getType() === "ONE_PAIR");
  // console.log(createHandFromString("23456").getType() === "HIGH_CARD");
}

function puzzle2(input: string) {
  throw "Not implemented";
}
