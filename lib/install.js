const https = require("https");
const fs = require("fs");
const path = require("path");

const version = "1.0.0";
const platform = process.platform;

let binaryName;
switch (platform) {
  case "win32":
    binaryName = "file-combiner.exe";
    break;
  case "linux":
    binaryName = "file-combiner-linux";
    break;
  case "darwin":
    binaryName = "file-combiner-macos";
    break;
  default:
    console.error("Unsupported platform:", platform);
    process.exit(1);
}

const url = `https://github.com/starc007/file-combiner/releases/download/v${version}/${binaryName}`;
const binaryPath = path.join(__dirname, "..", "bin", binaryName);

https
  .get(url, (response) => {
    if (response.statusCode === 302) {
      https.get(response.headers.location, (redirectedResponse) => {
        redirectedResponse
          .pipe(fs.createWriteStream(binaryPath))
          .on("close", () => {
            fs.chmodSync(binaryPath, "755");
            console.log("Binary downloaded successfully");
          });
      });
    } else {
      response.pipe(fs.createWriteStream(binaryPath)).on("close", () => {
        fs.chmodSync(binaryPath, "755");
        console.log("Binary downloaded successfully");
      });
    }
  })
  .on("error", (err) => {
    console.error("Error downloading binary:", err);
    process.exit(1);
  });
