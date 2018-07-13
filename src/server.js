const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');

app.set('PORT', process.env.PORT || 3000);
app.use(logger('dev'));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('PORT'), () => {
    console.log(`Server is running on port ${app.get('PORT')}`);
})