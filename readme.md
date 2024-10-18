# @saura3h/file-combiner

A command-line tool to combine multiple files into one, preserving the folder structure.

## Installation

You can install File Combiner globally using npm:

```bash
npm install -g @saura3h/file-combiner
```

This will make the `file-combiner` command available in your terminal.

## Usage

After installation, you can use the File Combiner tool as follows:

```bash
file-combiner --directory <path_to_directory> --output-file <output_filename> --extensions <file_extensions>
```

### Options:

- `--directory` or `-d`: The path to the directory containing the files you want to combine.
- `--output-file` or `-o`: The name of the file where the combined content will be saved.
- `--extensions` or `-e`: (Optional) File extensions to include, separated by spaces. If not specified, all files will be included.

### Example:

To combine all TypeScript and JavaScript files in the current directory into a file named `combined_code.txt`:

```bash
file-combiner --directory ./ --output-file combined_code.txt --extensions ts js
```

## Features

- Combines multiple files into a single file
- Preserves directory structure in the output
- Option to filter files by extension
- Works on macOS, Linux, and Windows

## Excluded Directories

By default, the following directories are excluded from processing:

- node_modules
- .git
- dist
- build

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## Author

Created by [Saurabh](https://x.com/saurra3h)

---

Remember to star this repo if you find it useful! ⭐️
