# File Combiner

This tool combines multiple files into one, keeping the folder structure.

## What it does

- Scans a folder and its subfolders
- Finds files with specific endings (like .ts or .js or any other extension)
- Puts all the file contents into one big file
- Skips folders like node_modules, dist, and others

## How to use it

1. Build the tool:

   ```
   cargo build --release
   ```

2. Run it:

   ```
   ./target/release/file-combiner --directory ./your_project --output-file combined.txt --extensions ts js
   ```

   - `--directory`: The folder to scan
   - `--output-file`: Where to save the combined file
   - `--extensions`: Which file types to include (like ts for TypeScript)

## Example

To combine all TypeScript and JavaScript files:

```
./target/release/file-combiner --directory ./my_project --output-file all_code.txt --extensions ts js
```

This will create `all_code.txt` with all your .ts and .js files.

## Note

The tool skips common folders like node_modules, dist, and .git to avoid including unnecessary files.
