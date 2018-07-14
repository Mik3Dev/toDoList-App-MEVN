const Task = require('./../models/Task');
const _ = require('lodash');

module.exports = {
    index(req, res) {
        Task.find()
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);
            })
    },
    show(req, res){
        Task.findById(req.params.id)
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);

            })
    },
    create(req, res){
        const newTask = new Task(_.pick(req.body, ['title', 'content']));
        newTask.save()
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);
            });
    },
    update(req, res){
        const body = _.pick(req.body, ['title', 'content']);
        console.log(body);
        Task.findByIdAndUpdate(req.params.id, {
            title: body.title,
            content: body.content
        }).then(resp => {
            res.send(resp)
        }).catch(e => {
            console.log(e);
            throw new Error(e);
        })
    },
    delete(req, res){
        Task.findByIdAndRemove(req.params.id)
            .then(resp => {
                res.send(resp);
            }).catch(e => {
                console.log(e);
                throw new Error(e);
            })
    }
}