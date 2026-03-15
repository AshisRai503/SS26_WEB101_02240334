'use client';
import { useState } from 'react';
import { 
  FaHeart, FaRegHeart, FaComment, 
  FaShare, FaMusic 
} from 'react-icons/fa';

export default function VideoCard({ post }) {
  const [liked, setLiked] = useState(false);

  // Placeholder data
  const { username, caption, audio, likes, comments, shares } = post;

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex py-6 border-b">
      {/* User avatar */}
      <div className="mr-3">
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
      </div>

      <div className="flex-1">
        {/* User info and caption */}
        <div className="mb-2">
          <span className="font-bold hover:underline cursor-pointer">{username}</span>
          <p className="text-sm mt-1">{caption}</p>
        </div>

        {/* Audio info */}
        <div className="flex items-center text-sm mb-3">
          <FaMusic className="mr-2 text-xs" />
          <span className="truncate max-w-[250px]">{audio}</span>
        </div>

        <div className="flex">
          {/* Video container */}
          <div className="mr-5 w-[300px] h-[530px] bg-black rounded-md flex items-center justify-center relative overflow-hidden">
            <p className="text-white">Video Placeholder</p>
            <div className="absolute bottom-4 left-4 text-white text-sm">
              <p className="mb-1">0:30</p>
            </div>
          </div>

          {/* INTERACTION BUTTONS */}
          <div className="flex flex-col justify-end space-y-4 py-2">
            {/* Like button */}
            <button 
              className="flex flex-col items-center group"
              onClick={handleLikeClick}
            >
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition border border-gray-300">
                {liked ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-700 text-xl" />
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{liked ? likes + 1 : likes}</span>
            </button>

            {/* Comment button */}
            <button className="flex flex-col items-center group">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition border border-gray-300">
                <FaComment className="text-gray-700 text-xl" />
              </div>
              <span className="text-xs mt-1 font-medium">{comments}</span>
            </button>

            {/* Share button */}
            <button className="flex flex-col items-center group">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition border border-gray-300">
                <FaShare className="text-gray-700 text-xl" />
              </div>
              <span className="text-xs mt-1 font-medium">{shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}