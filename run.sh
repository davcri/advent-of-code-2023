#!/bin/sh
# Run the puzzle for the given day
# first arg: day number
# second arg: puzzle number

if [ $# -ne 2 ]
  then
    echo "Incorrect number of arguments supplied"
    echo "Usage: ./run.sh <day> <puzzle>"
    exit 1
fi

deno run --allow-read --allow-hrtime day$1/puzzle.ts $2
