BIN=node_modules/.bin/
MOCHA=$(BIN)mocha
WATCHY=$(BIN)watchy
TEST=$(MOCHA) --colors --recursive -R spec

test-w:
	NODE_ENV=test $(WATCHY) -w test,herit.js -- $(TEST)

test:
	NODE_ENV=test $(TEST)

.PHONY: test
