import { CellCoordinates } from "../day03/CellCoordinates.ts";
import { Graph, Node } from "./graph.ts";
import { DIR_AS_CELL_COORDINATES, Tile, TileType, TILE_DIRECTIONS } from "./tile.ts";

export class Grid {
  data: Tile[][] = [];
  rowCount: number;
  colCount: number;

  constructor(lines: string[]) {
    lines.forEach((l, lineIndex) => {
      const row = l
        .split("")
        .map((el, elIdx) => new Tile(el as TileType, lineIndex, elIdx));
      this.data.push(row);
    });

    this.rowCount = this.data.length;
    this.colCount = this.data[0].length;

    console.log(this.toString());
    console.log();
  }

  navigateLoop(start: Tile) {
    const graph = new Graph();
    const startNode = new Node(tileId(start));
    graph.addNode(startNode);
    let loopClosed = false;

    // navigate from start coords
    for (let i = 0; i < TILE_DIRECTIONS.length; i++) {
      let nextDirection = TILE_DIRECTIONS[i];
      let currentTile = new Tile().copy(start);
      let previousTile = new Tile().copy(currentTile);
      let exploring = true;

      while (exploring && loopClosed === false) {
        this.moveTileTo(currentTile, nextDirection);
        const nextTileValid =
          currentTile.coords.isIn(this.rowCount, this.colCount) &&
          currentTile.value !== ".";
        if (!nextTileValid) {
          exploring = false;
          break;
        }

        if (currentTile.value === "S") {
          loopClosed = true;
          graph.addEdge(
            graph.getNode(tileId(previousTile)),
            graph.getNode(tileId(currentTile))
          );
          break;
        }

        const tileConnected = currentTile.isConnectedTo(previousTile);
        if (!tileConnected || !nextTileValid) {
          exploring = false;
          break;
        }

        const nextCellAlreadyParsed = graph.hasNode(currentTile.toString());
        if (!nextCellAlreadyParsed) {
          const nn = new Node(tileId(currentTile));
          graph.addNode(nn);
          let previousTileNode: Node;
          if (graph.hasNode(tileId(previousTile))) {
            previousTileNode = graph.getNode(tileId(previousTile));
          } else {
            previousTileNode = new Node(tileId(previousTile));
          }
          graph.addEdge(previousTileNode, nn);
          previousTile.copy(currentTile);
        }

        nextDirection = this.updateDirection(nextDirection, currentTile.value);
      }
    }

    console.log(graph.toString());
  }

  updateDirection(
    direction: Readonly<CellCoordinates>,
    tileValue: TileType
  ): CellCoordinates {
    const { up, right, left, bottom } = DIR_AS_CELL_COORDINATES;

    switch (tileValue) {
      case "-":
      case "|":
        return direction;
      case "L":
        return direction.col === -1 ? up : right;
      case "7":
        return direction.col === 1 ? bottom : left;
      case "J":
        return direction.col === 1 ? up : left;
      case "F":
        return direction.col === -1 ? bottom : right;
      case ".":
        throw new Error("Invalid tile value");
    }
  }

  moveTileTo(tile: Tile, direction: Readonly<CellCoordinates>) {
    tile.coords.add(direction);
    if (tile.coords.isIn(this.rowCount, this.colCount)) {
      tile.value = this.data[tile.coords.row][tile.coords.col].value;
    } else {
      // throw new Error("Tile out of bounds");
    }
  }

  toString() {
    this.data.map((_, idx) => `${idx}`);
    return this.data.map((row) => row.join(" ")).join("\n");
  }
}

function tileId(tile: Tile) {
  return `${tile.coords.toString()}`;
}
