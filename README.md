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
> My devember will be tinkering with TS with
> Deno while solving Advent of Code puzzles.
> I promise I will program for my Devember for at least
> an hour, every day of the next December.
> I will also write a daily public devlog and will make
> the produced code publicly available on the internet.
> No matter what, I will keep my promise.

Devember: https://devember.org/rules/

My contract: https://twitter.com/dav__cri/status/1731364220728475748
https://twitter.com/dav__cri/status/1731364220728475748

## Devember devlog

### Day 01

The AoC puzzle for day 1 was quite tough, Hopefully I decided to use TS which is a
language that I use almost every day.

I decided to try the Deno runtime. I skimmed through the documentation and I'm not particularly
excited about [how it handles external
dependencies](https://docs.deno.com/runtime/tutorials/manage_dependencies), but I still need to try
it out. I spent some time setting up a small [Benchmark utility](./utils/) as
performance is becoming an obsession of mine.

### Day 02

The AoC day 2 puzzle was easier than day 1, luckily 😅. I also had the pleasure of pair programming
the first part with [rosepad21](https://github.com/rosepad21), a friend of mine. It was definitely
more enjoyable than doing it alone!

Having some extra energy I set up a [`PuzzleRunnerHelper`](./utils/puzzle-runner-helper.ts) to clean
up the `puzzle.ts` scripts from unnecessary noise.

### Day 03

The AoC puzzle took me some time but it was fun. Matrices are always interesting.

In terms of dev utilities, I set up the [Deno
debugger](https://docs.deno.com/runtime/manual/basics/debugging_your_code) on VSCode, which helped
me a lot.

### Day 04

I'm so glad I setup the debugger. Even if puzzles are still on the easy side, it helps a lot
to find trivial mistakes.

Regarding the solution I'm not completely satisfied as puzzle 2 takes 1800ms to compute on a M1 chip,
definitely too much time.

[UPDATE]: going from 1795ms to 170ms by memoizing one function.

<img src="https://github.com/davcri/advent-of-code-2023/assets/6860637/b0ecfaaf-b514-424e-9ae0-e8f024a86cd4" width=450  />
<img src="https://github.com/davcri/advent-of-code-2023/assets/6860637/bd2f0f84-f4b5-4a94-8cdc-fdadbb5863d5" width=450  />

I'm pretty sure there's still room for improvement as `cardNumbers` could be refactored to be a
`Set<number>` instead of an `array[number]`, however this is already a big improvement.

### Day 05

OMG I can't spend 3 hours a day on the AoC... However I found out the maximum size of a
Map in Deno (16777216):

<img src="./day05/max_map_size.png" width=450 alt="max_size_of_map_in_deno"  />

Clearly I relied too much on OOP abstractions: storing every range value in a map is a bad idea.
Unfortunately I didn't look at the problem input which had big numbers and completely destroyed my
first implementation.

Regarding puzzle 2, well it took 26 minutes:

![](./day05/puzzle2_time.png)

### Day 06

The puzzle was easier than the other days so I took a different approach to [input
parsing](https://github.com/davcri/advent-of-code-2023/blob/main/day06/puzzle.ts#L6). It's probably
silly to not use `.split()` and `replaceAll()` as I did for puzzle 2, but it was a fun mental exercise.

### Day 07

I love card games (look also at my [Triple Triad implementation](https://github.com/crystal-bit/triple-triad-godot) in Godot).

Using an OOP for this project helped a lot for puzzle 1. I still need to figure out puzzle 2
but I was pretty tired from the work week.

### Day 08

Puzzle 1 is taking an eternity to run, then I realized that I misinterpreted the starting and ending
positions. They are always "AAA" and "ZZZ" so they don't need to be parsed from the input.

I guess double checking is always a good idea.

Puzzle 2 is taking an eternity to run, for real this time.
I give up for now, maybe I'll redo it in the future.

### Day 09

This reminded me of the [Tartaglia's/Pascal's triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle).
Tricky problem but not too difficult to understand.

### Day 10

My idea was to run Dijkstra's algorithm where every weight is 1. Unfortunately I only managed to
build the graph data structure starting from the puzzle input (the boring part) and I still need to
write the Dijkstra's algorithm (the fun part).

<img src="https://github.com/davcri/advent-of-code-2023/assets/6860637/b74f49d0-815b-4fa2-826f-188bf0ab6c61" width=450  />

### Day 11

Managed to get 1 star thanks to the work done for day 10: I reused a lot of the grid and tile
classes. Actually I copy paste the source files, but that's because I was in a hurry.

Puzzle 2 seems doable using a more math approach: instead of expanding the matrix it should be
better to store the "expansion value" in the tile and then use it to calculate the correct
path length.

### Day 12

I'm getting some AoC fatigue: doing puzzles after 8h of daily work is not a breeze.

However I managed to get 1 star with some help from ChatGPT see https://github.com/davcri/advent-of-code-2023/blob/main/day12/puzzle.ts#L23-L43

I like using AI to assist in small tasks (note: I never used it to elaborate the puzzle logic).

Also with today's puzzle I managed to get more stars than last year!

<img width="450" alt="image" src="https://github.com/davcri/advent-of-code-2023/assets/6860637/4a7510d3-b077-4e1e-bd87-7a6c6acd60d6">

