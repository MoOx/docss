"use strict";

module.exports = function split(string) {
  return string.split(/[\r\n]\s*\*\s+/)
}
