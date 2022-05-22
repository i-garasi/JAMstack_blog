import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { client } from "src/libs/client";

export type Blogs = {
  title: string;
  content: string;
};

type Props = MicroCMSListResponse<Blogs>;

const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blogs>>();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blogs> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = () => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <div>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button className="rounded bg-cyan-600 py-1 px-3 font-bold text-white hover:bg-cyan-700">
          検索
        </button>

        <button
          type="reset"
          className="rounded bg-gray-500 py-1 px-3 font-bold text-white hover:bg-gray-600"
          onClick={handleClick}
        >
          リセット
        </button>
      </form>

      <p className=" my-4 text-gray-400">{`記事の総数: ${totalCount}件`}</p>

      <ul className="space-y-4">
        {contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blogs/${content.id}`}>
                <a className="text-lg text-cyan-600 underline hover:text-cyan-700">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blogs>({ endpoint: "blogs" });
  return {
    props: data,
  };
};

export default Home;
