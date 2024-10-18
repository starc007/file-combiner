const { spawn } = require("child_process");
const path = require("path");

const binary = path.join(
  __dirname,
  "..",
  "bin",
  process.platform === "win32" ? "file-combiner.exe" : "file-combiner"
);

const child = spawn(binary, process.argv.slice(2), { stdio: "inherit" });

child.on("error", (err) => {
  console.error("Failed to start child process:", err);
});

child.on("close", (code) => {
  process.exit(code);
});
