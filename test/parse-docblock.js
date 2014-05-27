"use strict";

var test = require("tape")

var parseDocBlock = require("../lib/parse-docblock")

test("it should return `null` if there is nothing interesting to parse", function(t) {
  t.same(parseDocBlock("/**/"), null, "not a docblock")
  t.same(parseDocBlock("/**\n\n\n*/"), null, "empty docblock")

  t.end()
})

test("it should return an object if there it's a dockblock", function(t) {
  t.same(parseDocBlock("/**\nName\n*/"), {
    name: "Name"
  }, "just a name")

  t.same(parseDocBlock("/**\nName\nDescription\n*/"), {
    name: "Name",
    description: ["Description"]
  }, "name + one line description")

  t.same(parseDocBlock("/**\nName\nDescription\nStill description\n*/"), {
    name: "Name",
    description: ["Description", "Still description"]
  }, "name + full description")

  t.same(parseDocBlock("/**\nName\nDescription\nStill description\n:hover .state: State\n:focus .state - State - yep\n*/"), {
    name: "Name",
    description: ["Description", "Still description"],
    states: {
      ":hover .state": "State",
      ":focus .state": "State - yep"
    }
  }, "name + description + state")

  t.same(parseDocBlock("/**\n@description Description\n * Name\n* Still description\n@state :hover .state: State\n *:focus .state - State - yep\n*/"), {
    name: "Name",
    description: ["Description", "Still description"],
    states: {
      ":hover .state": "State",
      ":focus .state": "State - yep"
    }
  }, "@ name + description + state")

  t.end()
})
