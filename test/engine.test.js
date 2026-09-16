import test from "node:test";
import assert from "node:assert/strict";

import { slideRowLeft, mergeRowLeft, canLineMove } from "../src/engine.js";

test("slideRowLeft compacts non-zero values", () => {
  assert.deepEqual(slideRowLeft([2, 0, 4, 0]), [2, 4, 0, 0]);
});

test("mergeRowLeft merges one pair and reports score", () => {
  assert.deepEqual(mergeRowLeft([2, 2, 0, 0]), {
    row: [4, 0, 0, 0],
    scoreGained: 4,
  });
});

test("mergeRowLeft handles two independent pairs", () => {
  assert.deepEqual(mergeRowLeft([2, 2, 4, 4]), {
    row: [4, 8, 0, 0],
    scoreGained: 12,
  });
});

test("mergeRowLeft does not double-merge a newly created tile", () => {
  assert.deepEqual(mergeRowLeft([2, 2, 4, 0]), {
    row: [4, 4, 0, 0],
    scoreGained: 4,
  });
});

test("canLineMove detects adjacent equal non-zero values", () => {
  assert.equal(canLineMove([2, 2, 4, 8]), true);
  assert.equal(canLineMove([2, 4, 8, 16]), false);
});
