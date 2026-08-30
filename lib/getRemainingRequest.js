"use strict";

function getRemainingRequest(loaderContext) {
  if (loaderContext.remainingRequest) return loaderContext.remainingRequest;

  return loaderContext.loaders
    .slice(loaderContext.loaderIndex + 1)
    .map((loader) => loader.request)
    .concat([loaderContext.resource])
    .join("!");
}

module.exports = getRemainingRequest;
