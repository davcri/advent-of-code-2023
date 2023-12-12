// https://adventofcode.com/2023/day/

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";

type SpringData = {
  springsConditions: string;
  damagedGroups: number[];
};

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

/**
 * This was generated via ChatGPT. I still struggle with writing recursive functions, probably I
 * should exercise more.
 */
function generateCombinations(inputString: Readonly<string>) {
  const result: string[] = [];
  const recursiveGenerator = (currentString: string, index: number) => {
    if (index === inputString.length) {
      result.push(currentString);
      return;
    }
    if (inputString[index] === "?") {
      recursiveGenerator(currentString + ".", index + 1);
      recursiveGenerator(currentString + "#", index + 1);
    } else {
      recursiveGenerator(currentString + inputString[index], index + 1);
    }
  };
  recursiveGenerator("", 0);
  return result;
}

function validateData(springData: SpringData) {
  // extract contiguous ranges
  type Range = {
    startIndex: number;
    endIndex: number;
  };
  const contiguousDamagedGroups: Range[] = [];
  const tmp: Range = {
    startIndex: -1,
    endIndex: -1,
  };
  for (let i = 0; i < springData.springsConditions.length; i++) {
    const char = springData.springsConditions[i];
    if (char === "#") {
      if (tmp.startIndex === -1) {
        tmp.startIndex = i;
      }
    } else if (tmp.startIndex !== -1) {
      tmp.endIndex = i - 1;
      contiguousDamagedGroups.push({ ...tmp });
      tmp.startIndex = -1;
      tmp.endIndex = -1;
    }
  }
  if (tmp.startIndex !== -1) {
    tmp.endIndex = springData.springsConditions.length - 1;
    contiguousDamagedGroups.push({ ...tmp });
  }

  if (contiguousDamagedGroups.length !== springData.damagedGroups.length) {
    return false;
  }

  // validate contiguous ranges
  for (let i = 0; i < contiguousDamagedGroups.length; i++) {
    const rangeLength =
      contiguousDamagedGroups[i].endIndex - contiguousDamagedGroups[i].startIndex + 1;
    if (rangeLength !== springData.damagedGroups[i]) {
      return false;
    }
  }

  return true;
}

function extractData(line: string): SpringData {
  const [springsConditions, damagedGroupsStr] = line.split(" ");
  return {
    springsConditions,
    damagedGroups: damagedGroupsStr.split(",").map((s) => parseInt(s)),
  };
}

function puzzle1(input: string) {
  const data: SpringData[] = [];
  input.split("\n").forEach((line) => {
    const springData = extractData(line);
    data.push(springData);
  });

  const combinationsSum = calculateSum(data);
  console.log("SUM", combinationsSum);
  console.assert(combinationsSum < 105411, "Answer should be smaller");
}

function puzzle2(input: string) {
  throw "Not implemented";
}

function calculateSum(data: SpringData[]) {
  let sum = 0;
  data.forEach((springData) => {
    let validCombinations = 0;
    const combinations = generateCombinations(springData.springsConditions);
    combinations.forEach((c) => {
      const valid = validateData({
        damagedGroups: springData.damagedGroups,
        springsConditions: c,
      });
      if (valid) {
        validCombinations += 1;
      }
    });
    // console.log(springData.springsConditions, validCombinations);

    sum += validCombinations;
    validCombinations = 0;
    // console.log("----");
  });
  return sum;
}
