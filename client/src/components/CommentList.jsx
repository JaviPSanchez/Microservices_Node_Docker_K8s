const CommentList = ({ comments }) => {
  if (!comments) {
    // Render a message or return null, depending on your use case
    return (
      <div className="p-10 mb-2 flex flex-col justify-center items-start rounded-lg">
        <li className="text-2xl">No Comments yet....</li>
      </div>
    );
  }

  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return (
      <div
        key={comment.id}
        className="p-10 mb-2 flex flex-col justify-center items-start rounded-lg"
      >
        <li className="text-2xl">{content}</li>
      </div>
    );
  });
  console.log(renderedComments.length);

  return (
    <div className="bg-grey2 rounded-3xl w-full h-2/3 p-6 flex flex-col justify-start items-center ">
      <h3 className="m-2 text-xl">Comments List</h3>

      <div className="overflow-y-auto text-lg w-full">{renderedComments}</div>
    </div>
  );
};

export default CommentList;
