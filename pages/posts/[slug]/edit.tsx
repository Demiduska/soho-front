import { FC } from "react";
import Head from "next/head";
import { PostType } from "../../../utils/api/types";
import { wrapper } from "../../../redux/store";
import { Api } from "../../../utils/api";
import { isAxiosError } from "axios";
import { setUserData } from "../../../redux/slices/user";
import { CreateEditPost } from "../../../components/sections/create-post/CreateEditPost";
import { setPostBanner } from "../../../redux/slices/post";

interface PostProps {
  post: PostType;
}

const EditPost: FC<PostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.name}</title>
      </Head>
      <CreateEditPost
        title={"Edit post"}
        name={post.name}
        nameRu={post.nameRu}
        content={post.content}
        contentRu={post.contentRu}
        id={post.id}
        slug={post.slug}
        banner={post.banner}
      />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    const { slug } = ctx.query;
    let post = null;
    try {
      if (req.cookies?.Authentication) {
        const data = await Api(ctx).user.getMe();
        if (data?.email && data?.role === "Admin") {
          store.dispatch(setUserData(data));
          if (slug) {
            post = await Api(ctx).post.getPostBySlug(slug.toString());
            if (post) {
              if (post.banner) store.dispatch(setPostBanner(post.banner));
              return {
                props: {
                  post,
                },
              };
            }
          }
        }
      } else {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
      }
    }
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
);

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store

// you can also use Redux `useSelector` and other hooks instead of `connect()`
// export default connect((state: RootState) => state)(Index);
export default EditPost;
