RUST_LOG="debug"
run:
	cd website && npm run build
	env RUST_LOG=$(RUST_LOG) cargo watch -x run

build:
	cd website && npm run build
	cargo build --release

install:
	cd website && npm install
	cargo build
	cargo build -r

test:
	cd scripts && sh test_get_trains.sh
