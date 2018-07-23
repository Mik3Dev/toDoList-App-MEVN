const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');

const taskRouter = require('./routes/task-route');
const userRouter = require('./routes/user-route');

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log('Successfuly connected to database');
    }).catch((e) => {
        console.log('Unable to connect to database');   
    });

app.set('PORT', process.env.PORT || config.PORT);
app.use(logger('dev'));
app.use(express.json());

app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong');
})

app.listen(app.get('PORT'), () => {
    console.log(`Server is running on port ${app.get('PORT')}`);
})