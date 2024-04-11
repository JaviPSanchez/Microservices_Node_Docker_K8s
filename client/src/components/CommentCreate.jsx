import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  //Microservice
  async function handleOnSubmit(e) {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  }

  return (
    <form
      className="rounded-3xl w-fit h-auto flex flex-col justify-start items-center p-6 gap-8"
      onSubmit={handleOnSubmit}
    >
      <div className="flex flex-col">
        <label className="text-lg m-2">New Comment</label>
        <input
          className="w-fit text-2xl p-4 rounded-2xl"
          type="text"
          placeholder="Enter a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="text-2xl bg-grey4 border-[0.5px] border-dark2 w-fit p-4 rounded-2xl hover:scale-105 drop-shadow-xl">
        Submit
      </button>
    </form>
  );
};

export default CommentCreate;
