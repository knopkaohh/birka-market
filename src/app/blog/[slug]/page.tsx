import { redirect } from "next/navigation";
import { getNewsByUid, getNewsPost, newsPosts } from "@/lib/news";

type Params = { slug: string };

export function generateStaticParams() {
  return newsPosts.map((item) => ({ slug: item.sourcePath.replace("/blog/", "") }));
}

export default async function OldBlogRedirect({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const uid = slug.split("-")[0] ?? "";
  const post = getNewsByUid(uid) ?? getNewsPost(slug);
  redirect(post ? `/novosti/${post.slug}` : "/novosti");
}
