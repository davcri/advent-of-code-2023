export class AlmanacRemappedRange {
  rangeDestinationStart: number;
  rangeSourceStart: number;
  rangeLength: number;

  /**
   * @param line EG: "50 98 2"
   * 50 is the destination range start
   * 98 is the source range start
   * 2 is the range length
   */
  constructor(line: string) {
    let splitted = line.split(" ");
    this.rangeDestinationStart = parseInt(splitted[0]);
    this.rangeSourceStart = parseInt(splitted[1]);
    this.rangeLength = parseInt(splitted[2]);

    if (
      isNaN(this.rangeDestinationStart) ||
      isNaN(this.rangeSourceStart) ||
      isNaN(this.rangeLength)
    ) {
      throw new Error(`Invalid map line:\n${line}`);
    }

    // for (let i = 0; i < rangeLength; i++) {
    // 16777216 is the max map size
    // if (this.mappings.size > 16777216 - 3) {
    //   console.log(this.mappings.size);
    // }
    // this.mappings.set(sourceRangeStart + i, destinationRangeStart + i);
    // }
  }
}
