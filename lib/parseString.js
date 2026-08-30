"use strict";

function parseString(value) {
  try {
    if (value[0] === '"') return JSON.parse(value);
    if (value[0] === "'" && value.substr(value.length - 1) === "'") {
      return parseString(
        value
          .replace(/\\.|"/g, (match) => (match === '"' ? '\\"' : match))
          .replace(/^'|'$/g, '"')
      );
    }
    return JSON.parse(`"${value}"`);
  } catch {
    return value;
  }
}

module.exports = parseString;
