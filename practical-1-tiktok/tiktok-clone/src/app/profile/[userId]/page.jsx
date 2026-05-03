"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import VideoCard from "@/components/ui/VideoCard";
import { getUserProfile } from "@/services/userService";
import { getUserVideos } from "@/services/videoService";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId;

  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProfileData() {
    try {
      setLoading(true);

      const profileData = await getUserProfile(userId);
      const videoData = await getUserVideos({ id: userId });

      setUser(profileData.user || profileData);
      setVideos(videoData.videos || videoData || []);
    } catch (error) {
      console.log("Profile fetch error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  return (
    <MainLayout>
      <div className="p-6">
        {loading ? (
          <p>Loading profile...</p>
        ) : !user ? (
          <p>User not found.</p>
        ) : (
          <>
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-full bg-gray-300"></div>

                <div>
                  <h1 className="text-2xl font-bold">
                    @{user.username || "unknown"}
                  </h1>

                  <p className="text-gray-500">
                    {user.email || "TikTok user"}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Followers: {user._count?.followedBy || 0} | Following:{" "}
                    {user._count?.following || 0}
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Videos</h2>

            {videos.length === 0 ? (
              <p>No videos uploaded yet.</p>
            ) : (
              <div>
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}