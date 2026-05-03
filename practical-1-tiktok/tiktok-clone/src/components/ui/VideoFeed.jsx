"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getVideos, getFollowingVideos } from "@/services/videoService";

export default function VideoFeed({ type = "foryou" }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchVideos() {
    try {
      setLoading(true);
      setError("");

      let data;

      if (type === "following") {
        data = await getFollowingVideos();
      } else {
        data = await getVideos();
      }

      setVideos(data.videos || data || []);
    } catch (err) {
      console.log("Video fetch error:", err);
      setError("Failed to load videos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [type]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>No videos found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}