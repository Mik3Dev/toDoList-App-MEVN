const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const taskRouter = require('./routes/task-route');

mongoose.connect('mongodb://appUser:123abc@ds149960.mlab.com:49960/task-list')
    .then(() => {
        console.log('Successfuly connected to database');
    }).catch((e) => {
        console.log('Unable to connect to database');   
    });

app.set('PORT', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());

app.use('/tasks', taskRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong');
})

app.listen(app.get('PORT'), () => {
    console.log(`Server is running on port ${app.get('PORT')}`);
})