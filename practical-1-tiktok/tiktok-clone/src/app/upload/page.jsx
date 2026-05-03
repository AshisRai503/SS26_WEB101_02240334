"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/authContext";
import apiClient from "@/lib/api-config";
import toast from "react-hot-toast";

export default function UploadPage() {
  const { isAuthenticated } = useAuth();

  const [caption, setCaption] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please log in to upload videos");
      return;
    }

    if (!video) {
      toast.error("Please select a video file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("video", video);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await apiClient.post("/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Video uploaded successfully");

      setCaption("");
      setVideo(null);
      setThumbnail(null);
    } catch (error) {
      console.log("Upload error:", error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Upload Video</h1>

        {!isAuthenticated ? (
          <p>Please log in to upload videos.</p>
        ) : (
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Write a caption..."
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full border rounded p-2"
              />
            </div>

            <button
              disabled={loading}
              className="bg-red-500 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        )}
      </div>
    </MainLayout>
  );
}