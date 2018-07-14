const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/logout', (req, res) => {
    res.send('Logout')
});

module.exports = router;