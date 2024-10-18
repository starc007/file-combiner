const https = require("https");
const fs = require("fs");
const path = require("path");

const platform = process.platform;

let binaryName;
switch (platform) {
  case "win32":
    binaryName = "file-combiner.exe";
    break;
  case "linux":
    binaryName = "file-combiner";
    break;
  case "darwin":
    binaryName = "file-combiner";
    break;
  default:
    console.error("Unsupported platform:", platform);
    process.exit(1);
}

const url = `https://raw.githubusercontent.com/starc007/file-combiner/main/releases/${binaryName}`;
const binaryPath = path.join(__dirname, "..", "bin", binaryName);

console.log(`Downloading binary from: ${url}`);
console.log(`Saving binary to: ${binaryPath}`);

https
  .get(url, (response) => {
    console.log(`Received response with status code: ${response.statusCode}`);
    if (response.statusCode === 302) {
      console.log(`Following redirect to: ${response.headers.location}`);
      https.get(response.headers.location, handleDownload);
    } else if (response.statusCode === 200) {
      handleDownload(response);
    } else {
      console.error(`Unexpected status code: ${response.statusCode}`);
      process.exit(1);
    }
  })
  .on("error", (err) => {
    console.error("Error downloading binary:", err);
    process.exit(1);
  });

function handleDownload(response) {
  const file = fs.createWriteStream(binaryPath);
  response.pipe(file);

  file.on("finish", () => {
    file.close();
    fs.chmodSync(binaryPath, "755");
    console.log("Binary downloaded and permissions set successfully");
  });

  file.on("error", (err) => {
    console.error("Error writing file:", err);
    process.exit(1);
  });
}
