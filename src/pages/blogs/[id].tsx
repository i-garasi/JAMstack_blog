import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";
import { Blogs } from "src/pages";
import { TypographyStylesProvider } from "@mantine/core";

type Props = Blogs & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <article>
      <h1 className="font-bold">{props.title}</h1>
      <time dateTime={props.publishedAt} className="mt-2 block text-gray-500">
        {dayjs(props.publishedAt).format("YYYY/MM/DD")}
      </time>
      <TypographyStylesProvider>
        <article dangerouslySetInnerHTML={{ __html: props.content }} />
      </TypographyStylesProvider>
    </article>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: "blogs" });
  const ids = data.contents.map((content) => `/blogs/${content.id}`);
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return {
      notFound: true,
    };
  }

  const data = await client.getListDetail<Blogs>({
    endpoint: "blogs",
    contentId: ctx.params.id,
  });
  console.log(data);
  return {
    props: data,
  };
};

export default BlogId;
