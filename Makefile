.PHONY: init
init:
	pnpm install

.PHONY: clean
clean:
	rm -rf icons

.PHONY: build
build: clean
	pnpm run build

.PHONY: type-check
type-check:
	pnpm run type-check
