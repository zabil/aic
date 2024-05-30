install:
	bun install

build: install
	bun build ./src/main.ts --compile --outfile ./dist/bin/aic

lint:
	bun run lint --apply

format:
	bun run format --write

precommit: lint format
