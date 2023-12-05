import { AlmanacRemappedRange } from "./AlmanacRemappedRange.ts";

/**
 * EG:
 * seed-to-soil map:
 * 50 98 2
 * 52 50 48
 *
 * Consists in 2 MapLines
 */
export class AlmanacMap {
  mapName: string;
  mapSrc: string; // derived from mapName
  mapDest: string; // derived from mapName

  remappedRanges: AlmanacRemappedRange[] = [];

  constructor(input: string) {
    const splittedInput = input.split("\n").filter((l) => l !== "");
    for (let index = 1; index < splittedInput.length; index++) {
      this.remappedRanges.push(new AlmanacRemappedRange(splittedInput[index]));
    }

    this.mapName = splittedInput[0].replace(":", "").replace(" map", "");
    const nameSplitted = this.mapName.split("-to-");
    this.mapSrc = nameSplitted[0];
    this.mapDest = nameSplitted[1];
  }

  getMappedValue(value: number): number {
    let remappedValue = value;
    for (let i = 0; i < this.remappedRanges.length; i++) {
      const line = this.remappedRanges[i];
      if (
        value < line.rangeSourceStart ||
        value > line.rangeSourceStart + line.rangeLength - 1 // TODO: check
      ) {
        continue;
      } else {
        remappedValue = line.rangeDestinationStart + value - line.rangeSourceStart;
      }
    }
    return remappedValue;
  }

  getNumbersInRange(): number[] {
    const numbers: Set<number> = new Set();
    for (let i = 0; i < this.remappedRanges.length; i++) {
      const line = this.remappedRanges[i];
      for (let j = 0; j < line.rangeLength; j++) {
        numbers.add(line.rangeSourceStart + j);
      }
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }
}
