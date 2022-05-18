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
      <p>{`記事の総数: ${props.totalCount}件`}</p>
      <ul>
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blogs/${content.id}`}>
                <a>{content.title}</a>
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
