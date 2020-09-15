start:
	@npx es-dev-server --node-resolve --watch --open

bundle:
	@npx rollup ./frontend/components/table/table.js --file ./frontend/public/table.js
	@cp ./frontend/components/table/demo.html ./frontend/public/index.html
