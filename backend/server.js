const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// Configure CORS to be more permissive
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Connect to MongoDB using environment variable or fallback to localhost for local development
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedbackdb';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const Feedback = mongoose.model("Feedback", {
  name: String,
  message: String
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).send("Name and message are required");
    }
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).send("Feedback saved");
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Error saving feedback", details: error.message });
  }
});

app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Error fetching feedback", details: error.message });
  }
});

// Health check endpoint for OpenShift
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
