import { CellCoordinates } from "../day03/CellCoordinates.ts";

const TILE_TYPES = ["|", "-", "L", "J", "7", "F", "."] as const;

export type TileType = (typeof TILE_TYPES)[number];

export const TILE_DIRECTIONS = [
  new CellCoordinates(0, 1),
  // new CellCoordinates(1, 1), // south east
  new CellCoordinates(1, 0),
  // new CellCoordinates(1, -1),
  new CellCoordinates(0, -1),
  // new CellCoordinates(-1, -1),
  new CellCoordinates(-1, 0), // nord
  // new CellCoordinates(-1, 1), // north east
];

export const DIR_AS_CELL_COORDINATES = {
  right: new CellCoordinates(0, 1),
  left: new CellCoordinates(0, -1),
  up: new CellCoordinates(-1, 0),
  bottom: new CellCoordinates(1, 0),
};

export class Tile {
  value: TileType | "S";
  coords: CellCoordinates;

  constructor(value: TileType | "S" = "S", x: number = 0, y: number = 0) {
    this.value = value;
    this.coords = new CellCoordinates(x, y);
  }

  isConnectedTo(tile: Tile) {
    const { abs } = Math;
    const self = this.coords;
    const other = tile.coords;

    switch (this.value) {
      case "-":
        return self.row === other.row && abs(self.col - other.col) === 1;
      case "|":
        return self.col === other.col && abs(self.row - other.row) === 1;
      case "L":
        return (
          (self.col === other.col && other.row === self.row - 1) || // other tile is above
          (self.row === other.row && other.col === self.col + 1) // other tile is to the right
        );
      case "J":
        return (
          (self.col === other.col && other.row === self.row - 1) || // other tile is above
          (self.row === other.row && other.col === self.col - 1) // other tile is to the left
        );
      case "7":
        return (
          (self.col === other.col && other.row === self.row + 1) || // other tile is below
          (self.row === other.row && other.col === self.col - 1) // other tile is to the left
        );
      case "F":
        return (
          (self.col === other.col && other.row === self.row + 1) || // other tile is below
          (self.row === other.row && other.col === self.col + 1) // other tile is to the right
        );
      case "S":
        console.error("S Error maybe?");
        return false;
      case ".":
        console.error(". Error maybe?");
        return false;
    }
  }

  toString() {
    return `${this.value} ${this.coords.toString()}`;
  }

  copy(t: Tile) {
    this.value = t.value;
    this.coords = new CellCoordinates().copy(t.coords);
    return this;
  }
}
