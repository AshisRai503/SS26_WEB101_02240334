"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaComment, FaShare, FaMusic } from "react-icons/fa";
import { useAuth } from "@/contexts/authContext";
import { likeVideo, unlikeVideo } from "@/services/videoService";
import toast from "react-hot-toast";

export default function VideoCard({ video }) {
  const { isAuthenticated } = useAuth();

  const [isLiked, setIsLiked] = useState(video?.isLiked || false);
  const [likeCount, setLikeCount] = useState(video?.likeCount || 0);

  const getVideoUrl = (url) => {
    if (!url) return "";

    if (url.startsWith("http")) {
      return url;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const serverUrl = baseUrl.replace("/api", "");

    return `${serverUrl}${url}`;
  };

  async function handleLike() {
    if (!isAuthenticated) {
      toast.error("Please log in to like videos");
      return;
    }

    try {
      if (isLiked) {
        await unlikeVideo(video.id);
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await likeVideo(video.id);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Like error:", error);
      toast.error("Failed to update like");
    }
  }

  return (
    <div className="flex gap-4 border-b py-6">
      {/* Avatar */}
      <div className="h-12 w-12 rounded-full bg-gray-300"></div>

      {/* Content */}
      <div>
        <div className="mb-2">
          <Link href={`/profile/${video?.user?.id}`}>
            <span className="font-bold">
              @{video?.user?.username || "unknown"}
            </span>
          </Link>

          <p>{video?.caption}</p>

          <p className="flex items-center gap-2 text-sm">
            <FaMusic />
            Original Sound - {video?.user?.username || "User"}
          </p>
        </div>

        <div className="flex items-end gap-4">
          <div className="bg-black rounded-md overflow-hidden w-[360px] h-[620px] flex items-center justify-center">
            {video?.videoUrl ? (
              <video
                src={getVideoUrl(video.videoUrl)}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-white">Video Placeholder</p>
            )}
          </div>

          <div className="flex flex-col gap-4 text-center">
            <button onClick={handleLike}>
              <div className="bg-gray-100 rounded-full p-4">
                <FaHeart className={isLiked ? "text-red-500" : ""} />
              </div>
              <p>{likeCount}</p>
            </button>

            <button>
              <div className="bg-gray-100 rounded-full p-4">
                <FaComment />
              </div>
              <p>{video?.commentCount || 0}</p>
            </button>

            <button>
              <div className="bg-gray-100 rounded-full p-4">
                <FaShare />
              </div>
              <p>{video?.shareCount || 0}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}