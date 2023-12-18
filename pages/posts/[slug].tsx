import { FC, useEffect } from "react";
import Head from "next/head";
import { Api } from "../../utils/api";
import { wrapper } from "../../redux/store";
import { isAxiosError } from "axios";
import { PostType } from "../../utils/api/types";
import { useRouter } from "next/router";
import { PostSection } from "../../components/sections/post/PostSection";
import { setUserData } from "../../redux/slices/user";
import { RelatedNews } from "../../components/sections/related-news/RelatedNews";
import { fetcher } from "../../utils/fetcher";
import { useAppDispatch } from "../../redux/hooks";
import useSWRImmutable from "swr/immutable";
import { fetcherGetMe } from "../../utils/fetcherGetMe";

interface PostProps {
  post: PostType;
  relatedPosts: PostType[];
}

const Post: FC<PostProps> = ({ post, relatedPosts }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, error } = useSWRImmutable("getMe", fetcherGetMe, {
    shouldRetryOnError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        return false; // Suppress retry for 401 errors
      }
      return true; // Retry for other errors
    },
  });

  useEffect(() => {
    if (data?.email && data?.role === "Admin") {
      dispatch(setUserData(data));
    }
  }, [data]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{post.name}</title>
      </Head>
      <PostSection
        id={post.id}
        name={post.name}
        nameRu={post.nameRu}
        slug={post.slug}
        content={post.content}
        contentRu={post.contentRu}
        registeredAt={post.registeredAt}
        updatedAt={post.updatedAt}
        banner={post.banner}
        user={post.user}
      />
      <RelatedNews relatedPosts={relatedPosts} />
    </>
  );
};

export const getStaticPaths = async () => {
  // Fetch slugs from your API or data source
  const slugs = await fetcher({ limit: 10, offset: 0, startId: 1 });

  const paths = slugs.items.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: true }; // Adjust fallback strategy as needed
};

export async function getStaticProps({
  params,
}: {
  params: { slug?: string };
}) {
  const { slug } = params || {};
  let post: PostType | null = null;
  let relatedPosts = null;
  try {
    if (slug) {
      post = await Api().post.getPostBySlug(slug.toString());
    }
    const limit = 4;
    const offset = 1;
    const startId = 1;
    relatedPosts = await fetcher({ limit, offset, startId });
    return {
      props: {
        post,
        relatedPosts: relatedPosts?.items
          ? relatedPosts.items
              .splice(0, 3)
              .filter((item) => item.id !== post?.id)
          : null,
        revalidate: 60,
      },
    };
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      console.log(err.response?.data.message);
    }
  }
  return {
    notFound: true,
  };
}

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store

// you can also use Redux `useSelector` and other hooks instead of `connect()`
// export default connect((state: RootState) => state)(Index);
export default Post;
