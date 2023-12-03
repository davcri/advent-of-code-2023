export class CellCoordinates {
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
