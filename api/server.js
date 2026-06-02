import server from "../dist/server/server.js";

export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

  const request = new Request(url, {
    method: req.method,
    headers: new Headers(req.headers),
    body: ["GET", "HEAD"].includes(req.method) ? null : req,
    duplex: "half",
  });

  try {
    const response = await server.fetch(request, process.env, {});
    const body = await response.arrayBuffer();

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.end(Buffer.from(body));
  } catch (error) {
    console.error("SSR Error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
