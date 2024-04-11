import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  console.log(title);

  //Microservice
  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/posts", { title });
      setTitle("");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  }

  return (
    <form
      className="bg-grey3 rounded-3xl w-full h-fit flex flex-col justify-start items-center p-6 gap-8"
      onSubmit={handleOnSubmit}
    >
      <h3 className="text-center">Create a Post 😍</h3>
      <div className="flex flex-col">
        <label className="text-lg m-2">Title</label>
        <input
          className="w-fit text-2xl p-4 rounded-2xl"
          type="text"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button className="text-2xl bg-grey4 border-[0.5px] border-dark2 w-fit p-4 rounded-2xl hover:scale-105 drop-shadow-xl">
        Create
      </button>
    </form>
  );
};

export default PostCreate;
