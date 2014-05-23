"use strict";

var findDocBlocks = require("./lib/find-docblocks")
var parseDocBlock = require("./lib/parse-docblock")
var split = require("./lib/split")
var trim = require("./lib/trim")

var StyleguideCSS = function(string, options) {

	var docBlocks = findDocBlock(string)
	if (!docBlocks.length) {
		return null
	}
	// else

	var parsedDockBlocks = []

	docBlocks.forEach(function pushDocBlock(string) {
		this.push(parseDocBlock(string))
	}, parsedDockBlocks)

	return parsedDockBlocks
}

module.exports = StyleguideCSS
