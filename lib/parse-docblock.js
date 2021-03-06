"use strict";

var parsers = {
  state: function(line) {
    var states = {}
    // implicite state ": "
    if (line.indexOf(": ") > -1) {
      var statePieces = line.split(": ")
      var state = statePieces.shift()
      return [state, statePieces.join(": ")]
    }
    // implicite state " - "
    else if (line.indexOf(" - ") > -1) {
      var statePieces = line.split(" - ")
      var state = statePieces.shift()
      return [state, statePieces.join(" - ")]
    }

    return false
  }
}

module.exports = function parseDocBlock(string) {
  if (string.indexOf("/**") !== 0 ||
     string.lastIndexOf("*/") !== (string.length - 2) ||
     // minimal docblock
     string.length <= "/**\n\n*/".length
  ) {
      return null
  }

string = string.replace("\r", "")
var docBlock = string.split("\n")

  // remove /** and */
  docBlock = docBlock.slice(1, -1)

  var currentParsing
  var doc = {
    description: [],
    markup: [],
    state: {}
  }

  // now parse the content
  // no regex dude
  docBlock.forEach(function(line) {
    var parseRes

    // clean line " ?*? ?Content" => "Content"
    if (line.indexOf(" * ") === 0) line = line.replace(" * ", "")
    else if (line.indexOf(" *") === 0) line = line.replace(" *", "")
    else if (line.indexOf("* ") === 0) line = line.replace("* ", "")
    else if (line.indexOf("*") === 0) line = line.replace("*", "")

    // drop empty lines
    if (line.length === 0) return

    // defined prop
    if (line.indexOf("@") === 0) {
      var linePieces = line.split(" ")
      var prop = linePieces.shift().slice(1)
      var value = linePieces.join(" ")

      if (doc[prop] && doc[prop].length !== undefined) {
        doc[prop].push(value)
      }
      // states only for now
      else if (doc[prop] && typeof doc[prop] === "object" && (parseRes = parsers.state(value))) {
        doc[prop][parseRes[0]] = parseRes[1]
      }
      else {
        doc[prop] = value
      }
      currentParsing = prop
    }
    else {
      // markup
      if (line.indexOf("<") === 0) {
        doc.markup.push(line)
        currentParsing = "markup"
      }

      else if ((parseRes = parsers.state(line))) {
        doc.state[parseRes[0]] = parseRes[1]
        currentParsing = "states"
      }

      // fallback to markup, description or name
      else {
        // if we previously started to parse markup,
        // we consider text after the markup to be in it
        // Example:
        // <markup>
        // markup <---- this is still markup
        // </markup>
        if (currentParsing === "markup") {
          doc.markup.push(line)
        }
        else if (doc.name) {
          doc.description.push(line)
          currentParsing = "description"
        }
        else {
          doc.name = line
          currentParsing = "name"
        }
      }
    }

  })

  // console.log("\ndocBlock:", docBlock)

  // not even a name ?
  // assume empty block (lot's of \n)
  if (!doc.name) {
    return null
  }

  // adjust api
  // states seems much more logical :)
  doc.states = doc.state
  delete doc.state

  if (doc.description.length === 0) delete doc.description
  if (doc.markup.length === 0) delete doc.markup
  if (Object.keys(doc.states).length === 0) delete doc.states

  return doc
}
