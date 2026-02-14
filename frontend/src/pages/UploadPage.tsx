import { useRef, useState } from "react";
import { Button, Stack, Typography, Snackbar, Alert } from "@mui/material";
import { uploadSavedVariables } from "../api/uploadSavedVariables";
import { validateFile } from "../utils/validateFile";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const result = validateFile(file);

    if (!result.valid) {
      setErrorMessage(result.errorMessage || "Invalid file.");
      setSnackbarOpen(true);
      setSelectedFile(null);
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const result = await uploadSavedVariables(selectedFile);
      console.log("Upload result:", result);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <Typography variant="h5">Upload SavedVariables</Typography>

      <input
        type="file"
        accept=".lua"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button variant="contained" onClick={handlePickFile}>
        Choose .lua File
      </Button>

      {selectedFile && (
        <Typography variant="body2">
          Selected file: <strong>{selectedFile.name}</strong>
        </Typography>
      )}

      <Button
        variant="contained"
        color="success"
        disabled={!selectedFile || isUploading}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
