install:
	bun install

build: install
	bun build ./src/main.ts --compile --outfile ./dist/bin/aic

run:
	bun run ./src/main.ts
