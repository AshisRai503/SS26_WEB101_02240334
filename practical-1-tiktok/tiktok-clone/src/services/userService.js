import apiClient from "@/lib/api-config";

// Get user profile by id
export const getUserProfile = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile ${userId}:`, error);
    throw error;
  }
};

// Search users
export const searchUsers = async (query = "") => {
  try {
    const response = await apiClient.get(`/users`);
    return response.data;
    
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

// Follow a user
export const followUser = async (userId) => {
  try {
    const response = await apiClient.post(`/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    console.error(`Error following user ${userId}:`, error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    console.error(`Error unfollowing user ${userId}:`, error);
    throw error;
  }
};

// Get suggested users
export const getSuggestedUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching suggested users:", error);
    throw error;
  }
};