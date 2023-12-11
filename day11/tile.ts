import { CellCoordinates } from "../day03/CellCoordinates.ts";

export type TileType = string;

export const TILE_DIRECTIONS = [
  new CellCoordinates(0, 1),
  new CellCoordinates(1, 0),
  new CellCoordinates(0, -1),
  new CellCoordinates(-1, 0), // nord
];

export const DIR_AS_CELL_COORDINATES = {
  right: new CellCoordinates(0, 1),
  left: new CellCoordinates(0, -1),
  up: new CellCoordinates(-1, 0),
  bottom: new CellCoordinates(1, 0),
};

export class Tile {
  value: TileType;
  coords: CellCoordinates;

  constructor(value: TileType, x: number = 0, y: number = 0) {
    this.value = value;
    this.coords = new CellCoordinates(x, y);
  }

  toString() {
    return `${this.value}`;
  }

  copy(t: Tile) {
    this.value = t.value;
    this.coords = new CellCoordinates().copy(t.coords);
    return this;
  }
}
