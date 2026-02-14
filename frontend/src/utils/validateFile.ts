export type FileValidationResult = {
  valid: boolean;
  errorMessage?: string;
}

export function validateFile(file: File): FileValidationResult {
  const name = file.name.toLowerCase();

  if (!name.endsWith(".lua")) {
    return {
      valid: false,
      errorMessage: "Invalid file type. Only .lua files are allowed.",
    };
  }

  return { valid: true };
}