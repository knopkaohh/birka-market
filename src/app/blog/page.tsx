import { permanentRedirect } from "next/navigation";

export default function OldBlogIndex() {
  permanentRedirect("/novosti");
}
