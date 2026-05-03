import MainLayout from "@/components/layout/MainLayout";
import VideoFeed from "@/components/ui/VideoFeed";

export default function FollowingPage() {
  return (
    <MainLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4 px-4">Following</h1>
        <VideoFeed type="following" />
      </div>
    </MainLayout>
  );
}