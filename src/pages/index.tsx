import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps } from "react";
import { client } from "src/libs/client";

export type Blogs = {
  title: string;
  content: string;
};

type Props = MicroCMSListResponse<Blogs>;

const Home: NextPage<Props> = (props) => {
  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    const data = await fetch("/api/search");
    const json = await data.json();
    console.log(json);
  };

  return (
    <div>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button className="rounded bg-cyan-600 py-1 px-3 font-bold text-white hover:bg-cyan-700">
          検索
        </button>
      </form>
      <p className=" my-4 text-gray-400">{`記事の総数: ${props.totalCount}件`}</p>
      <ul className="space-y-4">
        {props.contents.map((content) => {
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
