// https://adventofcode.com/2023/day/

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { Grid } from "./grid.ts";
import { Tile } from "./tile.ts";

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
  const expandedUniverseRepresentation = expandUniverse(grid);
  const pairs = findGalaxyPairs(expandedUniverseRepresentation);
  let distancesSum = 0;
  pairs.forEach((pair, pairKey) => {
    const distance =
      Math.abs(pair[0].coords.row - pair[1].coords.row) +
      Math.abs(pair[0].coords.col - pair[1].coords.col);
    distancesSum += distance;
    // console.log(`Distance for pair ${pairKey} is ${distance}`);
  });
  console.log("🚀 ~ distancesSum:", distancesSum);
}

function expandUniverse(universe: Grid) {
  let expanded: Grid = new Grid([]);

  // expand rows
  for (let i = 0; i < universe.rowCount; i++) {
    const row = universe.data[i];
    expanded.data.push(row);
    const expandRow = row.every((c) => c.value === ".");
    if (expandRow) {
      expanded.data.push(row);
    }
  }

  expanded = expanded.transpose();

  const finalExpanded = new Grid([]);
  // expand rows
  for (let i = 0; i < expanded.rowCount; i++) {
    const row = expanded.data[i];
    finalExpanded.data.push(row);
    const expandRow = row.every((c) => c.value === ".");
    if (expandRow) {
      finalExpanded.data.push(row);
    }
  }

  return finalExpanded.transpose().updateTileCoords();
}

function findGalaxyPairs(grid: Grid) {
  const pairsMapKey = (t1: Tile, t2: Tile) =>
    t1.coords.toString() + "_" + t2.coords.toString();
  const pairs = new Map<string, [Tile, Tile]>();
  const galaxies: Tile[] = [];

  for (let i = 0; i < grid.data.length; i++) {
    const row = grid.data[i];
    for (let j = 0; j < row.length; j++) {
      const tile = row[j];
      if (tile.value !== ".") {
        // is galaxy
        galaxies.push(tile);
      }
    }
  }

  for (let i = 0; i < galaxies.length; i++) {
    const g = galaxies[i];
    for (let j = 0; j < galaxies.length; j++) {
      const g2 = galaxies[j];
      if (g !== g2) {
        const pairKey = pairsMapKey(g, g2);
        const reversedPairKey = pairsMapKey(g2, g);
        if (!pairs.has(pairKey) && !pairs.has(reversedPairKey)) {
          pairs.set(pairKey, [g, g2]);
        }
      }
    }
  }
  return pairs;
}

function puzzle2(input: string) {
  throw "Not implemented";
}
