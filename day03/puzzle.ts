// https://adventofcode.com/2023/day/3

import { PuzzleRunnerHelper } from "../utils/puzzle-runner-helper.ts";
import { isNumber } from "../utils/utils.ts";

class CellCoordinates {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  toString(): string {
    return `(${this.row}, ${this.col})`;
  }
}

class EngineSchematic {
  schematics: string[][] = [];
  schematicRows: number;
  schematicCols: number;
  symbols: Set<string> = new Set();

  constructor(blueprint: string) {
    let lines = blueprint.split("\n");
    lines = lines.filter((l) => l !== "");

    this.schematicRows = lines.length;
    this.schematicCols = lines[0].length;

    console.log(
      "🚀 ~ schematic Rows Cols:",
      this.schematicRows,
      this.schematicCols
    );

    let row: string[] = [];

    lines.forEach((l, idx) => {
      row = [];
      for (let i = 0; i < l.length; i++) {
        const cellValue = l[i];
        row.push(cellValue);
        if (
          !this.symbols.has(cellValue) &&
          cellValue !== "." &&
          !isNumber(cellValue)
        ) {
          this.symbols.add(cellValue);
        }
      }
      this.schematics.push(row);
    });

    console.log(this.symbols);
  }

  isSymbol(c: string) {
    return this.symbols.has(c);
  }

  _findPartNumberStartCoordinate(cc: CellCoordinates): CellCoordinates {
    let sc = new CellCoordinates(cc.row, cc.col); // start coordinate
    while (sc.col > 0 && isNumber(this.schematics[sc.row][sc.col - 1])) {
      sc.col--;
    }
    return sc;
  }

  /**
   * @param sc start coordinate
   */
  _readPartNumber(sc: CellCoordinates): number {
    let x = sc.col;
    let parsedNum = "";
    let currentNum = this.schematics[sc.row][x];
    while (x < this.schematicCols && isNumber(currentNum)) {
      parsedNum += currentNum;
      x++;
      currentNum = this.schematics[sc.row][x];
    }
    const num = Number(parsedNum);
    if (isNaN(num)) throw new Error(`Invalid part number: ${parsedNum}`);
    return num;
  }

  getPartNumbers() {
    const { schematicCols, schematicRows, schematics } = this;
    const partNumbers = new Map<string, number>(); // key: cell coordinates as string , value: part number
    const checkAdjacentCells = (cc: CellCoordinates) => {
      // check east
      if (cc.col + 1 < schematicCols) {
        const cellValue = schematics[cc.row][cc.col + 1];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row,
            col: cc.col + 1,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check south east
      if (cc.col + 1 < schematicCols && cc.row + 1 < schematicRows) {
        const cellValue = schematics[cc.row + 1][cc.col + 1];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row + 1,
            col: cc.col + 1,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check south
      if (cc.row + 1 < schematicRows) {
        const cellValue = schematics[cc.row + 1][cc.col];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row + 1,
            col: cc.col,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check south west
      if (cc.row === 5) debugger;
      if (cc.col - 1 >= 0 && cc.row + 1 < schematicRows) {
        const cellValue = schematics[cc.row + 1][cc.col - 1];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row + 1,
            col: cc.col - 1,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check west
      if (cc.col - 1 >= 0) {
        const cellValue = schematics[cc.row][cc.col - 1];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row,
            col: cc.col - 1,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check north west
      if (cc.col - 1 >= 0 && cc.row - 1 >= 0) {
        const cellValue = schematics[cc.row - 1][cc.col - 1];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row - 1,
            col: cc.col - 1,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check north
      if (cc.row - 1 >= 0) {
        const cellValue = schematics[cc.row - 1][cc.col];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row - 1,
            col: cc.col,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
      // check north east
      if (cc.col + 1 < schematicCols && cc.row - 1 >= 0) {
        const cellValue = schematics[cc.row - 1][cc.col + 1];
        if (isNumber(cellValue)) {
          const startIndex = this._findPartNumberStartCoordinate({
            row: cc.row - 1,
            col: cc.col + 1,
          });
          if (partNumbers.has(startIndex.toString())) {
          } else {
            const partNumber = this._readPartNumber(startIndex);
            partNumbers.set(startIndex.toString(), partNumber);
          }
        }
      }
    };
    for (let row = 0; row < schematicRows; row++) {
      let rowString = "";
      for (let col = 0; col < schematicCols; col++) {
        const cell = schematics[row][col];
        if (this.isSymbol(cell)) {
          checkAdjacentCells({ row, col });
        }
        rowString += `${cell}`;
      }
    }
    return partNumbers;
  }

  printSchematics() {
    const { schematicCols, schematicRows, schematics } = this;
    for (let row = 0; row < schematicRows; row++) {
      let rowString = "";
      for (let col = 0; col < schematicCols; col++) {
        const cell = schematics[row][col];
        rowString += `${cell}`;
      }
      console.log(rowString);
    }
  }
}

const helper = new PuzzleRunnerHelper();
const { puzzleIndex, puzzleInput } = helper;

helper.benchmark(async () => {
  if (puzzleIndex === 1) {
    await puzzle1(puzzleInput);
  } else if (puzzleIndex === 2) {
    await puzzle2(puzzleInput);
  } else {
    throw new Error("Invalid puzzle index");
  }
});

async function puzzle1(puzzleInput: string) {
  const engine = new EngineSchematic(puzzleInput);
  // engine.printSchematics();
  const partNumbers = engine.getPartNumbers();
  let sum = 0;
  partNumbers.forEach((partNumber) => {
    sum += partNumber;
  });
  console.log("🚀 ~ sum:", sum);
}

async function puzzle2(input: string) {}
