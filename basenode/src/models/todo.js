const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Field name is required"],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdAt: { 
        type: Date, 
        default: Date.now()
    },
    taskItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
})

todoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

todoSchema.set('toJSON', {
    virtuals: true,
});

exports.TodoModel = mongoose.model('Todo', todoSchema)
//exports.todoSchema = todoSchema
