const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller') // demo
const mongoose = require('mongoose');
const { TodoModel } = require('../models/todo')
const { TaskModel } = require('../models/task')


//router.get('/', (req, res) => todoController.getAllTodos(req, res))

// Em thích dùng cách dưới này hơn, vì cách này nó gợi ý code làm rất dể, 
// còn cách trên khi viết service nó ko gợi ý code, em mới nên ko thể code đc.
router.get('/', async (req, res, next) => {
    try {
        const todos = await TodoModel.find().populate('taskItems')
        
        if(todos) 
            res.status(200).json({ todos: todos })
        else 
            res.status(400).json({ message: 'Bad request.' })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        // get todo with task Items relatety
        const category = await TodoModel.findById(req.params.id).populate('taskItems')

        if (!category) {
            res.status(404).json({ message: 'The todo with the given ID was not found.' })
        }
        res.status(200).send(category);
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const taskItems = await Promise.all(
            req.body.taskItems.map(async (taskItem) => {
                let newTaskItem = new TaskModel({
                    name: taskItem.name                    
                });
    
                newTaskItem = await newTaskItem.save();
    
                return newTaskItem._id;
            })
        )

        let todo = new TodoModel({
            name: req.body.name,
            taskItems: taskItems
        })
        todo = await todo.save();

        if (!todo)
            return res.status(400).send('the todo cannot be created!')

        res.send(todo);
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Todo Id');
        }

        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                isCompleted: req.body.isCompleted,
                createdAt: req.body.createdAt,
            },
            { new: true }
        );

        if (!updatedTodo) return res.status(400).send('the todo cannot be updated!');

        res.send(updatedTodo);
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const todo = await TodoModel.findByIdAndRemove(req.params.id)
        if (todo) {
            return res.status(200).json({
                success: true,
                message: 'the todo is deleted!'
            })
        } else {
            return res.status(404).json({ success: false, message: 'Todo not found!' });
        }

    } catch (error) {
        next(error)
    }
})

module.exports = router