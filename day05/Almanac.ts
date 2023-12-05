import { isNumber } from "../utils/utils.ts";
import { AlmanacMap } from "./AlmanacMap.ts";

/**
 * The almanac lists all of the seeds that need to be planted.
 */
export class Almanac {
  seeds: number[];
  mapLines: AlmanacMap[];

  constructor(almanac: string, maxSeeds: number = 100) {
    const parsedAlmanac = this._parse(almanac);
    this.seeds = parsedAlmanac.seedsToPlant;
    this.mapLines = parsedAlmanac.mapStrings.map((l) => {
      const am = new AlmanacMap(l);
      return am;
    });
  }

  getLocation(seed: number): number {
    let mappedValue = seed;
    let str = `seed: ${seed},`;
    for (let i = 0; i < this.mapLines.length; i++) {
      const map = this.mapLines[i];
      mappedValue = map.getMappedValue(mappedValue);
      str += ` ${map.mapDest}: ${mappedValue},`;
      // location = map.computedMappings.get(location)!;
    }
    console.log("  ", str, "\n");
    return mappedValue;
  }

  _parse(almanac: string) {
    const lines = almanac
      .split("\n")
      .map((line) => line.trim())
      .filter((l) => l !== "");

    const seedsToPlant = lines[0]
      .split(": ")[1]
      .split(" ")
      .map((s) => parseInt(s));

    // NOTE: the following code can be optimized. Instead of manipulating strings it's probably
    // more efficient to store indexes of the lines and then use them to slice the string later.
    const mapStrings: string[] = [];
    let currentMapString = "";

    for (let index = 1; index < lines.length; index++) {
      const line = lines[index];
      const firstChar = line[0];
      const isNewMap = !isNumber(firstChar);

      if (isNewMap && currentMapString.length > 0) {
        mapStrings.push(currentMapString);
        currentMapString = "";
      }
      currentMapString += `${line}\n`;
    }

    mapStrings.push(currentMapString);

    return { seedsToPlant, mapStrings };
  }
}
