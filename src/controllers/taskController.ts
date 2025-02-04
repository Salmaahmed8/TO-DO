import { Request, Response } from "express";
import Task from "../models/Task";
import { z } from "zod";

// Validation schema
const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const { title, description } = validatedData;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
};

// Get all tasks (with pagination)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: req.user._id, deletedAt: null })
      .limit(limit)
      .skip(skip);

    const totalTasks = await Task.countDocuments({ user: req.user._id, deletedAt: null });

    res.json({ tasks, totalPages: Math.ceil(totalTasks / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single task
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id, deletedAt: null });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id, deletedAt: null },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Soft delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task soft deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve deleted tasks
export const getDeletedTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user._id, deletedAt: { $ne: null } });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
