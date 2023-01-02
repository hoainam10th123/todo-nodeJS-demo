const {TodoModel} = require('../models/todo')

const todoService = {}

todoService.getAllTodos = async () => {
    const todos = await TodoModel.find()
    return todos
}

todoService.newTodo = async (name) => {
    let todo = new TodoModel({
        name: name
    });

    todo = await todo.save();

    return todo
}

todoService.updateTodo = async ({id, name, isCompleted, createdAt}) => {
    const updatedProduct = await TodoModel.findByIdAndUpdate(
        id,
        {
            name: name,
            isCompleted: isCompleted,
            createdAt: createdAt,
        },
        { new: true }
    );

    return updatedProduct
}



module.exports = todoService