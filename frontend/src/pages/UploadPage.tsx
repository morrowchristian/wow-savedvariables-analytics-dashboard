import { useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { uploadSavedVariables } from "../api/uploadSavedVariables"; // from Issue #1

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (!file.name.endsWith(".lua")) {
      alert("Only .lua files are supported.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const result = await uploadSavedVariables(selectedFile);
      console.log("Upload result:", result);
      // Later: route to results page or show parsed output
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
    </Stack>
  );
}
