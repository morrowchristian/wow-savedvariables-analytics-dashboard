import { validateFile } from "../src/utils/validateFile.ts";

function fakeFile(name: string, size = 1000): File {
  return {
    name,
    size,
    type: "",
    arrayBuffer: async () => new ArrayBuffer(size),
    slice: () => new Blob(),
    stream: () => new ReadableStream(),
    text: async () => "",
    lastModified: Date.now(),
  } as unknown as File;
}

console.log("=== File Validation Test Suite ===\n");

type TestCase = {
  name: string;
  valid: boolean;
  size?: number;
};

const cases: TestCase[] = [
  //
  // ❌ Invalid filename cases
  //
  { name: "notes.txt", valid: false },
  { name: "config.json", valid: false },
  { name: "SavedVariables.lua.txt", valid: false },
  { name: "SavedVariables.lu", valid: false },
  { name: "SavedVariables.lua.bak", valid: false },
  { name: "SavedVariables", valid: false },
  { name: ".lua", valid: false },
  { name: "weirdfile.LUA.", valid: false },
  { name: "double..lua", valid: false },
  { name: "lua", valid: false },

  //
  // ✔ Valid filename cases
  //
  { name: "SavedVariables.lua", valid: true },
  { name: "my.addon.lua", valid: true },
  { name: "my addon.lua", valid: true },
  { name: "SAVEDVARIABLES.LUA", valid: true },
  { name: "SavedVariables.LuA", valid: true },
  { name: "weird.name.with.dots.lua", valid: true },

  //
  // ❌ Invalid size cases
  //
  { name: "empty.lua", size: 0, valid: false },
  { name: "too_big.lua", size: 5 * 1024 * 1024 + 1, valid: false },
  { name: "massive.lua", size: 20 * 1024 * 1024, valid: false },

  //
  // ✔ Valid size cases
  //
  { name: "small.lua", size: 1024, valid: true },
  { name: "almost_max.lua", size: 5 * 1024 * 1024 - 1, valid: true },
];

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

for (const test of cases) {
  const file = fakeFile(test.name, test.size ?? 1000);
  const result = validateFile(file);

  console.log(`Testing: ${test.name}`);
  console.log("Result:", result);

  if (result.valid !== test.valid) {
    console.error(`${RED}❌ FAILED: Expected valid=${test.valid}${RESET}\n`);
    continue;
  }

  if (!test.valid && !result.errorMessage) {
    console.error(`${RED}❌ FAILED: Invalid file should include errorMessage${RESET}\n`);
    continue;
  }

  if (test.valid && result.errorMessage !== undefined) {
    console.error(`${RED}❌ FAILED: Valid file should not include errorMessage${RESET}\n`);
    continue;
  }

  console.log(`${GREEN}✔ Passed${RESET}\n`);
}

console.log("=== End of Test ===");
