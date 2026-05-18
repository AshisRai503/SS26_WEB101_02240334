"use client";
import {
  uploadVideoToStorage,
  uploadThumbnailToStorage,
  createVideo,
} from "@/services/uploadService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/authContext";

import toast from "react-hot-toast";

export default function UploadPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [caption, setCaption] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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
      setProgress(0);

      const uploadToast = toast.loading("Uploading video...");

      // Step 1: Upload video directly to Supabase
      const videoUploadResult = await uploadVideoToStorage(user.id, video);
      setProgress(50);

      // Step 2: Upload thumbnail to Supabase if selected
      let thumbnailUploadResult = null;

      if (thumbnail) {
        thumbnailUploadResult = await uploadThumbnailToStorage(
          user.id,
          thumbnail
        );
      }

      setProgress(75);

      // Step 3: Save video information in backend database
      const videoData = {
        caption,
        videoUrl: videoUploadResult.url,
        videoStoragePath: videoUploadResult.storagePath,
      };

      if (thumbnailUploadResult) {
        videoData.thumbnailUrl = thumbnailUploadResult.url;
        videoData.thumbnailStoragePath = thumbnailUploadResult.storagePath;
      }

      await createVideo(videoData);

      setProgress(100);
      toast.success("Video uploaded successfully", { id: uploadToast });

      setCaption("");
      setVideo(null);
      setThumbnail(null);

      router.push("/");
    } catch (error) {
      console.log("Upload error:", error);
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
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
                rows="4"
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

            {loading && (
              <p className="text-sm text-gray-600">
                Uploading: {progress}%
              </p>
            )}

            <button
              type="submit"
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