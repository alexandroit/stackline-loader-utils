/// <reference types="node" />

export type HashAlgorithm =
  | "xxhash64"
  | "md4"
  | "native-md4"
  | "md5"
  | "sha1"
  | "sha256"
  | "sha512"
  | (string & {});

export type DigestType =
  | "hex"
  | "base26"
  | "base32"
  | "base36"
  | "base49"
  | "base52"
  | "base58"
  | "base62"
  | "base64"
  | "base64safe"
  | (string & {});

export interface InterpolateNameOptions {
  context?: string;
  content?: string | Buffer;
  regExp?: string | RegExp;
  [key: string]: unknown;
}

export interface LoaderContext {
  context?: string;
  currentRequest?: string;
  loaderIndex?: number;
  loaders?: Array<{ request: string; [key: string]: unknown }>;
  query?: string | Record<string, unknown> | null;
  remainingRequest?: string;
  resource?: string;
  resourcePath?: string;
  resourceQuery?: string;
  options?: {
    customInterpolateName?: (
      this: LoaderContext,
      url: string,
      name: string | InterpolateNameFunction | undefined,
      options: InterpolateNameOptions
    ) => string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export type InterpolateNameFunction = (
  resourcePath: string | undefined,
  resourceQuery: string | undefined
) => string;

export function getCurrentRequest(loaderContext: LoaderContext): string;

export function getOptions(loaderContext: LoaderContext): Record<string, unknown>;

export function getRemainingRequest(loaderContext: LoaderContext): string;

export function getHashDigest(
  buffer: string | Buffer,
  hashType?: HashAlgorithm,
  digestType?: DigestType,
  maxLength?: number
): string;

export function interpolateName(
  loaderContext: LoaderContext,
  name?: string | InterpolateNameFunction,
  options?: InterpolateNameOptions
): string;

export function isUrlRequest(url: string): boolean;

export function parseQuery(query: string): Record<string, unknown>;

export function parseString(value: string): string;

export function stringifyRequest(
  loaderContext: LoaderContext,
  request: string
): string;

export function urlToRequest(url: string, root?: string | boolean): string;
