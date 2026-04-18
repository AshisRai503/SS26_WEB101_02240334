import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function Home() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const { handleSubmit } = useForm();

  // Validate the file
  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid file type. Only JPEG, PNG, and PDF are allowed.";
    }
    if (file.size > MAX_SIZE) {
      return "File is too large. Maximum size is 5MB.";
    }
    return null;
  };

  // Handle file selection via drag & drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFileError("");
    setUploadStatus("");
    setUploadProgress(0);

    if (rejectedFiles.length > 0) {
      setFileError("File rejected. Check type and size.");
      return;
    }

    const file = acceptedFiles[0];
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_SIZE,
  });

  // Handle form submission
  const onSubmit = async () => {
    if (!selectedFile) {
      setFileError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("uploading");
      setUploadProgress(0);

      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      setUploadStatus("success");
      setUploadProgress(100);
      console.log("Upload response:", response.data);
    } catch (error) {
      setUploadStatus("error");
      setFileError(error.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1>File Upload</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? "#0070f3" : "#ccc"}`,
            borderRadius: 8,
            padding: 40,
            textAlign: "center",
            backgroundColor: isDragActive ? "#f0f7ff" : "#fafafa",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>Drag & drop a file here, or click to select</p>
          )}
          <p style={{ fontSize: 12, color: "#888" }}>
            Accepted: JPEG, PNG, PDF · Max 5MB
          </p>
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div style={{ marginTop: 12, padding: 10, background: "#f0fff0", borderRadius: 6 }}>
            <strong>Selected:</strong> {selectedFile.name} (
            {(selectedFile.size / 1024).toFixed(1)} KB)
          </div>
        )}

        {/* Error Message */}
        {fileError && (
          <p style={{ color: "red", marginTop: 8 }}>{fileError}</p>
        )}

        {/* Progress Bar */}
        {uploadStatus === "uploading" && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: "#eee", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  width: `${uploadProgress}%`,
                  background: "#0070f3",
                  height: 10,
                  transition: "width 0.3s",
                }}
              />
            </div>
            <p style={{ textAlign: "center", fontSize: 14 }}>{uploadProgress}%</p>
          </div>
        )}

        {/* Success Message */}
        {uploadStatus === "success" && (
          <p style={{ color: "green", marginTop: 12 }}>✅ File uploaded successfully!</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploadStatus === "uploading"}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "12px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: uploadStatus === "uploading" ? "not-allowed" : "pointer",
          }}
        >
          {uploadStatus === "uploading" ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
}