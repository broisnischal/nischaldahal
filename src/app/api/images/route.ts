import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const dir = "public/designs";

  const images = fs.readdirSync(dir).map((filename) => `${path.join("/designs/", filename)}`);
  const body = JSON.stringify(images);

  const headers = {
    "Content-Type": "application/json",
  };

  return new Response(body, { headers });
}
