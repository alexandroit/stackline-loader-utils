"use strict";

function getCurrentRequest(loaderContext) {
  if (loaderContext.currentRequest) return loaderContext.currentRequest;

  return loaderContext.loaders
    .slice(loaderContext.loaderIndex)
    .map((loader) => loader.request)
    .concat([loaderContext.resource])
    .join("!");
}

module.exports = getCurrentRequest;
