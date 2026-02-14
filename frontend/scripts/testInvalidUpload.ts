import { validateFile } from "../src/utils/validateFile";

function fakeFile(name: string): File {
  // Minimal mock of the File API for Node tests
  return {
    name,
    size: 0,
    type: "",
    arrayBuffer: async () => new ArrayBuffer(0),
    slice: () => new Blob(),
    stream: () => new ReadableStream(),
    text: async () => "",
    lastModified: Date.now(),
  } as unknown as File;
}

console.log("=== Invalid File Validation Test ===\n");

// Test 1: invalid extension
const invalid = fakeFile("notes.txt");
const invalidResult = validateFile(invalid);

console.log("Testing invalid file (.txt)...");
console.log("Result:", invalidResult);

if (invalidResult.valid === false) {
  console.log("✔ Correctly rejected invalid file.\n");
} else {
  console.error("❌ FAILED: .txt file should be rejected.\n");
}

// Test 2: valid extension
const valid = fakeFile("SavedVariables.lua");
const validResult = validateFile(valid);

console.log("Testing valid file (.lua)...");
console.log("Result:", validResult);

if (validResult.valid === true) {
  console.log("✔ Correctly accepted valid file.\n");
} else {
  console.error("❌ FAILED: .lua file should be accepted.\n");
}

console.log("=== End of Test ===");
