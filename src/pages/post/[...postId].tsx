import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from './api/auth/[...nextauth]'
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Comment } from "@prisma/client";
import CommentBox from "../../components/comment-box";
import CommentsList from "../../components/comments-list";
import type { CommentWithCountsType } from "../../components/comment-box";
import PostCard from "@/components/post-card";
import MessageInput from "@/components/message-input";

const Post = () => {
  const { query, isReady, push } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!query.postId) {
      // useRouter;
      push("/");
    }
  }, [isReady]);

  const postId = (query.postId as string[]) || [];

  const post = trpc.useQuery(["post.getById", { postId: postId[0] || "" }], {
    enabled: !!postId[0],
    retry: false,
  });

  const postComments = trpc.useQuery(
    ["comment.getAllByPostId", { postId: postId[0] || "" }],
    {
      enabled: !!postId[0],
      retry: false,
    }
  );

  const utils = trpc.useContext();

  const mutation = trpc.useMutation(["comment.add"], {
    onSuccess() {
      utils.invalidateQueries([
        "comment.getAllByPostId",
        { postId: postId[0] || "" },
      ]);
    },
  });

  const handleAddComment = (message: string) => {
    if (!postId[0]) return;
    mutation.mutate({
      message: message,
      parentId: null,
      postId: postId[0],
    });
  };

  if (postId.length === 0) return;

  if (post.isError) {
    return <div>Error...</div>;
  }

  if (post.isLoading) {
    return <div>Loading...</div>;
  }
  <Head>
    <title>Create T3 App</title>
    <meta name="description" content="Generated by create-t3-app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;

  if (post.isSuccess) {
    return (
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <PostCard post={post.data} />
        <div className="mb-20" />
        <MessageInput onMessageSubmit={handleAddComment} />
        {postComments.isSuccess && (
          <CommentsList comments={postComments.data} />
        )}
      </main>
    );
  }
};

export default Post;
