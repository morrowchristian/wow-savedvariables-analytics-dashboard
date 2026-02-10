import axios from "axios";

export async function uploadSavedVariables(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/parse.php`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );

  return res.data;
}
