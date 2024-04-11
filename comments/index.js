import express from "express";
import { randomBytes } from "crypto";
import BodyParser from "body-parser";
import { corsMiddleware, handlePreflight } from "./middlewares/cors.js";
import axios from "axios";

const app = express();
const port = 4001;

// Use BodyParser middleware to parse incoming request bodies, used to parse JSON-formatted request bodies
app.use(BodyParser.json());
app.use(handlePreflight);
app.use(corsMiddleware);

//Object to store all the data
const commentsByPostId = {};

//Check Specific Comment
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

//Create comment
app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    //Content user provide using destructuring instead of using const content = req.body.content
    const { content } = req.body;

    // req.params.id is used to extract the id parameter from the URL
    const comments = commentsByPostId[req.params.id] || [];

    //Add to the OBJECT the new data
    comments.push({ id: commentId, content, status: "pending" });

    //Update Object commentsByPostId with the comments for the specific post ID
    commentsByPostId[req.params.id] = comments;

    //Event
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    });

    res.status(201).send(comments);
  } catch (error) {
    console.error("Error sending to event-bus :", error.message);
  }
});

//Endpoint that takes all events coming from event-bus
app.post("/events", async (req, res) => {
  try {
    console.log("Event Received:", req.body.type);

    const { type, data } = req.body;

    if (type === "CommentModerated") {
      const { postId, id, status, content } = data;
      // Target the correct comment
      const comments = commentsByPostId[postId];
      //Find the comment sent to the event
      const comment = comments.find((comment) => {
        return comment.id === id;
      });
      //Update the status
      comment.status = status;

      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          content,
          postId,
          status,
        },
      });
    }

    res.send({});
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
