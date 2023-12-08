// https://adventofcode.com/2023/day/

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { Node } from "./Node.ts";

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
 * AAA = (BBB, CCC)
 */
function parseNavigationLine(line: string, idx: number) {
  const [start, connectionsStr] = line.split(" = ");
  const connections = connectionsStr.substring(1, connectionsStr.length - 1).split(", ");
  return { start, connections };
  // return new Node(start, new Node(connections[0]), new Node(connections[1]));
}

const DIRECTIONS = ["R", "L"] as const;
type Direction = (typeof DIRECTIONS)[number];

/**
 * ----------------
 * RL
 *
 * AAA = (BBB, CCC)
 * BBB = (DDD, EEE)
 * CCC = (ZZZ, GGG)
 * DDD = (DDD, DDD)
 * EEE = (EEE, EEE)
 * GGG = (GGG, GGG)
 * ZZZ = (ZZZ, ZZZ)
 * ----------------
 *
 * Naming:
 * RL -> directions
 * AAA -> start
 * [BBB, CCC] -> connections
 *
 * @param input
 */
function puzzle1(input: string) {
  const lines = input.split("\n");
  const navigationInstructions = lines[0].trim().split("") as Direction[];

  const navigationLinesParsed = lines
    .filter((l, idx) => idx > 1)
    .map((l, idx) => parseNavigationLine(l, idx));

  const navigationMap = new Map<string, { left: string; right: string }>();
  const startPos = "AAA";
  const endPos = "ZZZ";

  navigationLinesParsed.forEach((i) => {
    navigationMap.set(i.start, {
      left: i.connections[0],
      right: i.connections[1],
    });
  });

  let currentPos: string = startPos;
  let steps = 0;
  let endReached = false;

  console.log("🚀 ~ startPos:", startPos);
  console.log("🚀 ~ endPos:", endPos);

  do {
    const currentInstruction =
      navigationInstructions[steps % navigationInstructions.length];
    const nextDirections = navigationMap.get(currentPos);
    if (!nextDirections) {
      throw new Error("Invalid navigation instruction");
    } else {
      currentPos = nextDirections[currentInstruction === "R" ? "right" : "left"];
      steps += 1;
    }
    if (currentPos === endPos) {
      endReached = true;
    }
  } while (!endReached);

  console.log("🚀 ~ steps:", steps);
}

function puzzle2(input: string) {
  throw "Not implemented";
}
