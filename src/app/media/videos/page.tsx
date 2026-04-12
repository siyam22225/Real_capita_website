import VideosPageClient from "@/components/videos/VideosPageClient";
import { getAllVideos } from "@/lib/videos";

export default async function VideosPage() {
let videos: Awaited<ReturnType<typeof getAllVideos>> = [];

try {
  videos = await getAllVideos();
} catch (error) {
  console.error("MEDIA_VIDEOS_PAGE_ERROR", error);
}
  return <VideosPageClient initialVideos={videos} />;
}