use clap::Parser;

/// A CLI tool to combine multiple files into a single file, preserving directory structure
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Cli {
    /// The directory to process
    #[arg(short, long)]
    pub directory: String,

    /// The output file name
    #[arg(short, long)]
    pub output_file: String,

    /// File extensions to include (optional)
    #[arg(short, long, num_args = 1.., value_delimiter = ' ')]
    pub extensions: Vec<String>,
}

impl Cli {
    /// Parse command line arguments
    pub fn parse() -> Self {
        <Self as Parser>::parse()
    }
}