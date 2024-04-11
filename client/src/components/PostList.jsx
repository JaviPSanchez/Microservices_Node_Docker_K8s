import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate.jsx";
import CommentList from "./CommentList.jsx";

const PostList = () => {
  const [posts, setPosts] = useState({});

  //Microservice
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  // Object.value --> Build-In function JS which return an ARRAY of all the value inside an Object
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="bg-grey4 p-10 mb-2 flex flex-col justify-center items-center rounded-lg"
      >
        <h3 className="text-2xl">{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return (
    <div className="bg-grey2 rounded-3xl w-full h-2/3 p-6 flex flex-col justify-start items-center ">
      <h3 className="m-2">Post List</h3>
      <div className="grid grid-cols-fit overflow-y-auto w-5/6 gap-4">
        {renderedPosts}
      </div>
    </div>
  );
};

export default PostList;
