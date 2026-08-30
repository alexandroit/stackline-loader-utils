"use strict";

const parseQuery = require("./parseQuery");
const unsafeKeys = new Set(["__proto__", "constructor", "prototype"]);

function sanitizeObject(value) {
  if (Array.isArray(value)) return value.map(sanitizeObject);
  if (!value || typeof value !== "object") return value;

  const result = {};
  for (const key of Object.keys(value)) {
    if (!unsafeKeys.has(key)) result[key] = sanitizeObject(value[key]);
  }
  return result;
}

function getOptions(loaderContext) {
  const query = loaderContext.query;

  if (typeof query === "string" && query !== "") {
    return parseQuery(query);
  }

  if (!query || typeof query !== "object") {
    return {};
  }

  const prototype = Object.getPrototypeOf(query);
  if (
    (prototype !== Object.prototype && prototype !== null) ||
    Object.keys(query).some((key) => unsafeKeys.has(key))
  ) {
    return sanitizeObject(query);
  }

  return query;
}

module.exports = getOptions;
