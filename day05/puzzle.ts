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
  const a = new Almanac(input, "seedValues");
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
  const a = new Almanac(input, "seedRanges");

  let lowestLocation = Infinity;

  for (let i = 0; i < a.seedRanges.length; i++) {
    console.log("start ", i);
    const seedRange = a.seedRanges[i];
    const timerId = `seedRange ${i} / ${a.seedRanges.length}`;
    console.time(timerId);
    for (let seed = seedRange[0]; seed <= seedRange[0] + seedRange[1]; seed++) {
      const location = a.getLocation(seed);
      lowestLocation = Math.min(lowestLocation, location);
    }
    console.log("TMP lowestLocation:", lowestLocation);
    console.timeEnd(timerId);
  }

  console.log("🚀 ~ lowestLocation:", lowestLocation);
}
