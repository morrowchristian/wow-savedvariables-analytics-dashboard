export function validateFile(file: File) {
  const name = file.name;
  const lower = name.toLowerCase();

  //
  // 1. Extension validation
  //
  if (!lower.endsWith(".lua")) {
    return {
      valid: false,
      errorMessage: `Invalid file type: "${name}". Only .lua SavedVariables files are allowed.`,
    };
  }

  //
  // 2. Filename structure validation
  //
  const base = name.slice(0, -4); // remove ".lua"

  if (!base) {
    return {
      valid: false,
      errorMessage: `The filename "${name}" is missing a base name. SavedVariables files must have a name before the .lua extension.`,
    };
  }

  if (base.endsWith(".")) {
    return {
      valid: false,
      errorMessage: `The filename "${name}" ends with an extra dot before the .lua extension. This is not a valid SavedVariables filename.`,
    };
  }

  if (base.startsWith(".")) {
    return {
      valid: false,
      errorMessage: `The filename "${name}" starts with a dot, which is not valid for SavedVariables files.`,
    };
  }

  //
  // 3. File size validation
  //
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (file.size === 0) {
    return {
      valid: false,
      errorMessage: `The file "${name}" is empty. SavedVariables files must contain data.`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      errorMessage: `The file "${name}" is too large (${file.size} bytes). Maximum allowed size is ${maxSize} bytes.`,
    };
  }

  //
  // 4. Passed all validation
  //
  return { valid: true };
}
