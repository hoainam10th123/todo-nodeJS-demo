const todoService = require('../services/todo.service')

const todoController = {}

todoController.getAllTodos = async(req, res) =>{
    try {
        const todos = await todoService.getAllTodos()
        res.status(200).json({todos: todos})
    } catch (error) {
        res.status(400)
    }
}

module.exports = todoController