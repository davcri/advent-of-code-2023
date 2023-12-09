// https://adventofcode.com/2023/day/9

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

helper.benchmarkSync(() => {
  if (puzzleIndex === 1 || puzzleIndex === 2) {
    puzzle(puzzleInput, puzzleIndex);
  } else {
    throw new Error("Invalid puzzleIndex");
  }
});

function puzzle(input: string, puzzleIndex: 1 | 2) {
  const lines = input.split("\n");
  let extrapolatedValuesSum = 0;
  for (let idx = 0; idx < lines.length; idx++) {
    const historyLine = lines[idx];
    const parsedNumbers = historyLine.split(" ").map((n) => parseInt(n));
    const extrapolatedValue = extrapolate(
      parsedNumbers,
      puzzleIndex === 1 ? extrapolateForward : extrapolateBackward,
      false
    );
    extrapolatedValuesSum += extrapolatedValue;
  }
  console.log("🚀 ~ extrapolatedValuesSum:", extrapolatedValuesSum);
}

function extrapolate(
  historyLine: number[],
  extrapolateValueFn: (sequences: number[][], log: boolean) => number,
  log = false
) {
  let canExtrapolate = false;
  const newSequences: number[][] = [[...historyLine]];
  let newSequence: number[] = [];
  let currentSequence = historyLine;
  if (log) {
    console.log("-----");
    console.log("🚀 ~ historyLine:", historyLine);
  }

  while (!canExtrapolate) {
    let allZeros = true;
    newSequence = [];

    for (let i = 1; i < currentSequence.length; i++) {
      newSequence.push(currentSequence[i] - currentSequence[i - 1]);
      if (newSequence[i - 1] !== 0) {
        allZeros = false;
      }
    }

    newSequences.push(newSequence);
    currentSequence = newSequence;

    if (allZeros) {
      canExtrapolate = true;
      break;
    }
  }

  if (log) {
    newSequences.map((s) => console.log(s.join(" ")));
  }

  return extrapolateValueFn(newSequences, log);
}

function extrapolateForward(seqs: number[][], log = false) {
  for (let i = seqs.length - 2; i >= 0; i--) {
    const curSeq = seqs[i];
    const nextSeq = seqs[i + 1]; // the sequence with fewer numbers
    const extrapolatedValue = curSeq[curSeq.length - 1] + nextSeq[nextSeq.length - 1];
    curSeq.push(extrapolatedValue);
    seqs[i] = curSeq;
  }
  if (log) seqs.map((s) => console.log(s.join(" ")));

  return seqs[0][seqs[0].length - 1];
}

function extrapolateBackward(seqs: number[][], log = false) {
  for (let i = seqs.length - 2; i >= 0; i--) {
    const curSeq = seqs[i];
    const nextSeq = seqs[i + 1]; // the sequence with fewer numbers
    const extrapolatedValue = curSeq[0] - nextSeq[0];
    // add at beginning
    curSeq.unshift(extrapolatedValue);
    seqs[i] = curSeq;
  }

  if (log) {
    console.log();
    seqs.map((s) => console.log(s.join(" ")));
  }

  return seqs[0][0];
}
