"use strict";

var docblockRE = /\/\*{2}([\s\S]+?)\*\//g

module.exports = function findDocBlock(string) {
  var docblocks = string.match(docblockRE)
  if (!docblocks) {
    return []
  }
  return docblocks
}
