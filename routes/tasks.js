const express = require('express');
const router = express.Router();
const Task = require("../models/Task.js");

router.post('/create', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem creating the task" });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.status(200).send(tasks); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem retrieving the tasks" });
    }
});

router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Task id not found" });
    }
});

router.put('/markAsCompleted/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, // Cambié _id por id
            { completed: true },
            { new: true }
        );
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem updating the task" });
    }
});

router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: req.body.completed, title: req.body.title }, 
            { new: true }
        );
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem updating the task" });
    }
});

router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem deleting the task" });
    }
});

module.exports = router;