"use strict";

var findDocBlocks = require("./lib/find-docblocks")
var parseDocBlock = require("./lib/parse-docblock")

var Docss = function(string, options) {

	var docBlocks = findDocBlocks(string)
	if (!docBlocks || !docBlocks.length) {
		return null
	}
	// else

	var parsedDockBlocks = []

	docBlocks.forEach(function pushDocBlock(string) {
		this.push(parseDocBlock(string))
	}, parsedDockBlocks)

	return parsedDockBlocks
}

module.exports = Docss
