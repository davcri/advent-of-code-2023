// https://adventofcode.com/2023/day/3

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { EngineSchematic } from "./EngineSchematic.ts";

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
  const engine = new EngineSchematic(input);
  const partNumbers = engine.getPartNumbers();
  let sum = 0;
  partNumbers.forEach((partNumber) => {
    sum += partNumber;
  });
  console.log("🚀 ~ part numbers sum:", sum);
}

function puzzle2(input: string) {
  const engine = new EngineSchematic(input);
  const gearRatios = engine.getGearRatios();
  let sum = 0;
  gearRatios.forEach((gr) => {
    sum += gr;
  });
  console.log("🚀 ~ gear ratios sum:", sum);
}
