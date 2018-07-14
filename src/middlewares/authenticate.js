const User = require('./../models/User');

module.exports = {
    authenticate(req, res, next){
        const token = req.header('X-Auth');
        User.findByToken(token)
            .then(user => {
                if(!user){
                    return Promise.reject();
                }

                req.user = user;
                req.token = token;
                next()
            }).catch(err => {
                res.status(401).send();
            })
    }
}