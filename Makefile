ifeq (0,0)
  ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(ARGS):;@:)
endif

PW=npx playwright

.PHONY: all test debug list report install clean tests/%

all: test

test:
	@if [ -z "$(ARGS)" ]; then $(PW) test; else $(PW) test -g "$(ARGS)"; fi

debug:
	@if [ -z "$(ARGS)" ]; then $(PW) test --headed; else $(PW) test -g "$(ARGS)" --headed; fi

list: 
	$(PW) test --list

report:
	$(PW) show-report 

trace:
	$(PW) show-trace

install: uninstall
	cp -i .env.example .env
	npm install
	$(PW) install

uninstall:
	rm -rf node_modules/ package-lock.json

zip:
	zip -r tests utils .env.example Makefile package.json playwright.config.ts README.md tsconfig.json
