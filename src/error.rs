use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Failed to read file {0}: {1}")]
    FileReadError(String, #[source] std::io::Error),
}