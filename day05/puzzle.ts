// https://adventofcode.com/2023/day/5

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { Almanac } from "./Almanac.ts";

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
  // const maxSeeds = getMaxSeedNumber();
  // 4288802679

  const a = new Almanac(input);
  console.log("seeds:", a.seeds);
  console.log();

  let lowestLocation = Infinity;

  for (let i = 0; i < a.seeds.length; i++) {
    const seed = a.seeds[i];
    const location = a.getLocation(seed);
    lowestLocation = Math.min(lowestLocation, location);
  }

  console.log("🚀 ~ lowestLocation:", lowestLocation);
}

function puzzle2(input: string) {
  throw "Not implemented";
}

// TODO: refactor
function getMaxSeedNumber() {
  const input = helper._readFile("day05/input_dbg.txt");
  const lines = input.split("\n");
  let maxNum = 0;
  lines.forEach((l) => {
    const [n1, n2, n3] = l.split(" ").map((n) => parseInt(n));
    console.log(n1, n2, n3);
    maxNum = Math.max(maxNum, n1, n2, n3);
  });
  console.log("🚀 ~ maxNum:", maxNum);
  return maxNum;
}
