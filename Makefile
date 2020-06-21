.PHONY: build
build:
	npm run build

.PHONY: gzip
gzip:
	mkdir -p release
	tar -cv build/ | gzip > release/streamhut-web.tar.gz

.PHONY: unzip
unzip:
	tar -zxvf release/streamhut-web.tar.gz

.PHONY: release
release: build gzip
	git tag $(version)
	hub release create -a release/streamhut-web.tar.gz -m '$(version)' $(version)
