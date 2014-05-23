"use strict";

var test = require("tape")

var readFileSync = require("fs").readFileSync
var findDocBlocks = require("../lib/find-docblocks")

test("it should find all docblocks", function(t) {

  t.same(findDocBlocks(readFileSync("./test/cases/lotsof.css", {encoding: "utf8"})), require("./cases/lotsof.json"), "returns blocks")

  t.end()
})
