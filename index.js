"use strict";

var findDocBlocks = require("./lib/find-docblocks")
var parseDocBlock = require("./lib/parse-docblock")

var Docss = function(string, options) {
  this.docs = []
  this.docBlocks = findDocBlocks(string)

  this.docBlocks.forEach(function pushDocBlock(string) {
    var doc = parseDocBlock(string)
    if (doc) {
      this.push(parseDocBlock(string))
    }
	}, this.docs)
}

Docss.prototype.toArray = function() {
  return this.docs
}

function docss(string, options) {
  return new Docss(string, options)
}

module.exports = docss
