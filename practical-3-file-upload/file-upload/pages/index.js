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
  const [filePreview, setFilePreview] = useState(null);

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
      setFilePreview(null);
    } else {
      setSelectedFile(file);

      // For images, create a preview URL
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setFilePreview({ url: previewUrl, name: file.name, type: file.type });
      }
      // For PDFs, just store name and type (no preview URL needed)
      else if (file.type === "application/pdf") {
        setFilePreview({ name: file.name, type: file.type });
      } else {
        setFilePreview(null);
      }
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

      const response = await axios.post("http://localhost:8000/api/upload", formData, {
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

        {/* File Preview Section */}
        {filePreview && (
          <div style={{ marginTop: 12, padding: 10, background: "#f0fff0", borderRadius: 6 }}>
            <h3 style={{ marginBottom: 6, fontWeight: 500 }}>Preview:</h3>
            <div style={{ border: "1px solid #ddd", borderRadius: 6, padding: 8 }}>

              {/* Image preview */}
              {filePreview.type?.startsWith("image/") ? (
                <img
                  src={filePreview.url}
                  alt={filePreview.name}
                  style={{ maxWidth: "100%", height: "auto", maxHeight: 160, borderRadius: 4 }}
                />

              /* PDF - show icon and filename */
              ) : filePreview.type === "application/pdf" ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
                  <svg
                    style={{ width: 24, height: 24, color: "red", flexShrink: 0 }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  <span>{filePreview.name}</span>
                </div>

              ) : (
                /* Fallback */
                <div>File selected: {filePreview.name}</div>
              )}

            </div>
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