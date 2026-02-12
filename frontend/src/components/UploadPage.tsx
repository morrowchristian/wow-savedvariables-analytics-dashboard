import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { uploadSavedVariables } from "../api";
import { useSavedVariablesStore } from "../state/useSavedVariablesStore";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const setData = useSavedVariablesStore((s) => s.setData);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await uploadSavedVariables(file);
      setData(result);
      console.log("Upload success:", result);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Upload SavedVariables
      </Typography>

      <input
        type="file"
        accept=".lua"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!file}
        onClick={handleUpload}
      >
        Upload
      </Button>
    </Container>
  );
}
