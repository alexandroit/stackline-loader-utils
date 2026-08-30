import loaderUtils = require("../..");

const options = loaderUtils.getOptions({ query: "?sourceMap=true" });
const digest: string = loaderUtils.getHashDigest(
  Buffer.from("content"),
  "sha256",
  "hex",
  12
);
const request: string = loaderUtils.urlToRequest("styles/main.css");
const requestable: boolean = loaderUtils.isUrlRequest(request);
const filename: string = loaderUtils.interpolateName(
  { resourcePath: "/src/logo.svg" },
  "[name].[contenthash:8].[ext]",
  { content: Buffer.from("content") }
);

void digest;
void options;
void requestable;
void filename;
