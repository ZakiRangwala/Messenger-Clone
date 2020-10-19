// import dependencies
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import mongoMessages from "./messageModel.js";
//app config
const app = express();
const port = process.env.PORT || 9000;
var pusher = new Pusher({
  appId: "1092358",
  key: "ea3a5f965e31407fd5bf",
  secret: "1f1cb502c4c246126d9b",
  cluster: "us2",
  useTLS: true,
});
//middlewares
app.use(express.json());
app.use(cors());
//db config
const mongoURI =
  "mongodb+srv://admin:dlQujh4kA4s8nku0@cluster0.mxg85.mongodb.net/messengerDB?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("DB connected");
  const changeStream = mongoose.connection.collection("messages").watch();
  changeStream.on("change", (change) => {
    pusher.trigger("messages", "newMessage", {
      change: change,
    });
  });
});
//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/save/message", (req, res) => {
  const dbMessage = req.body;
  console.log(dbMessage);
  mongoMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/retrieve/conversation", (req, res) => {
  mongoMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
    //   data.sort((b, a) => {
    //     return a.timestamp - b.timestamp;
    //   });
      res.status(200).send(data);
    }
  });
});
//listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
