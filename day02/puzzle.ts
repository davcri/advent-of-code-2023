// https://adventofcode.com/2023/day/2

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

console.log(`--------------------`);
console.log(`${import.meta.url} `);
console.log(`Puzzle #${puzzleIndex}`);
console.log(`--------------------`);
console.log();

helper.benchmark(async () => {
  if (puzzleIndex === 1) {
    await puzzle1(puzzleInput);
  } else if (puzzleIndex === 2) {
    await puzzle2(puzzleInput);
  } else {
    throw new Error("Invalid puzzle index");
  }
});

type CubeColor = "red" | "green" | "blue";
type CubeExtraction = Partial<Record<CubeColor, number>>;

async function puzzle1(input: string) {
  let lines = input.split("\n");
  lines = lines.filter((l) => l !== "");

  const availableCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let gameIdsSum = 0;

  lines.forEach((l) => {
    console.log(l);

    const [gameIdString, gameExtractions] = l.split(":");
    const gameId = Number(gameIdString.replace("Game ", ""));
    const extractionsList = gameExtractions.split(";").map((c) => c.trim());

    let isPossibleCombination = true;

    // console.log(revealedCubesList);
    extractionsList.forEach((c) => {
      const extractedCubes = c.split(", ");
      console.log("🚀 ~ extractedCubes:", extractedCubes);
      const currentExtraction: CubeExtraction = {};

      for (let index = 0; index < extractedCubes.length; index++) {
        const extractedCube = extractedCubes[index];
        const [count, color] = extractedCube.split(" ");
        currentExtraction[color as CubeColor] = Number(count);

        if (
          currentExtraction[color as CubeColor]! >
          availableCubes[color as CubeColor]
        ) {
          isPossibleCombination = false;
          break;
        }
      }
    });

    if (isPossibleCombination) {
      gameIdsSum += gameId;
    }

    console.log("-----");
  });

  console.log(gameIdsSum);
}

async function puzzle2(input: string) {
  function getCubesPower(minCubes: CubeExtraction) {
    return minCubes.red! * minCubes.green! * minCubes.blue!;
  }

  let lines = input.split("\n");
  lines = lines.filter((l) => l !== "");

  let gamePowerSumOfMinimumSetOfCubes = 0;

  lines.forEach((l) => {
    console.log(l);

    const [gameIdString, gameExtractions] = l.split(":");
    const gameId = Number(gameIdString.replace("Game ", ""));
    const extractionsList = gameExtractions.split(";").map((c) => c.trim());

    const minCubesNeededForGame: CubeExtraction = {
      red: 0,
      green: 0,
      blue: 0,
    };

    extractionsList.forEach((c) => {
      const extractedCubes = c.split(", ");

      for (let index = 0; index < extractedCubes.length; index++) {
        const extractedCube = extractedCubes[index];
        const [count, color] = extractedCube.split(" ");
        minCubesNeededForGame[color as CubeColor] = Math.max(
          minCubesNeededForGame[color as CubeColor]!,
          Number(count)
        );
        // currentExtraction[color as CubeColor] = Number(count);
      }
    });

    console.log("~ minCubesNeededForGame:", minCubesNeededForGame);
    const cubesPower = getCubesPower(minCubesNeededForGame);
    console.log("~ cubesPower:", cubesPower);
    gamePowerSumOfMinimumSetOfCubes += cubesPower;
    console.log("-----");
  });

  console.log();
  console.log(
    "🚀 ~ gamePowerSumOfMinimumSetOfCubes:",
    gamePowerSumOfMinimumSetOfCubes
  );
}
