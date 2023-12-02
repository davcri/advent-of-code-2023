export class Benchmark {
  t0?: number;
  t1?: number;

  constructor({ autostart = false }) {
    if (autostart) {
      this.start();
    }
  }

  start() {
    this.t0 = performance.now();
  }

  end({ log = false }) {
    if (!this.t0) {
      throw new Error("Benchmark not started");
    }

    this.t1 = performance.now();

    if (log) {
      console.log(`\nElapsed ${(this.t1 - this.t0).toFixed(3)} milliseconds.`);
    }
  }
}
