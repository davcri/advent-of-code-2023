import { Benchmark } from "./benchmark.ts";

export class PuzzleRunnerHelper {
  puzzleIndex: number;
  puzzleInput: string;

  bench = new Benchmark({ autostart: false });

  constructor() {
    const parsedArgs = this._parseArgs(Deno.args);
    this.puzzleIndex = parsedArgs.puzzleIndex;

    this.puzzleInput = Deno.realPathSync(parsedArgs.puzzleInputPath);
    this.puzzleInput = this._readFile(this.puzzleInput);
  }

  _readFile(path: string) {
    const decoder = new TextDecoder("utf-8");
    const data = Deno.readFileSync(path);
    return decoder.decode(data);
  }

  _parseArgs(args: string[]) {
    if (Deno.args.length === 0) {
      throw new Error("Please specify puzzle index");
    }
    const index = args[0];
    console.assert(index === "1" || index === "2", `Invalid puzzle index ${index}`);
    return { puzzleIndex: Number(index), puzzleInputPath: args[1] };
  }

  benchmark(fun: () => Promise<void>) {
    this.bench.start();
    fun();
    this.bench.end({ log: true });
  }

  benchmarkSync(fun: () => void) {
    this.bench.start();
    fun();
    this.bench.end({ log: true });
  }
}
