OUT = debug-tools.js

default: build

build:
	@echo ';(function($$){\n' > ${OUT}
	@cat json/remove-cycles.js >> ${OUT}
	@echo '\n}(jQuery));' >> ${OUT}

.PHONY: build
