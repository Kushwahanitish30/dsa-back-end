const express = require("express");
const Topic = require("../models/Topic");
const Problem = require("../models/Problem");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all topics with problems & completed problems
router.get("/", auth, async (req, res) => {
  try {
    const topics = await Topic.find().populate("problems");
    const user = await User.findById(req.user.id).populate("completedProblems");
    res.json({ topics, completed: user.completedProblems.map(p => p._id.toString()) });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Mark a problem as completed
router.post("/complete/:problemId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.completedProblems.includes(req.params.problemId)) {
      user.completedProblems.push(req.params.problemId);
      await user.save();
    }
    res.status(200).json("Problem marked as completed");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Seed Topics & Problems (Optional: For dev use)
router.post("/seed", async (req, res) => {
  const { topicName, problems } = req.body;
  try {
    const createdProblems = await Problem.insertMany(problems);
    const topic = new Topic({
      name: topicName,
      problems: createdProblems.map(p => p._id)
    });
    await topic.save();
    res.status(201).json("Topic and problems added");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
