"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { getSuggestedUsers, followUser, unfollowUser } from "@/services/userService";
import { useAuth } from "@/contexts/authContext";
import toast from "react-hot-toast";

export default function ExploreUsersPage() {
  const { isAuthenticated } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await getSuggestedUsers();
      setUsers(data.users || data || []);
    } catch (error) {
      console.log("User fetch error:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleFollow(userId, isFollowing) {
    if (!isAuthenticated) {
      toast.error("Please log in to follow users");
      return;
    }

    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, isFollowing: !isFollowing }
            : user
        )
      );
    } catch (error) {
      console.log("Follow error:", error);
      toast.error("Failed to update follow status");
    }
  }

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Explore Users</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-300"></div>

                  <div>
                    <p className="font-bold">@{user.username}</p>
                    <p className="text-sm text-gray-500">
                      {user.name || user.email || "TikTok user"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleFollow(user.id, user.isFollowing)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}