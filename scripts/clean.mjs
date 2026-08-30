import { rm } from "node:fs/promises";

for (const path of ["artifact", "coverage", "dist"]) {
  await rm(path, { force: true, recursive: true });
}
