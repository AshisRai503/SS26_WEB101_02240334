export default function ProfilePage() {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-300 mr-4"></div>
        <div>
          <h2 className="text-2xl font-bold">@username</h2>
          <p className="text-gray-500">User Name</p>
          <p className="text-sm mt-2">Bio goes here...</p>
        </div>
      </div>
      
      <div className="flex space-x-6 mb-6">
        <div><span className="font-bold">123</span> <span className="text-gray-500">Following</span></div>
        <div><span className="font-bold">456</span> <span className="text-gray-500">Followers</span></div>
        <div><span className="font-bold">789</span> <span className="text-gray-500">Likes</span></div>
      </div>
      
      <h3 className="text-lg font-semibold mb-3">My Videos</h3>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[9/16] bg-gray-300 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}