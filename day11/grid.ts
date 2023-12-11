import { Tile, TileType } from "./tile.ts";

export class Grid {
  data: Tile[][] = [];

  constructor(lines: string[]) {
    lines.forEach((l, lineIndex) => {
      const row = l
        .split("")
        .map((el, elIdx) => new Tile(el as TileType, lineIndex, elIdx));
      this.data.push(row);
    });
  }

  get rowCount() {
    return this.data.length;
  }

  get colCount() {
    return this.data[0].length;
  }

  updateTileCoords() {
    this.data.forEach((row, i) => {
      row.forEach((tile, j) => {
        tile.coords.row = i;
        tile.coords.col = j;
      });
    });
    return this;
  }

  clone(): Grid {
    const grid = new Grid([]);
    grid.data = this.data.map((row) => row.map((tile) => new Tile(tile.value)));
    return grid;
  }

  transpose() {
    const transposedData: Tile[][] = [];

    for (let col = 0; col < this.colCount; col++) {
      const transposedRow: Tile[] = [];
      for (let row = 0; row < this.rowCount; row++) {
        transposedRow.push(this.data[row][col]);
      }
      transposedData.push(transposedRow);
    }

    const transposedGrid = new Grid([]);
    transposedGrid.data = transposedData;
    return transposedGrid;
  }

  toString() {
    return this.data.map((row) => row.join(" ")).join("\n");
  }
}
