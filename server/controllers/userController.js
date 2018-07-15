const User = require('./../models/User');
const _ = require('lodash');

userController = {
    register(req, res) {
        const newUser = new User(_.pick(req.body, ['username', 'email', 'password']));
        newUser.save()
            .then(() => {
                return newUser.generateToken();
            }).then(token => {
                res.header('X-Auth', token).json(newUser);
            }).catch(e => {
                res.status(400).send(e);
            })
    },
    login(req, res) {
        const body = _.pick(req.body, ['email', 'password']);
        User.findByCredentials(body.email, body.password)
            .then(user => {
                return user.generateToken().then(token => {
                    res.header('X-Auth', token).send(user);
                })
            }).catch(e => {
                res.status(400).send();
            })
    }
}

module.exports = userController;