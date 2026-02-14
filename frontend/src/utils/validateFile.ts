export function validateFile(file: File) {
  const name = file.name;
  const lower = name.toLowerCase();

  // 1. Must end with .lua
  if (!lower.endsWith(".lua")) {
    return {
      valid: false,
      errorMessage: `Invalid file type: "${name}". Only .lua SavedVariables files are allowed.`,
    };
  }

  // Remove the extension
  const base = name.slice(0, -4);

  // 2. Reject ".lua" (no base name)
  if (!base) {
    return {
      valid: false,
      errorMessage: `The filename "${name}" is missing a base name. SavedVariables files must have a name before the .lua extension.`,
    };
  }

  // 3. Reject names ending with a dot before .lua (e.g., "double..lua")
  if (base.endsWith(".")) {
    return {
      valid: false,
      errorMessage: `The filename "${name}" ends with an extra dot before the .lua extension. This is not a valid SavedVariables filename.`,
    };
  }

  // 4. (Optional) Reject filenames with leading dots (".myaddon.lua")
  if (base.startsWith(".")) {
    return {
      valid: false,
      errorMessage: `The filename "${name}" starts with a dot, which is not valid for SavedVariables files.`,
    };
  }

  return { valid: true };
}
