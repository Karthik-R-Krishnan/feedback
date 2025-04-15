const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

mongoose.connect('mongodb://localhost:27017/feedbackdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Feedback = mongoose.model("Feedback", {
  name: String,
  message: String
});

app.post("/api/feedback", async (req, res) => {
  const { name, message } = req.body;
  const feedback = new Feedback({ name, message });
  await feedback.save();
  res.status(201).send("Feedback saved");
});

app.get("/api/feedback", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

// Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
