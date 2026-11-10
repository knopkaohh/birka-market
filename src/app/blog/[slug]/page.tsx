import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getNewsByUid, getNewsPost, newsPosts } from "@/lib/news";
import { pageTitle } from "@/lib/seo";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const uid = slug.split("-")[0] ?? "";
  const post = getNewsByUid(uid) ?? getNewsPost(slug);
  const plain = (post?.title ?? "Новости")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  return {
    title: pageTitle(`${plain} — бирки и этикетки для одежды с логотипом, производство оптом в Москве`),
    robots: { index: false, follow: true },
  };
}

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
