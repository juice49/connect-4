# Connect 4

Given an array representing a Connect 4 game, `findWin` will return an array
containing the indexes of the first winning line found.

The search begins from the top left of the grid.

An example of game state:

```js
[
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, 1   , null, null, null, null, null,
  null, 0   , 1   , null, null, null, null,
  null, 0   , 0   , 1   , null, null, null,
  1   , 1   , 0   , 0   , 1   , 0   , null
]
```

The winning line is:

```js
[15, 23, 31, 39]
```

## Todo

- Implement a `placeCounter` function that produces a new game state with a given
players counter dropped on a given column.

## Ideas

- It may be (insignificantly) faster to search bottom up, because
counters are placed bottom up.
- To benchmark the code, we could look for longer lines in a larger grid.
