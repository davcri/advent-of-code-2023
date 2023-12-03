# Advent of Code 2023

https://adventofcode.com/2023/

## Run

```sh
./run.sh <day> <puzzle> <puzzle_input_file>

# example
./run.sh 02 1 day02/input.txt
```

## Things I want to explore

- [x] Deno minimal setup
- [x] https://docs.deno.com/runtime/manual/basics/debugging_your_code
- [ ] https://github.com/gvergnaud/ts-pattern#readme
- [ ] Deno tests
- [ ] https://github.com/sharkdp/hyperfine

## Deno

Deno manual: https://docs.deno.com/runtime/manual/


## Devember contract

> I, davcri, will participate to the next Devember.
My devember will be tinkering with TS with
Deno while solving Advent of Code puzzles.
I promise I will program for my Devember for at least
an hour, every day of the next December.
> I will also write a daily public devlog and will make
the produced code publicly available on the internet.
No matter what, I will keep my promise.

https://twitter.com/dav__cri/status/1731364220728475748

## Devember devlog

**Day 01** 

The AoC puzzle for day 1 was quite tough, Hopefully I decided to use TS which is a
language that I use almost every day.

I decided to try the Deno runtime. I skimmed through the documentation and I'm not particularly
excited about [how it handles external
dependencies](https://docs.deno.com/runtime/tutorials/manage_dependencies), but I still need to try
it out. I spent some time setting up a small [Benchmark utility](./utils/benchmark.ts) as
performance is becoming an obsession of mine.

**Day 02**

The AoC day 2 puzzle was easier than day 1, luckily 😅. I also had the pleasure of pair
programming the first part with a friend of mine. It was definitely more enjoyable than doing it
alone!

Having some extra energy I set up a [`PuzzleRunnerHelper`](./utils/puzzle-runner-helper.ts) to clean
up the `puzzle.ts` scripts from unnecessary noise.

**Day 03**

The AoC puzzle took me some time but it was fun. Matrices are always interesting.

In terms of dev utilities, I set up the [Deno
debugger](https://docs.deno.com/runtime/manual/basics/debugging_your_code) on VSCode, which helped
me a lot.
