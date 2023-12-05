import { isNumber } from "../utils/utils.ts";
import { AlmanacMap } from "./AlmanacMap.ts";

/**
 * The almanac lists all of the seeds that need to be planted.
 */
export class Almanac {
  seeds: number[] = [];
  seedRanges: [number, number][] = [];
  mapLines: AlmanacMap[];

  constructor(almanac: string, conf: "seedValues" | "seedRanges") {
    const parsedAlmanac = this._parse(almanac, conf);
    if (conf === "seedValues") {
      this.seeds = parsedAlmanac.seedsToPlant! as number[];
      this.mapLines = parsedAlmanac.mapStrings.map((l) => {
        const am = new AlmanacMap(l);
        return am;
      });
    } else if (conf === "seedRanges") {
      this.seedRanges = parsedAlmanac.seedsToPlant! as [number, number][];
      this.mapLines = parsedAlmanac.mapStrings.map((l) => {
        const am = new AlmanacMap(l);
        return am;
      });
    } else {
      throw new Error("Invalid configuration");
    }
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
    // console.log("  ", str, "\n");
    return mappedValue;
  }

  _parse(almanac: string, conf: "seedValues" | "seedRanges") {
    const lines = almanac
      .split("\n")
      .map((line) => line.trim())
      .filter((l) => l !== "");

    const parseSeeds = () => {
      if (conf === "seedValues") {
        return lines[0]
          .split(": ")[1]
          .split(" ")
          .map((s) => parseInt(s));
      } else if (conf === "seedRanges") {
        const splits = lines[0]
          .split(": ")[1]
          .split(" ")
          .map((el) => parseInt(el));

        const ranges = [];
        for (let splitIndex = 0; splitIndex < splits.length / 2; splitIndex++) {
          ranges.push([splits[splitIndex * 2], splits[splitIndex * 2 + 1]]);
        }
        return ranges;
      }
    };
    const seedsToPlant = parseSeeds();

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
