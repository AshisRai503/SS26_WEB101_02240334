import supabase from "../lib/supabase";
import apiClient from "../lib/api-config";

const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 10);
  const extension = originalName.split(".").pop();

  return `${timestamp}-${randomStr}.${extension}`;
};

export const uploadVideoToStorage = async (userId, file) => {
  try {
    const fileName = generateUniqueFileName(file.name);
    const filePath = `user-${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("videos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from("videos")
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      storagePath: filePath,
    };
  } catch (error) {
    console.error("Error uploading video to Supabase:", error);
    throw error;
  }
};

export const uploadThumbnailToStorage = async (userId, file) => {
  try {
    const fileName = generateUniqueFileName(file.name);
    const filePath = `user-${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("thumbnails")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      storagePath: filePath,
    };
  } catch (error) {
    console.error("Error uploading thumbnail to Supabase:", error);
    throw error;
  }
};

export const createVideo = async (videoData) => {
  try {
    const response = await apiClient.post("/videos", videoData);
    return response.data;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};