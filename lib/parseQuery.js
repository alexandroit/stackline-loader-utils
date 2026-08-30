"use strict";

const JSON5 = require("json5");

const specialValues = Object.freeze({
  null: null,
  true: true,
  false: false,
});
const unsafeKeys = new Set(["__proto__", "constructor", "prototype"]);

function sanitize(value) {
  if (Array.isArray(value)) return value.map(sanitize);
  if (!value || typeof value !== "object") return value;

  const result = {};
  for (const key of Object.keys(value)) {
    if (!unsafeKeys.has(key)) result[key] = sanitize(value[key]);
  }
  return result;
}

function parseQuery(query) {
  if (query.substr(0, 1) !== "?") {
    throw new Error("A valid query string passed to parseQuery should begin with '?'");
  }

  query = query.substr(1);
  if (!query) return {};

  if (query.substr(0, 1) === "{" && query.substr(-1) === "}") {
    return sanitize(JSON5.parse(query));
  }

  const queryArgs = query.split(/[,&]/g);
  const result = Object.create(null);

  queryArgs.forEach((arg) => {
    const index = arg.indexOf("=");
    let name;
    let value;

    if (index >= 0) {
      name = arg.substr(0, index);
      value = decodeURIComponent(arg.substr(index + 1));
      if (Object.prototype.hasOwnProperty.call(specialValues, value)) {
        value = specialValues[value];
      }

      if (name.substr(-2) === "[]") {
        name = decodeURIComponent(name.substr(0, name.length - 2));
        if (unsafeKeys.has(name)) return;
        if (!Array.isArray(result[name])) result[name] = [];
        result[name].push(value);
        return;
      }

      name = decodeURIComponent(name);
    } else if (arg.substr(0, 1) === "-") {
      name = decodeURIComponent(arg.substr(1));
      value = false;
    } else if (arg.substr(0, 1) === "+") {
      name = decodeURIComponent(arg.substr(1));
      value = true;
    } else {
      name = decodeURIComponent(arg);
      value = true;
    }

    if (!unsafeKeys.has(name)) result[name] = value;
  });

  return result;
}

module.exports = parseQuery;
