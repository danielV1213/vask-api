import express from "express";
import Task from "../models/task.js";

const router = express.Router();

// Getting all
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  const task = new Task({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ messsage: error.messsage });
  }
});

// Deleting one
router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.deleteOne();
    res.json({ messsage: "Deleted Task" });
  } catch (error) {
    res.status(500).json({ messsage: error.messsage });
  }
});

async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);

    if (task == null) {
      return res.status(404).json({ message: "Cannot find task" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.task = task;
  next();
}

export default router;
