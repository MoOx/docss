"use strict";

var docblockRE = /\/\*{2}([\s\S]+?)\*\//g

module.exports = function findDocBlock(string) {
  return string.match(docblockRE)
}
