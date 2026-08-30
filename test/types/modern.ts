import {
  getHashDigest,
  getOptions,
  interpolateName,
  isUrlRequest,
  urlToRequest,
} from "../..";

const digest = getHashDigest("content", "xxhash64", "base64safe", 8);
const options = getOptions({ query: { sourceMap: true } });
const filename = interpolateName(
  { resourcePath: "/src/index.js", resourceQuery: "?v=1" },
  "[path][name].[hash:8].[ext][query]",
  { content: "content" }
);

const values: Array<string | boolean> = [
  digest,
  String(options.sourceMap),
  filename,
  isUrlRequest(filename),
  urlToRequest(filename),
];

void values;
