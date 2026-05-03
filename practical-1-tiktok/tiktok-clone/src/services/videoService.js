import apiClient from "@/lib/api-config";

// Get videos for the For You feed
export const getVideos = async ({ cursor, limit = 10 } = {}) => {
  try {
    let queryParams = `limit=${limit}`;

    if (cursor) {
      queryParams += `&cursor=${cursor}`;
    }

    const response = await apiClient.get(`/videos?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

// Get videos from followed users
export const getFollowingVideos = async ({ cursor, limit = 10 } = {}) => {
  try {
    let queryParams = `limit=${limit}`;

    if (cursor) {
      queryParams += `&cursor=${cursor}`;
    }

    const response = await apiClient.get(`/videos/following?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching following videos:", error);
    throw error;
  }
};

// Get one video by id
export const getVideoById = async (id) => {
  try {
    const response = await apiClient.get(`/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    throw error;
  }
};

// Get videos uploaded by a specific user
export const getUserVideos = async ({ id, cursor, limit = 10 }) => {
  try {
    let queryParams = `limit=${limit}`;

    if (cursor) {
      queryParams += `&cursor=${cursor}`;
    }

    const response = await apiClient.get(`/users/${id}/videos?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching videos for user ${id}:`, error);
    throw error;
  }
};

// Get comments for a video
export const getVideoComments = async (videoId) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for video ${videoId}:`, error);
    return { comments: [] };
  }
};

// Like a video
export const likeVideo = async (videoId) => {
  try {
    const response = await apiClient.post(`/videos/${videoId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error liking video ${videoId}:`, error);
    throw error;
  }
};

// Unlike a video
export const unlikeVideo = async (videoId) => {
  try {
    const response = await apiClient.delete(`/videos/${videoId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error unliking video ${videoId}:`, error);
    throw error;
  }
};

// Add a comment
export const addComment = async (videoId, content) => {
  try {
    const response = await apiClient.post("/comments", {
      videoId,
      content,
    });

    return response.data;
  } catch (error) {
    console.error(`Error adding comment to video ${videoId}:`, error);
    throw error;
  }
};