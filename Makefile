gzip:
	mkdir -p release
	tar -cv build/ | gzip > release/streamhut-web.tar.gz

unzip:
	tar -zxvf release/streamhut-web.tar.gz
