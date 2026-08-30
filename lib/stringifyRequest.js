"use strict";

const path = require("path");

const matchRelativePath = /^\.\.?[/\\]/;

function isAbsolutePath(value) {
  return path.posix.isAbsolute(value) || path.win32.isAbsolute(value);
}

function stringifyRequest(loaderContext, request) {
  const context =
    loaderContext.context ||
    (loaderContext.options && loaderContext.options.context);

  return JSON.stringify(
    request
      .split("!")
      .map((part) => {
        const splitPart = part.match(/^(.*?)(\?.*)/);
        const query = splitPart ? splitPart[2] : "";
        let singlePath = splitPart ? splitPart[1] : part;

        if (isAbsolutePath(singlePath) && context) {
          singlePath = path.relative(context, singlePath);
          if (isAbsolutePath(singlePath)) return singlePath + query;
          if (!matchRelativePath.test(singlePath)) singlePath = `./${singlePath}`;
        }

        return singlePath.replace(/\\/g, "/") + query;
      })
      .join("!")
  );
}

module.exports = stringifyRequest;
