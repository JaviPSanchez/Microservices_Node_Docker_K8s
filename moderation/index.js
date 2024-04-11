import express from "express";
import axios from "axios";
import BodyParser from "body-parser";

const app = express();
const port = 4003;

app.use(BodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.status(200).send({});
});

app.listen(port, () => {
  console.log(`Server listening in ${port}`);
});
