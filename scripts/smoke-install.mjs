import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const root = process.cwd();
const temp = await mkdtemp(path.join(tmpdir(), "stackline-loader-utils-"));
const artifact = path.join(temp, "artifact");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      NO_UPDATE_NOTIFIER: "1",
      npm_config_fund: "false",
      npm_config_update_notifier: "false",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const output = `${result.stdout || ""}${result.stderr || ""}`;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed:\n${output}`);
  }
  return output;
}

function runNpm(args, cwd) {
  if (process.env.npm_execpath) {
    return run(process.execPath, [process.env.npm_execpath, ...args], cwd);
  }
  return run("npm", args, cwd);
}

function assertCleanInstall(output) {
  assert.doesNotMatch(output, /npm warn|deprecated/i);
}

try {
  await mkdir(artifact);
  const packed = JSON.parse(
    runNpm(
      ["pack", "--ignore-scripts", "--json", "--pack-destination", artifact],
      root
    )
  );
  const tarball = path.join(artifact, packed[0].filename);

  for (const fixture of [
    { dependency: "@stackline/loader-utils", importName: "@stackline/loader-utils" },
    { dependency: "loader-utils", importName: "loader-utils" },
  ]) {
    const installRoot = path.join(temp, fixture.dependency.replace(/[^a-z]/gi, "-"));
    await mkdir(installRoot);
    await writeFile(
      path.join(installRoot, "package.json"),
      `${JSON.stringify({
        private: true,
        dependencies: { [fixture.dependency]: `file:${tarball}` },
      }, null, 2)}\n`
    );

    const installOutput = runNpm(
      ["install", "--ignore-scripts", "--loglevel=warn"],
      installRoot
    );
    assertCleanInstall(installOutput);
    runNpm(["ls", "--all"], installRoot);

    const audit = JSON.parse(
      runNpm(
        ["audit", "--omit=dev", "--json", "--audit-level=low"],
        installRoot
      )
    );
    assert.equal(audit.metadata.vulnerabilities.total, 0);

    const smoke = await readFile(path.join(installRoot, "package.json"), "utf8");
    assert.ok(smoke.includes(fixture.dependency));
    run(
      process.execPath,
      [
        "-e",
        `const u=require(${JSON.stringify(fixture.importName)});` +
          'if(u.urlToRequest("a.css")!=="./a.css")process.exit(1)',
      ],
      installRoot
    );
  }

  console.log("Direct and legacy-name installs are warning-free and audit-clean.");
} finally {
  await rm(temp, { force: true, recursive: true });
}
