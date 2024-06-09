run:
	cargo watch -x run

install:
	cd website && npm install
	cargo build
	cargo build -r
