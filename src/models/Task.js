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
    completedDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);