// https://adventofcode.com/2023/day/6

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { isNumber } from "../utils/utils.ts";

class PuzzleSolver {
  constructor() {}

  parseInputToArrays(puzzleInput: string) {
    const lines = puzzleInput.split("\n");
    let headerSkipped = false;
    let parsingTimes = false;
    let parsingDistances = false;
    let numberParsing = "";

    const times = [];
    const distances = [];

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];
      parsingDistances = j === 1;
      parsingTimes = j === 0;
      let lineStr = "";

      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        lineStr += c;
        // console.log(c, headerSkipped);
        if (!headerSkipped) {
          if (c === ":") {
            headerSkipped = true;
          }
        } else {
          // parsing times
          if (parsingTimes) {
            if (c !== " ") {
              if (isNumber(c)) {
                numberParsing += c;
              }
            }

            if (c === " " || i === line.length - 1) {
              if (numberParsing.length > 0) {
                times.push(parseInt(numberParsing));
                numberParsing = "";
              }
            }
          }

          if (parsingDistances) {
            if (c !== " ") {
              if (isNumber(c)) {
                numberParsing += c;
              }
            }

            if (c === " " || i === line.length - 1) {
              if (numberParsing.length > 0) {
                distances.push(parseInt(numberParsing));
                numberParsing = "";
              }
            }
          }
        }
      }
      parsingTimes = false;
      parsingDistances = true;
      headerSkipped = false;
    }
    return { times, distances };
  }
}

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

helper.benchmark(async () => {
  if (puzzleIndex === 1) {
    puzzle1(puzzleInput);
    0;
  } else if (puzzleIndex === 2) {
    puzzle2(puzzleInput);
  } else {
    throw new Error("Invalid puzzle index");
  }
});

function puzzle1(recordsSheet: string) {
  const puzzleSolver = new PuzzleSolver();
  const { times, distances } = puzzleSolver.parseInputToArrays(recordsSheet);

  console.log("times:", times);
  console.log("distances:", distances);

  const racesCount = times.length;
  let winningStrategiesProduct = 1;
  for (let r = 0; r < racesCount; r++) {
    const raceTime = times[r]; // milliseconds. The max amount of time allowed
    const raceDistance = distances[r]; // millimeters. The record to beat

    let accumulatedSpeed = 0;
    let winningStrategies = 0;
    for (let holdingButtonTime = 0; holdingButtonTime <= raceTime; holdingButtonTime++) {
      accumulatedSpeed = holdingButtonTime;
      const remainingTime = raceTime - holdingButtonTime;
      const traveledDistance = accumulatedSpeed * remainingTime;
      if (traveledDistance > raceDistance) {
        winningStrategies += 1;
      }
      // console.log(holdingButtonTime, "ms", traveledDistance, "mm");
    }
    winningStrategiesProduct *= winningStrategies;
    console.log("totalWinningStrategies:", winningStrategies);
  }
  console.log("🚀 ~ winningStrategiesProduct:", winningStrategiesProduct);
}

function puzzle2(input: string) {
  throw "Not implemented";
}
