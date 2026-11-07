import { permanentRedirect } from "next/navigation";
import { getNewsByUid, getNewsPost, newsPosts } from "@/lib/news";

type Params = { slug: string };

export function generateStaticParams() {
  return newsPosts.map((item) => ({ slug: item.sourcePath.replace("/blog/", "") }));
}

export default async function OldBlogRedirect({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const uid = slug.split("-")[0] ?? "";
  const post = getNewsByUid(uid) ?? getNewsPost(slug);
  const dest = post ? `/novosti/${post.slug}` : "/novosti";
  if (process.env.STATIC_EXPORT === "1") {
    return (
      <main className="page-wrap">
        <p>
          <a href={dest}>Перейти в новости</a>
        </p>
      </main>
    );
  }
  permanentRedirect(dest);
}
