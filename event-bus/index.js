import express from "express";
import BodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4005;

//MiddleWare
app.use(BodyParser.json());

//Data Store of all events
const events = [];

app.post("/events", (req, res) => {
  try {
    //Cogemos el evento
    const event = req.body;

    //Stock Events
    events.push(event);

    //Hacemos los Posts
    axios.post("http://localhost:4000/events", event).catch((error) => {
      console.error("Error sending Posts Events:", error.message);
    });
    axios.post("http://localhost:4001/events", event).catch((error) => {
      console.error("Error sending Comments Events:", error.message);
    });
    axios.post("http://localhost:4002/events", event).catch((error) => {
      console.error("Error sending Query Events:", error.message);
    });
    axios.post("http://localhost:4003/events", event).catch((error) => {
      console.error("Error sending Moderation Events:", error.message);
    });

    res.status(200).send({ status: "OK" });
  } catch (error) {
    console.error("Error getting Data:", error.message);
  }
});

app.get("/events", (req, res) => {
  try {
    res.send(events);
  } catch (error) {
    console.error("Error getting events:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
