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

test-searches:
	cd scripts && sh test_search_by_dest.sh
	cd scripts && sh test_search_by_price.sh
	cd scripts && sh test_search_by_train_id.sh

test-login-logout:
	cd scripts && sh test_login.sh
	cd scripts && sh test_sign_up.sh
	cd scripts && sh test_logout.sh

test-fetches:
	cd scripts && sh test_get_history.sh
