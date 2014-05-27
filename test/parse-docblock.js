"use strict";

var test = require("tape")

var parseDocBlock = require("../lib/parse-docblock")

test("it should return `null` if there is nothing interesting to parse", function(t) {
  t.same(parseDocBlock("/**/"), null, "not a docblock")
  t.same(parseDocBlock("/**\n\n\n*/"), null, "empty docblock")

  t.end()
})

test("it should parse name", function(t) {
  t.same(parseDocBlock("/**\nName\n*/"), {
    name: "Name"
  }, "implicite name")

  t.same(parseDocBlock("/**\n@name Name\n*/"), {
    name: "Name"
  }, "@name")

  t.end()
})

test("it should parse description", function(t) {
  t.same(parseDocBlock("/**\nName\nDescription\n*/"), {
    name: "Name",
    description: ["Description"]
  }, "implicite name + implicite description")

  t.same(parseDocBlock("/**\nName\nDescription\nStill description\n*/"), {
    name: "Name",
    description: ["Description", "Still description"]
  }, "implicite name + implicite multilines description")

  t.same(parseDocBlock("/**\nName\n@description Description\n*/"), {
    name: "Name",
    description: ["Description"]
  }, "implicite name + @description")

  t.same(parseDocBlock("/**\nName\n@description Description\nStill description\n*/"), {
    name: "Name",
    description: ["Description", "Still description"]
  }, "implicite name + multilines @description")

  t.same(parseDocBlock("/**\n@name Name\n@description Description\nStill description\n*/"), {
    name: "Name",
    description: ["Description", "Still description"]
  }, "@name + multilines @description")

  t.same(parseDocBlock("/**\n@name Name\n@description Description\n@description Still description\n*/"), {
    name: "Name",
    description: ["Description", "Still description"]
  }, "@name + heavy multilines @description")

  t.end()
})

test("it should parse states", function(t) {
  t.same(parseDocBlock("/**\nName\n:hover .state: State\n*/"), {
    name: "Name",
    states: {
      ":hover .state": "State"
    }
  }, "implicite name + implicite state")

  t.same(parseDocBlock("/**\nName\n:hover .state: State\n:focus .state - State - yep\n*/"), {
    name: "Name",
    states: {
      ":hover .state": "State",
      ":focus .state": "State - yep"
    }
  }, "implicite name + 2 implicites states")

  t.same(parseDocBlock("/**\nName\n@state :hover .state: State\n:focus .state - State - yep\n*/"), {
    name: "Name",
    states: {
      ":hover .state": "State",
      ":focus .state": "State - yep"
    }
  }, "implicite name + @state + implicite state")

  t.end()
})

test("it should parse markup", function(t) {
  t.same(parseDocBlock("/**\nName\n<markup>\n*/"), {
    name: "Name",
    markup: ["<markup>"]
  }, "implicite name + implicite markup")

  t.same(parseDocBlock("/**\nName\n@markup mark<up>\n*/"), {
    name: "Name",
    markup: ["mark<up>"]
  }, "implicite name + @markup")

  t.end()
})

test("it should parse block with weird order", function(t) {
  t.same(parseDocBlock("/**\n@state :hover .state: State\n@description Description\n * Name\n* Still description\n *:focus .state - State - yep\n*/"), {
    name: "Name",
    description: ["Description", "Still description"],
    states: {
      ":hover .state": "State",
      ":focus .state": "State - yep"
    }
  }, "weird @state + &description + name + implicite description + implicite state")

  t.end()
})

test("it should not keep empty line", function(t) {
  t.same(parseDocBlock("/**\n\n\nName\n\nDescription\n*/"), {
    name: "Name",
    description: ["Description"]
  }, "newlines with implicite name + implicite description")

  t.end()
})
