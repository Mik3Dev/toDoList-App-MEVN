const Task = require('./../models/Task');
const _ = require('lodash');

module.exports = {
    index(req, res) {
        Task.find({createdBy: req.user._id})
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);
            })
    },
    show(req, res){
        Task.findOne({_id: req.params.id, createdBy: req.user._id})
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);

            })
    },
    create(req, res){
        const newTask = new Task(_.merge(_.pick(req.body, ['title', 'content']),{createdBy: req.user._id}));
        newTask.save()
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);
            });
    },
    update(req, res){
        const body = _.merge(_.pick(req.body, ['title', 'content', 'completed']),{createdBy: req.user._id});
        Task.findOneAndUpdate({_id: req.params.id, createdBy: req.user._id}, body).then(resp => {
            res.send(resp)
        }).catch(e => {
            console.log(e);
            throw new Error(e);
        })
    },
    delete(req, res){
        Task.findOneAndRemove({_id: req.params.id, createdBy: req.user._id})
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);
            })
    }
}