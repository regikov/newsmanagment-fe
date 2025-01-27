import { fetchArticleById } from "../../api/articles";
import ArticleClient from "./ArticleClient";
import { redirect } from "next/navigation";

type DeviceType = "web" | "tablet" | "phone";

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { device?: string };
}) {
  const articleId = Number(params.id);

  // Validate the device type
  const validDeviceTypes: DeviceType[] = ["web", "tablet", "phone"];
  const device = validDeviceTypes.includes(searchParams?.device as DeviceType)
    ? (searchParams.device as DeviceType)
    : "web"; 

  console.log("Device:", device); 

  if (!searchParams?.device) {
    redirect(`/articles/${params.id}?device=web`);
    return null;
  }

  // Fetch article data
  const article = await fetchArticleById(articleId);

  return <ArticleClient article={article} device={device} />;
}
