import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/libs/client";
import { Blogs } from "src/pages";

// TODO: 例外処理
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await client.getList<Blogs>({
    endpoint: "blogs",
    queries: { q: req.body.q },
  });
  console.log(data);
  res.status(200).json(data);
};

export default handler;
