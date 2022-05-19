import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/client";

export type Blogs = {
  title: string;
  content: string;
};

type Props = MicroCMSListResponse<Blogs>;

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <p className="text-gray-400">{`記事の総数: ${props.totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blogs/${content.id}`}>
                <a className="text-lg text-cyan-600 underline hover:text-blue-300">
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
