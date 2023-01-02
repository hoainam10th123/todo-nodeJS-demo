const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const { TaskModel } = require('../models/task')

router.get('/:id', async (req, res, next) => {
    try {
        const category = await TaskModel.findById(req.params.id);

        if (!category) {
            res.status(404).json({ message: 'The task with the given ID was not found.' })
        }
        res.status(200).send(category);
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid task Id');
        }

        const updatedTodo = await TaskModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                isCompleted: req.body.isCompleted,
                isImportant: req.body.isImportant,
                taskCreatedAt: req.body.taskCreatedAt,
            },
            { new: true }
        );

        if (!updatedTodo) return res.status(400).send('the task cannot be updated!');

        res.send(updatedTodo);
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const todo = await TaskModel.findByIdAndRemove(req.params.id)
        if (todo) {
            return res.status(200).json({
                success: true,
                message: 'the task is deleted!'
            })
        } else {
            return res.status(404).json({ success: false, message: 'Task not found!' });
        }

    } catch (error) {
        next(error)
    }
})

module.exports = router