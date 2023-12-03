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

  isIn(rows: number, cols: number): boolean {
    return this.row >= 0 && this.row < rows && this.col >= 0 && this.col < cols;
  }

  add(other: CellCoordinates): CellCoordinates {
    this.row += other.row;
    this.col += other.col;
    return this;
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
    let row: string[] = [];

    lines.forEach((l, idx) => {
      row = [];
      for (let i = 0; i < l.length; i++) {
        const cellValue = l[i];
        row.push(cellValue);
        if (!this.symbols.has(cellValue) && cellValue !== "." && !isNumber(cellValue)) {
          this.symbols.add(cellValue);
        }
      }
      this.schematics.push(row);
    });

    console.log(this.symbols);
    console.log();
  }

  isSymbol(c: string) {
    return this.symbols.has(c);
  }

  _findPartNumberStartCoordinate(cc: Readonly<CellCoordinates>): CellCoordinates {
    const sc = new CellCoordinates(cc.row, cc.col); // start coordinate
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

  isGear(cell: string) {
    return cell === "*";
  }

  getPartNumbers() {
    const { schematicCols, schematicRows, schematics } = this;
    const partNumbers = new Map<string, number>(); // key: cell coordinates as string , value: part number
    for (let row = 0; row < schematicRows; row++) {
      let rowString = "";
      for (let col = 0; col < schematicCols; col++) {
        const cell = schematics[row][col];
        if (this.isSymbol(cell)) {
          this.checkAdjacentCellsForPartNumbers(
            new CellCoordinates(row, col),
            partNumbers
          );
        }
        rowString += `${cell}`;
      }
    }
    return partNumbers;
  }

  getGearRatios() {
    const { schematicCols, schematicRows, schematics } = this;
    const gearRatios = new Map<string, number>(); // key: cell coordinates as string , value: gear ratio
    for (let row = 0; row < schematicRows; row++) {
      let rowString = "";
      for (let col = 0; col < schematicCols; col++) {
        const cell = schematics[row][col];
        if (this.isGear(cell)) {
          this.checkAdjacentCellsForGears(new CellCoordinates(row, col), gearRatios);
        }
        rowString += `${cell}`;
      }
    }
    return gearRatios;
  }

  checkAdjacentCellsForGears(
    cc: Readonly<CellCoordinates>,
    gearRatios: Map<string, number>
  ) {
    const { schematicCols, schematicRows, schematics } = this;

    const dirs = [
      new CellCoordinates(0, 1), // east
      new CellCoordinates(1, 1), // south east
      new CellCoordinates(1, 0), // south
      new CellCoordinates(1, -1), // south west
      new CellCoordinates(0, -1), // west
      new CellCoordinates(-1, -1), // north west
      new CellCoordinates(-1, 0), // north
      new CellCoordinates(-1, 1), // north east
    ];

    const localPartNumbers = new Map<string, number>();

    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const newCoordinate = new CellCoordinates(cc.row + dir.row, cc.col + dir.col);
      if (!newCoordinate.isIn(schematicRows, schematicCols)) {
        console.log("skipping ", newCoordinate.toString());
        continue;
      }

      const cellValue = schematics[newCoordinate.row][newCoordinate.col];
      if (isNumber(cellValue)) {
        const startIndex = this._findPartNumberStartCoordinate(newCoordinate);

        if (!localPartNumbers.has(startIndex.toString())) {
          const partNumber = this._readPartNumber(startIndex);
          localPartNumbers.set(startIndex.toString(), partNumber);
        }
      }
    }

    if (localPartNumbers.size === 2) {
      const partNumbers = Array.from(localPartNumbers.values());
      const gearRatio = partNumbers[0] * partNumbers[1];
      gearRatios.set(cc.toString(), gearRatio);
    }
  }

  checkAdjacentCellsForPartNumbers(
    cc: Readonly<CellCoordinates>,
    partNumbers: Map<string, number>
  ) {
    const { schematicCols, schematicRows, schematics } = this;

    const dirs = [
      new CellCoordinates(0, 1), // east
      new CellCoordinates(1, 1), // south east
      new CellCoordinates(1, 0), // south
      new CellCoordinates(1, -1), // south west
      new CellCoordinates(0, -1), // west
      new CellCoordinates(-1, -1), // north west
      new CellCoordinates(-1, 0), // north
      new CellCoordinates(-1, 1), // north east
    ];

    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const newCoordinate = new CellCoordinates(cc.row + dir.row, cc.col + dir.col);
      if (!newCoordinate.isIn(schematicRows, schematicCols)) {
        console.log("skipping ", newCoordinate.toString());
        continue;
      }

      const cellValue = schematics[newCoordinate.row][newCoordinate.col];
      if (isNumber(cellValue)) {
        const startIndex = this._findPartNumberStartCoordinate(newCoordinate);
        if (!partNumbers.has(startIndex.toString())) {
          const partNumber = this._readPartNumber(startIndex);
          partNumbers.set(startIndex.toString(), partNumber);
        }
      }
    }
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
  const partNumbers = engine.getPartNumbers();
  let sum = 0;
  partNumbers.forEach((partNumber) => {
    sum += partNumber;
  });
  console.log("🚀 ~ part numbers sum:", sum);
}

async function puzzle2(input: string) {
  const engine = new EngineSchematic(puzzleInput);
  const gearRatios = engine.getGearRatios();
  // console.log("🚀 ~ gearRatios:", gearRatios);

  let sum = 0;
  gearRatios.forEach((gr) => {
    sum += gr;
  });
  console.log("🚀 ~ gear ratios sum:", sum);
}
