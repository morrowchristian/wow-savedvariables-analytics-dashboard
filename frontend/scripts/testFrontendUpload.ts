import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { uploadSavedVariables } from "../src/api/uploadSavedVariables.ts";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;

function normalize(str: string) {
  return str
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
}

async function run() {
  console.log(cyan("=== Frontend Upload Handler Test ===\n"));

  const fixturePath = path.resolve(
    __dirname,
    "../../backend/tests/fixtures/test.lua"
  );

  console.log("Using fixture:", fixturePath);

  const fileBuffer = fs.readFileSync(fixturePath);
  const expectedRaw = fileBuffer.toString("utf8");

  // Create a browser-like File object
  const testFile = new File([fileBuffer], "test.lua", {
    type: "text/plain",
  });

  console.log("\nCalling uploadSavedVariables()...\n");

  let result;
  try {
    result = await uploadSavedVariables(testFile);
  } catch (err) {
    console.error(red("❌ Upload handler threw an error"));
    console.error(err);
    return;
  }

  console.log("Backend response:");
  console.log(result);

  const actualRaw = result.raw;
  const actualNormalized = result.normalized;

  // Strict check
  const strictMatch = expectedRaw.trim() === actualRaw.trim();

  // Loose check
  const looseMatch = normalize(expectedRaw) === normalize(actualRaw);

  // Normalized check (placeholder)
  const expectedNormalized: unknown[] = [];
  const normalizedMatch =
    JSON.stringify(actualNormalized) ===
    JSON.stringify(expectedNormalized);

  console.log("\nStrict match:", strictMatch ? green("✔") : red("❌"));
  console.log("Loose match:", looseMatch ? green("✔") : yellow("⚠"));
  console.log("Normalized match:", normalizedMatch ? green("✔") : yellow("⚠"));

  if (strictMatch && normalizedMatch) {
    console.log(green("\n🎉 FULL SUCCESS: Frontend upload handler works correctly.\n"));
  } else if (looseMatch) {
    console.log(
      yellow("\n⚠ PARTIAL SUCCESS: Content matches, formatting differs.\n")
    );
  } else {
    console.log(red("\n❌ TEST FAILED: Output does not match expected results.\n"));
  }

  console.log(cyan("=== End of Test ==="));
}

run();
