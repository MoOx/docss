"use strict";

var findDocBlocks = require("./lib/find-docblocks")
var parseDocBlock = require("./lib/parse-docblock")

function Docss(string, options) {
  this.docblocks = []

  findDocBlocks(string).forEach(function pushDocBlock(string) {
    var doc = parseDocBlock(string)
    if (doc) {
      this.push(parseDocBlock(string))
    }
	}, this.docblocks)
}

/**
* Use the given plugin `fn(docblocks, docss)`.
*
* @param {Function} fn
* @return {Docss}
* @api public
*/

Docss.prototype.use = function(fn){
  fn(this.docblocks, this)
  return this
}

/**
* Returns docblocks in an array
*
* @return {Array}
* @api public
*/
Docss.prototype.toArray = function() {
  return this.docblocks
}

/**
* Stringify the docblocks.
*
* @param {Object} options
* @return {String}
* @api public
*/
Docss.prototype.toString = function(options) {
  //@todo
}

function docss(string, options) {
  return new Docss(string, options)
}

module.exports = docss
