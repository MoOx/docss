"use strict";

var test = require("tape")

var readFileSync = require("fs").readFileSync

var styleguideCSS = require("../")

test("it should return null if there is no interesting content", function(t) {

  t.equal(styleguideCSS(""), null, "returns empty object if empty string ")

  t.equal(styleguideCSS(".test { prop: value }"), null, "returns empty object if no comment block ")

  t.equal(styleguideCSS(readFileSync("./test/cases/nodocblock.css", {encoding: "utf8"})), null, "returns parsed data for no doc blocks")

  t.end()
})

test("it should return an object if we have at least a comment block", function(t) {
  t.equal(styleguideCSS(readFileSync("./test/cases/condensed.css", {encoding: "utf8"})), require("./test/cases/condensed.json"), "returns parsed data for condensed comment block")

  t.end()
})
