import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Новости о бирках и этикетках для одежды с логотипом — производство оптом в Москве",
  robots: { index: false, follow: true },
};

export default function OldBlogIndex() {
  if (process.env.STATIC_EXPORT === "1") {
    return (
      <main className="page-wrap">
        <p>
          <a href="/novosti">Перейти в новости</a>
        </p>
      </main>
    );
  }
  permanentRedirect("/novosti");
}
