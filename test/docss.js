"use strict";

var test = require("tape")

var readFileSync = require("fs").readFileSync

var docss = require("../")

test("it should return `null` if there is no interesting content", function(t) {

  t.equal(docss(""), null, "returns empty object if empty string ")

  t.equal(docss(".test { prop: value }"), null, "returns empty object if no comment block ")

  t.equal(docss(readFileSync("./test/cases/nodocblock.css", {encoding: "utf8"})), null, "returns parsed data for no doc blocks")

  t.end()
})

test("it should return corresponding objects if there is comment blocks", function(t) {
  t.same(docss(readFileSync("./test/cases/condensed.css", {encoding: "utf8"})),require("./cases/condensed.json"), "returns parsed data for condensed comment block")

  t.same(docss(readFileSync("./test/cases/expanded.css", {encoding: "utf8"})),require("./cases/expanded.json"), "returns parsed data for expanded comment block")

  t.same(docss(readFileSync("./test/cases/mixed.css", {encoding: "utf8"})),require("./cases/mixed.json"), "returns parsed data for mixed comment block")

  t.same(docss(readFileSync("./test/cases/verbose.css", {encoding: "utf8"})),require("./cases/verbose.json"), "returns parsed data for verbose comment block")

  t.end()
})
