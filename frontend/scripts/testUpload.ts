import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";

async function run() {
  const form = new FormData();
  form.append(
    "file",
    fs.createReadStream("../backend/tests/fixtures/test.lua")
  );

  try {
    const res = await axios.post("http://localhost:8000/public/parse.php", form, {
      headers: form.getHeaders(),
    });

    console.log("Parsed response:");
    console.log(res.data);
  } catch (err) {
    console.error("Error during upload test:", err);
  }
}

run();
