"use strict";

var test = require("tape")

var readFileSync = require("fs").readFileSync

var docss = require("../")

test("it should empty array if there is no interesting content", function(t) {

  t.same(docss("").toArray(), [], "returns empty object if empty string ")

  t.same(docss(".test { prop: value }").toArray(), [], "returns empty object if no comment block ")

  t.same(docss(readFileSync("./test/cases/nodocblock.css", {encoding: "utf8"})).toArray(), [], "returns parsed data for no doc blocks")

  t.end()
})

test("it should return corresponding objects if there is comment blocks", function(t) {
  t.same(docss(readFileSync("./test/cases/condensed.css", {encoding: "utf8"})).toArray(), require("./cases/condensed.json"), "returns parsed data for condensed comment block")

  t.same(docss(readFileSync("./test/cases/expanded.css", {encoding: "utf8"})).toArray(), require("./cases/expanded.json"), "returns parsed data for expanded comment block")

  t.same(docss(readFileSync("./test/cases/mixed.css", {encoding: "utf8"})).toArray(), require("./cases/mixed.json"), "returns parsed data for mixed comment block")

  t.same(docss(readFileSync("./test/cases/verbose.css", {encoding: "utf8"})).toArray(), require("./cases/verbose.json"), "returns parsed data for verbose comment block")

  t.end()
})
