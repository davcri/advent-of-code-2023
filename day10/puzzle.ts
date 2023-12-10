// https://adventofcode.com/2023/day/10

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { Grid } from "./Grid.ts";

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

function puzzle1(input: string) {
  const grid = new Grid(input.split("\n"));
  grid.navigateLoop(grid.startingPoint!);
}

function puzzle2(input: string) {
  throw "Not implemented";
}
