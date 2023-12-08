export class Node {
  position: string;
  left?: Node;
  right?: Node;
  parent?: Node;

  constructor(position: string, left?: Node, right?: Node, parent?: Node) {
    this.position = position;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}
