CF_WWW_DISTRO_ID = "E252A1G2LO699K"

.PHONY: bundle upload invalidate

start:
	@npx es-dev-server --node-resolve --watch --open

bundle:
	@npx rollup ./frontend/components/table/table.js --file ./frontend/public/table.js
	@cp ./frontend/components/table/demo.html ./frontend/public/index.html


upload:	
	aws s3 cp ./frontend/public/ s3://www.datastack.de/en/cio-intelligence/	--recursive
	aws s3 cp ./frontend/data/ s3://www.datastack.de/en/cio-intelligence/data --recursive


invalidate:
	aws cloudfront create-invalidation --distribution-id $(CF_WWW_DISTRO_ID) --paths "/*"


all: bundle upload invalidate
