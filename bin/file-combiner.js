#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const binaryName =
  process.platform === "win32" ? "file-combiner.exe" : "file-combiner";
const binary = path.join(__dirname, binaryName);

if (!fs.existsSync(binary)) {
  console.error(`Binary not found: ${binary}`);
  console.error("Please ensure the package is installed correctly.");
  process.exit(1);
}

const child = spawn(binary, process.argv.slice(2), { stdio: "inherit" });

child.on("error", (err) => {
  console.error("Failed to start child process:", err);
});

child.on("close", (code) => {
  process.exit(code);
});
