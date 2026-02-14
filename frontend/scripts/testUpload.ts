import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;

// Config
const FIXTURE_DIR = "../../backend/tests/fixtures";
const ENDPOINT = "http://localhost:8000/parse.php";

// Loose-mode normalizer
function normalize(str: string) {
  return str
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
}

async function testFile(filePath: string) {
  console.log(cyan(`\n=== Testing fixture: ${path.basename(filePath)} ===\n`));

  const expectedRaw = fs.readFileSync(filePath, "utf8");

  console.log("Fixture contents:");
  console.log("----- BEGIN FILE -----");
  console.log(expectedRaw.trim());
  console.log("----- END FILE -----\n");

  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  let res;
  try {
    res = await axios.post(ENDPOINT, form, {
      headers: form.getHeaders(),
    });
  } catch (err) {
    console.log(red("❌ Upload failed"));
    console.error(err);
    return;
  }

  const actualRaw = res.data.raw;
  const actualNormalized = res.data.normalized;

  console.log("Backend response:");
  console.log(res.data);

  // === STRICT CHECK ===
  const strictMatch = expectedRaw.trim() === actualRaw.trim();

  // === LOOSE CHECK ===
  const looseMatch =
    normalize(expectedRaw) === normalize(actualRaw);

  // === NORMALIZED CHECK ===
  const expectedNormalized: unknown[] = [];
  const normalizedMatch =
    JSON.stringify(actualNormalized) ===
    JSON.stringify(expectedNormalized);

  console.log("\nStrict match:", strictMatch ? green("✔") : red("❌"));
  console.log("Loose match:", looseMatch ? green("✔") : yellow("⚠"));
  console.log("Normalized match:", normalizedMatch ? green("✔") : yellow("⚠"));

  if (strictMatch && normalizedMatch) {
    console.log(green("\n🎉 FULL SUCCESS: Output matches expected results.\n"));
  } else if (looseMatch) {
    console.log(yellow("\n⚠ PARTIAL SUCCESS: Loose match passed, strict match failed.\n"));
  } else {
    console.log(red("\n❌ TEST FAILED: Output does not match expected results.\n"));
  }
}

async function run() {
  console.log(cyan("=== SavedVariables Integrated Upload Test ==="));

  const fixtureDir = path.resolve(__dirname, FIXTURE_DIR);
  const files = fs
    .readdirSync(fixtureDir)
    .filter((f) => f.endsWith(".lua"));

  if (files.length === 0) {
    console.log(red("❌ No .lua fixtures found."));
    return;
  }

  for (const file of files) {
    await testFile(path.join(fixtureDir, file));
  }

  console.log(cyan("\n=== End of Test ==="));
}

run();
