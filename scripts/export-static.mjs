import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src/app/api");
const apiHide = path.join(root, ".api-export-hide");
const outDir = path.join(root, "out");

function restoreApi() {
  if (fs.existsSync(apiHide)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
    fs.renameSync(apiHide, apiDir);
  }
}

function hideApi() {
  if (!fs.existsSync(apiDir)) return;
  fs.rmSync(apiHide, { recursive: true, force: true });
  fs.renameSync(apiDir, apiHide);
}

function rule(source, destination) {
  const pattern = source
    .replace(/^\//, "")
    .replace(/\./g, "\\.")
    .replace(/:path\*/g, "(.+)")
    .replace(/\/:path\*/g, "/(.+)");
  const target = destination.replace(/:path\*/g, "$1");
  const optional = pattern.endsWith("/(.+)") ? pattern.replace("/(.+)", "(?:/(.+))?") : pattern;
  const used = source.includes(":path*") && !destination.includes(":path*") ? optional : pattern;
  let dest = source.includes(":path*") && !destination.includes(":path*") ? destination : target;
  if (dest !== "/" && !dest.endsWith("/")) dest += "/";
  return `RewriteRule ^${used}/?$ ${dest} [R=301,L]`;
}

function htaccess() {
  const news = fs.readFileSync(path.join(root, "src/lib/news.ts"), "utf8");
  const slugs = [...news.matchAll(/slug: "([^"]+)"/g)].map((item) => item[1]);
  const sources = [...news.matchAll(/sourcePath: "([^"]+)"/g)].map((item) => item[1]);
  const fixed = [
    ["/plastic/tproduct/:path*", "/satin/tproduct/$1"],
    ["/zip-pack/tproduct/374732634432-zip-lock-paket-dumed", "/zip-pack"],
    ["/page143553596.html", "/"],
    ["/page185433209.html", "/"],
    ["/page274943709.html", "/"],
    ["/katalog/sajty", "/sozdanie-sajtov"],
    ["/sajty", "/sozdanie-sajtov"],
    ["/blog/bjcudtf2r1-aktsiya-sentyabrya-besplatnii-maket-na-v", "/novosti"],
    ["/products", "/katalog"],
    ["/info", "/o-kompanii"],
    ["/delivery", "/dostavka"],
    ["/payment", "/oplata"],
    ["/contacts", "/kontakty"],
    ["/news/:path*", "/novosti"],
    ["/news", "/novosti"],
    ["/thanks", "/spasibo"],
    ["/sayty", "/katalog"],
    ["/razrabotka-saytov", "/katalog"],
    ["/lending", "/katalog"],
    ["/internet-magazin", "/katalog"],
    ["/korporativnyy-sayt", "/katalog"],
    ["/landing-page", "/katalog"],
    ["/landing", "/katalog"],
    ["/guide", "/kak-vybrat"],
    ["/podbor", "/kak-vybrat"],
    ["/printing", "/katalog/poligrafiya"],
    ["/blog", "/novosti"],
  ];
  const lines = [
    "DirectoryIndex index.html",
    "Options -MultiViews",
    "RewriteEngine On",
    "RewriteRule ^api/lead/?$ /lead.php [L]",
    ...fixed.map(([source, destination]) => rule(source, destination)),
  ];
  sources.forEach((source, index) => {
    const slug = slugs[index];
    if (!source || !slug) return;
    lines.push(rule(source, `/novosti/${slug}`));
  });
  lines.push("RewriteRule ^blog/(.+)$ /novosti/ [R=301,L]");
  lines.push("DirectorySlash On");
  fs.writeFileSync(path.join(outDir, ".htaccess"), lines.join("\n") + "\n");
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["next", "build", "--webpack"], {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, STATIC_EXPORT: "1" },
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`build exited ${code}`));
    });
  });
}

fs.rmSync(path.join(root, ".next/dev"), { recursive: true, force: true });
hideApi();
try {
  await runBuild();
  if (!fs.existsSync(path.join(outDir, "index.html"))) {
    throw new Error("out/index.html was not created");
  }
  htaccess();
  const adminHtml = path.join(outDir, "admin", "index.html");
  fs.mkdirSync(path.dirname(adminHtml), { recursive: true });
  fs.writeFileSync(
    adminHtml,
    '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=index.php"><script>location.replace("index.php")</script><title>Заявки</title>',
  );
  console.log("static export ready:", outDir);
} finally {
  restoreApi();
}
