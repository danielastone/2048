# 2048

A browser-based 2048 implementation being developed as a broader experimental platform for board geometry, gameplay analytics, reinforcement learning, and adversarial spawn strategies.

## Current state

The repository currently contains a playable 4×4 browser implementation with:

- directional tile movement and merging;
- score tracking;
- graph-based board representation;
- automatic tile spawning;
- move logging and board hashing for analytics/debugging;
- browser-accessible debug state through `window.debug2048`.

This is an early development version, not a finished product.

## Architecture

- `index.html` — browser entry point
- `styles.css` — game presentation
- `src/game.js` — game state, rendering, input handling, and move orchestration
- `src/engine.js` — line sliding, merging, and move detection
- `src/graph.js` — square-grid graph and directional lane construction
- `src/spawn.js` — spawn-selection logic
- `src/analytics.js` — board hashes and move records

## Development roadmap

The intended architecture extends beyond a conventional 2048 clone:

1. Generalize the engine from the current 4×4 implementation to multiple board sizes and geometries.
2. Separate deterministic game-state transitions from browser rendering and input.
3. Expand the analytics suite for reproducible game histories and strategy evaluation.
4. Add configurable spawn policies, including manual and adversarial spawning.
5. Build simulation APIs suitable for reinforcement-learning agents.
6. Add automated regression, property, and strategy tests before expanding the UI.

## Known limitations

The graph layer already accepts arbitrary square sizes, but the line engine still contains 4-cell assumptions, so alternate board sizes are not yet supported end-to-end. Manual spawn support is also incomplete and should not yet be treated as production functionality.

## Run locally

Because the application uses JavaScript modules, serve the project through a local web server rather than relying on `file://` loading.

For example, from the repository root with Python installed:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Tests

The project uses Node's built-in test runner and has no test-framework dependency.

```powershell
npm test
```

## Licensing

This repository is publicly visible, but the code is not released under an open-source license. See `LICENSE` for the current rights notice.
