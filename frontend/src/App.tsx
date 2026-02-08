import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { uploadSavedVariables } from "./api";

export default function App() {
  const [result, setResult] = useState(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const data = await uploadSavedVariables(e.target.files[0]);
    setResult(data);
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        WoW SavedVariables Analyzer
      </Typography>

      <Button variant="contained" component="label">
        Upload SavedVariables
        <input type="file" hidden onChange={handleUpload} />
      </Button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </Container>
  );
}
