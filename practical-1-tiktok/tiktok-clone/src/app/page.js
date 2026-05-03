import MainLayout from "@/components/layout/MainLayout";
import VideoFeed from "../components/ui/VideoFeed";

export default function Home() {
  return (
    <MainLayout>
      <div className="py-4">
        <VideoFeed />
      </div>
    </MainLayout>
  );
}