import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, isAbsolute, join, normalize, relative, resolve } from "node:path";

const root = resolve(process.cwd());
const requestedPort = Number(process.argv[2] || 4173);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt; charset=utf-8"
};

createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" }).end("Adresse invalide");
    return;
  }
  const relativePath = normalize(pathname === "/" ? "index.html" : pathname.replace(/^\/+/, ""));
  let filePath = resolve(join(root, relativePath));
  const pathFromRoot = relative(root, filePath);

  if (pathFromRoot.startsWith("..") || isAbsolute(pathFromRoot)) {
    response.writeHead(403).end("Accès refusé");
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Page introuvable");
    return;
  }

  const fileStats = statSync(filePath);
  const contentType = mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
  const commonHeaders = {
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600"
  };
  const range = request.headers.range;

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    let start;
    let end;
    if (match && match[1] === "" && match[2] !== "") {
      const suffixLength = Number(match[2]);
      start = Math.max(fileStats.size - suffixLength, 0);
      end = fileStats.size - 1;
    } else {
      start = match?.[1] ? Number(match[1]) : Number.NaN;
      end = match?.[2] ? Number(match[2]) : fileStats.size - 1;
    }
    if (!match || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || start >= fileStats.size) {
      response.writeHead(416, { ...commonHeaders, "Content-Range": `bytes */${fileStats.size}` }).end();
      return;
    }
    const boundedEnd = Math.min(end, fileStats.size - 1);
    response.writeHead(206, {
      ...commonHeaders,
      "Content-Range": `bytes ${start}-${boundedEnd}/${fileStats.size}`,
      "Content-Length": boundedEnd - start + 1
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath, { start, end: boundedEnd }).pipe(response);
    return;
  }

  response.writeHead(200, {
    ...commonHeaders,
    "Content-Length": fileStats.size,
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(filePath).pipe(response);
}).listen(requestedPort, "127.0.0.1", () => {
  console.log(`Lotus Med est disponible sur http://127.0.0.1:${requestedPort}`);
});
