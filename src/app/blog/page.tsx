import { permanentRedirect } from "next/navigation";

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
