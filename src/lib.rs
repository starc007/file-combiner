mod cli;
mod error;

use anyhow::Result;
use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

use cli::Cli;
use error::AppError;

/// Directories to exclude from processing
const EXCLUDED_DIRS: [&str; 32] = [
    "node_modules",
    "logs",
    "dist",
    "build",
    ".git",
    ".svn",
    ".hg",
    ".vscode",
    ".idea",
    "tmp",
    "temp",
    "cache",
    "coverage",
    "vendor",
    "public",
    "static",
    "assets",
    "uploads",
    "tmp",
    "temp",
    "cache",
    "coverage",
    "vendor",
    "docs",
    "examples",
    "test",
    "tests",
    "spec",
    "benchmark",
    "benchmarking",
    "types",
    ".expo"
];


/// Runs the file combiner application
pub fn run() -> Result<()> {
    let cli = Cli::parse();
    let mut output = File::create(&cli.output_file)?;
    process_directory(Path::new(&cli.directory), &mut output, &cli.extensions, "")?;
    Ok(())
}

/// Recursively processes a directory and writes file contents to the output
fn process_directory(dir: &Path, output: &mut File, extensions: &[String], prefix: &str) -> Result<()> {
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();

        if path.is_dir() {
            if let Some(dir_name) = path.file_name() {
                if EXCLUDED_DIRS.contains(&dir_name.to_str().unwrap_or("")) {
                    continue; // Skip excluded directories
                }
            }
            let new_prefix = format!("{}{}/", prefix, path.file_name().unwrap().to_string_lossy());
            process_directory(&path, output, extensions, &new_prefix)?;
        } else if path.is_file() {
            if let Some(ext) = path.extension() {
                if extensions.is_empty() || extensions.contains(&ext.to_string_lossy().to_string()) {
                    writeln!(output, "\n-----------------------")?;
                    writeln!(output, "/{}{}:", prefix, path.file_name().unwrap().to_string_lossy())?;
                    writeln!(output, "-----------------------\n")?;
                    let content = fs::read_to_string(&path).map_err(|e| AppError::FileReadError(path.to_string_lossy().to_string(), e))?;
                    write!(output, "{}\n", content)?;
                }
            }
        }
    }

    Ok(())
}