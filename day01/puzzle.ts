// https://adventofcode.com/2023/day/1

import { Benchmark } from "../utils/benchmark.ts";
import { getAllIndices, isNumber } from "../utils/utils.ts";
import * as path from "https://deno.land/std@0.207.0/path/mod.ts";

type NumberWords =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine";

type NumberValuesString = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

const stringToNumber: Record<NumberWords, NumberValuesString> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};
const numberWords = Object.keys(stringToNumber) as NumberWords[];

function getCalibrationValue(line: string): number {
  let firstDigit = "";
  let lastDigit = "";

  let i = 0;
  let j = line.length - 1;

  while (true) {
    if (firstDigit !== "" && lastDigit !== "") break; // stop when both digits are found

    const cl = line[i]; // char from left
    const cr = line[j]; // char from right
    if (i > j) {
      if (firstDigit === "" && lastDigit !== "") {
        firstDigit = lastDigit;
      } else if (firstDigit !== "" && lastDigit === "") {
        lastDigit = firstDigit;
      } else {
        console.error("Something went wrong");
      }
      break;
    }

    // found in this iteration? These are used only for debug output
    let _firstDigitFound = false;
    let _lastDigitFound = false;

    if (firstDigit === "" && isNumber(cl)) {
      firstDigit = cl;
      _firstDigitFound = true;
    }

    if (lastDigit === "" && isNumber(cr)) {
      lastDigit = cr;
      _lastDigitFound = true;
    }

    const space = "     ";
    console.log(
      "   ",
      cl,
      _firstDigitFound && "first",
      space,
      cr,
      _lastDigitFound && "last"
    );

    if (firstDigit === "") {
      i += 1;
    }
    if (lastDigit === "") {
      j -= 1;
    }
  }

  return Number(firstDigit + lastDigit);
}

async function puzzle1(calibrationDocument: string) {
  let lines = calibrationDocument.split("\n");
  lines = lines.filter((l) => l !== "" && l[0] !== "#"); // exclude empty lines or line starting with #

  let calibrationValuesSum = 0;
  lines.forEach((l) => {
    console.log(`\n${l}`);
    const calibrationValue = getCalibrationValue(l);
    console.log(calibrationValue);
    calibrationValuesSum += calibrationValue;
  });

  console.log();
  console.log(`The calibration value is ${calibrationValuesSum}`);
}

function getCalibrationValue2(line: string): number {
  const chars = line.split("");
  const collectedNumbers: { num: string; appearIndex: number }[] = [];

  //
  chars.forEach((c, idx) => {
    if (isNumber(c)) {
      collectedNumbers.push({ num: c, appearIndex: idx });
    }
  });

  numberWords.forEach((word) => {
    const wordIndices = getAllIndices(line, word);
    wordIndices.forEach((wordIndex) => {
      if (wordIndex > -1) {
        collectedNumbers.push({
          num: stringToNumber[word as NumberWords],
          appearIndex: wordIndex,
        });
      }
    });
  });

  collectedNumbers.sort((a, b) => a.appearIndex - b.appearIndex);
  console.log(collectedNumbers.map((n) => n.num).join(""));

  const firstNumber = collectedNumbers[0].num;
  const lastNumber = collectedNumbers[collectedNumbers.length - 1].num;

  return Number(firstNumber + lastNumber);
}

async function puzzle2(calibrationDocument: string) {
  let lines = calibrationDocument.split("\n");
  lines = lines.filter((l) => l !== ""); // exclude empty lines or line starting with #
  let calibrationValuesSum = 0;

  lines.forEach((l, idx) => {
    console.log(`\n--- iter ${idx}`);
    console.log(l);
    const calibrationValue = getCalibrationValue2(l);
    console.log(calibrationValue);
    calibrationValuesSum += calibrationValue;
  });

  console.log();
  console.log(`The calibration value is ${calibrationValuesSum}`);
}

const bench = new Benchmark({ autostart: true });

const args = Deno.args;
// if args is empty error. If puzzle index specified use puzzle1 or puzzle2
if (args.length === 0) {
  throw new Error("Please specify puzzle index");
}
const puzzleIndex = args[0];

// directory of the current script
const __dirname = new URL(".", import.meta.url).pathname;
const puzzleInput = path.join(__dirname, "input.txt");
const calibrationDocument: string = await Deno.readTextFile(puzzleInput);

if (puzzleIndex === "1") {
  await puzzle1(calibrationDocument);
} else if (puzzleIndex === "2") {
  await puzzle2(calibrationDocument);
} else {
  throw new Error("Invalid puzzle index");
}

bench.end({ log: true });
