import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import { imageArr } from "@/types";

export async function GET(request: Request) {
  const dir = "public/designs";

  let imageArr: imageArr[] = [];

  fs.readdirSync(dir).map((filename) => {
    const dimension = sizeOf(`${process.cwd()}/public/designs/${filename}`);

    let obj: imageArr = {
      width: dimension.width,
      height: dimension.height,
      path: `${path.join("/designs/", filename)}`,
    };
    imageArr.push(obj);
  });

  const body = JSON.stringify(imageArr);

  const headers = {
    "Content-Type": "application/json",
  };

  return new Response(body, { headers });
}
