import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

mongoose.connect("mongodb://localhost:27017/toDoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Task = mongoose.model("tasks", {
  title: String,
  isDone: Boolean,
});

const port = 4000;
const app = express();
const server = http.createServer(app);

// Config:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(404).json({
      status: false,
      messaje: error,
    });
  }
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  try {
    const task = new Task({ title, isDone: false });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(404).json({
      status: false,
      messaje: error,
    });
  }
});
app.delete("/tasks", async (req, res) => {
  try {
    const { _id } = req.body;
    const lastDeletedTask = await Task.findByIdAndDelete({ _id: _id });
    res.status(201).json(lastDeletedTask);
  } catch (error) {
    res.status(404).json({
      status: false,
      messaje: error,
    });
  }
});

app.put("/tasks", async (req, res) => {
  try {
    const { _id, title } = req.body;
    const editTask = await Task.findById({ _id: _id });
    await editTask.update({ title: title });
    await editTask.save();
    res.json(editTask._id);
  } catch (error) {
    res.status(404).json({
      status: false,
      messaje: error,
    });
  }
});

app.post("/done", async (req, res) => {
  try {
    const { _id } = req.body;
    const doneTask = await Task.findById({ _id: _id });
    doneTask.isDone = !doneTask.isDone;
    await doneTask.save();
    res.json(doneTask);
  } catch (error) {
    res.status(404).json({
      status: false,
      messaje: error,
    });
  }
});

server.listen(port, () => {
  console.log("Server is started port", port);
});
