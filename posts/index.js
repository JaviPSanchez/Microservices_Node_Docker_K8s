import express from "express";
import { randomBytes } from "crypto";
import BodyParser from "body-parser";
import { corsMiddleware, handlePreflight } from "./middlewares/cors.js";
import axios from "axios";

const app = express();
const port = 4000;

// Use BodyParser middleware to parse incoming request bodies, used to parse JSON-formatted request bodies
app.use(BodyParser.json());
app.use(handlePreflight);
app.use(corsMiddleware);

//Object to store all the data
const posts = {};

//Check All Posts
app.get("/posts", (req, res) => {
  res.status(201).send(posts);
});

//Create Posts
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  try {
    posts[id] = {
      id,
      title,
    };
    res.status(201).send(posts[id]);
  } catch (error) {
    console.error("Error creating the Post:", error.message);
  }
  try {
    //We send the Event with two properties, type and the post info
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.error("Error sending to the Event-bus", error.message);
  }
});

//Endpoint that takes all events coming from event-bus
app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);
  res.status(200).send({});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
