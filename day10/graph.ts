// create a graph data structure, suitable for applying Dijkstra's algorithm

export class Node {
  id: string;
  edges: Edge[] = [];
  visited: boolean = false;
  distance: number = Infinity;
  previousNode: Node | undefined;

  constructor(id: string) {
    this.id = id;
  }

  addEdge(edge: Edge) {
    this.edges.push(edge);
  }
}

export class Edge {
  from: Node;
  to: Node;
  weight: number;

  constructor(from: Node, to: Node, weight: number = 1) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  toString() {
    return `${this.from.id} -> ${this.to.id}`;
  }
}

export class Graph {
  nodes: Map<string, Node> = new Map();

  addNodeFromStr(id: string) {
    const node = new Node(id);
    this.nodes.set(id, node);
    return node;
  }

  addNode(node: Node) {
    this.nodes.set(node.id, node);
    return node;
  }

  addEdge(from: Node, to: Node, weight: number = 1) {
    const edge = new Edge(from, to, weight);
    from.addEdge(edge);
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  getNode(id: string): Node {
    const node = this.nodes.get(id);
    if (node === undefined) throw new Error(`Node not found: ${id}`);
    return node;
  }

  getNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  toString(): string {
    return Array.from(this.nodes.values())
      .map((n) => {
        return `${n.id} -> ${n.edges.map((e) => `${e.to.id}`).join(", ")}`;
      })
      .join("\n");
  }
}

export function bfs(start: Node) {
  const queue: Node[] = [];
  queue.push(start);
  start.visited = true;

  while (queue.length > 0) {
    const current = queue.shift()!;
    console.log("🚀 ~ bfs ~ current", current.id);
    current.edges.forEach((edge) => {
      const next = edge.to;
      if (!next.visited) {
        next.visited = true;
        queue.push(next);
      }
    });
  }
}

export function dfs(start: Node) {
  const stack: Node[] = [];
  stack.push(start);
  start.visited = true;

  while (stack.length > 0) {
    const current = stack.pop()!;
    console.log("🚀 ~ dfs ~ current", current.id);
    current.edges.forEach((edge) => {
      const next = edge.to;
      if (!next.visited) {
        next.visited = true;
        stack.push(next);
      }
    });
  }
}
