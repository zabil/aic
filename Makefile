install:
	bun install

build: install
	bun build ./src/main.ts --compile --outfile ./dist/bin/aic

lint:
	bun run lint

format:
	bun run format

precommit: lint format
