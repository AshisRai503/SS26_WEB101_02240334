import { FaEdit } from 'react-icons/fa';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Profile Header */}
      <div className="flex items-start mb-8">
        <div className="h-24 w-24 rounded-full bg-gray-300 mr-6"></div>

        <div className="flex-1">
          <h1 className="text-xl font-bold mb-2">@username</h1>
          <h2 className="text-lg mb-4">User Name</h2>

          <button className="px-6 py-1.5 border border-gray-300 rounded-md font-medium flex items-center mb-4">
            <FaEdit className="mr-2" />Edit profile
          </button>

          <div className="flex items-center space-x-4">
            <p><span className="font-bold">0</span> Following</p>
            <p><span className="font-bold">0</span> Followers</p>
            <p><span className="font-bold">0</span> Likes</p>
          </div>

          <p className="mt-4 text-sm max-w-md">
            No bio yet.
          </p>
        </div>
      </div>

      {/* Video tabs */}
      <div className="border-b mb-4">
        <div className="flex">
          <button className="py-2 px-4 border-b-2 border-black font-medium">
            Videos
          </button>
          <button className="py-2 px-4 text-gray-500 font-medium">
            Liked
          </button>
        </div>
      </div>

      {/* Videos grid */}
      <div className="py-4">
        <div className="grid grid-cols-6 gap-1">
          {/* Empty state for now */}
          <div className="col-span-6 py-20 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-2">Upload your first video</h3>
              <p className="text-gray-500 mb-6">Your videos will appear here</p>
              <button className="bg-red-500 text-white px-8 py-2 rounded-md font-medium">
                Upload now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
