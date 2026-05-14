"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { getVideos, getFollowingVideos } from "@/services/videoService";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/authContext";

export default function VideoFeed({ type = "foryou" }) {
  const { isAuthenticated } = useAuth();

  const [loadMoreRef, isLoadMoreVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  const fetchVideos = ({ pageParam }) => {
    if (type === "following") {
      return getFollowingVideos({ cursor: pageParam });
    }

    return getVideos({ cursor: pageParam });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["videos", type],
    queryFn: fetchVideos,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination?.hasNextPage) {
        return undefined;
      }

      return lastPage.pagination.nextCursor;
    },
    enabled: type !== "following" || isAuthenticated,
  });

  useEffect(() => {
    if (isLoadMoreVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isLoadMoreVisible, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (type === "following" && !isAuthenticated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-gray-500">
        Please log in to view videos from people you follow.
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-gray-500">
        Loading videos...
      </div>
    );
  }

  if (status === "error") {
    console.log("Video fetch error:", error);

    return (
      <div className="flex min-h-[400px] items-center justify-center text-red-500">
        Failed to load videos.
      </div>
    );
  }

  const videos = data?.pages?.flatMap((page) => page.videos || []) || [];

  if (videos.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-gray-500">
        No videos found.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}

      {isFetchingNextPage && (
        <div className="py-6 text-center text-gray-500">
          Loading more videos...
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div ref={loadMoreRef} className="h-10" />
      )}

      {!hasNextPage && (
        <div className="py-6 text-center text-gray-400">
          You have reached the end of the feed.
        </div>
      )}
    </div>
  );
}