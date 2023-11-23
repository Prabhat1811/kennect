"use client";

import { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { usePost } from "@/api-sdk/hooks/post.hook";
import { useCommentList } from "@/api-sdk/hooks/comment.hook";
import CreateComment from "@/common/components/create_comment.component";
import Spinner from "@/common/components/spinner.component";
import StaticPost from "@/common/components/static_post.component";

interface pageProps {
  params: { id: string };
}

const Page: FC<pageProps> = ({ params }) => {
  const { post, isLoading, isError, mutate } = usePost(params.id);
  const {
    comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    mutate: mutateComments,
  } = useCommentList(post?._id);

  if (isLoading) return <Spinner />;

  if (isError) {
    return <div>Error fetching post data</div>;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        px: "10%",
        pt: "5%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        <StaticPost
          key={post._id}
          id={post._id}
          content={post.content}
          username={post.user.username}
          created_at={post.created_at}
        />
        <Divider sx={{ mt: "25px" }} />
        <Typography>Comments</Typography>
        {isLoadingComments ? (
          <Spinner />
        ) : (
          comments.map((comment) => (
            <StaticPost
              key={comment._id}
              id={comment._id}
              content={comment.content}
              username={comment.user.username}
              created_at={comment.created_at}
            />
          ))
        )}
        <CreateComment post_id={post._id} mutate={mutateComments} />
      </Box>
    </Box>
  );
};

export default Page;
