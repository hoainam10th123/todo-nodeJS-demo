const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isImportant: {
        type: Boolean,
        default: false,
    },
    taskCreatedAt: { type: Date, default: Date.now() },
})

taskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

taskSchema.set('toJSON', {
    virtuals: true,
});

exports.TaskModel = mongoose.model('Task', taskSchema)