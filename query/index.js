import express from "express";
import BodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 4002;

// Use BodyParser middleware to parse incoming request bodies, used to parse JSON-formatted request bodies
app.use(BodyParser.json());
app.use(cors());

//Object to store all the Posts and Comments
const posts = {};

//Function to handle each event:
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    // Initialize the post if it doesn't exist
    if (!posts[postId]) {
      console.warn(
        `Post with ID ${postId} not found, initializing empty post.`
      );
      posts[postId] = { id: postId, title: "", comments: [] };
    }

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    if (!posts[postId]) {
      console.error(`Post with ID ${postId} not found.`);
      return;
    }

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    if (comment) {
      comment.status = status;
      comment.content = content;
    } else {
      console.error(`Comment with ID ${id} not found.`);
    }
  }
};

//Endpoint Check All Posts
app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

//Endpoint that takes all events coming from event-bus
app.post("/events", (req, res) => {
  try {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.status(200).send({});
  } catch (error) {
    console.error("Error handling events:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  //Dentro de res tendremos data
  const res = await axios.get("http://localhost:4005/events");

  //Loopeamos para obtener todos los events
  for (let event of res.data) {
    console.log("Processing event...:", event.type);

    //Handle Event
    handleEvent(event.type, event.data);
  }
});
