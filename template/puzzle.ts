// https://adventofcode.com/2023/day/

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

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
  throw "Not implemented";
}

function puzzle2(input: string) {
  throw "Not implemented";
}
