const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 250
    },
    content: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);