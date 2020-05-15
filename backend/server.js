const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();

let Todo = require('./todo.model');

const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongoDB database connection established')
})

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todos)
        }
    })
})

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            console.log(err);
        }
        else{
            res.json(todo);
        }
    })
})

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({"todo": "todo added"})
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
})

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send('data not found');
        }
        else {
            todo.description = req.body.description;
            todo.responsible = req.body.responsible;
            todo.priority = req.body.priority;
            todo.isComplete = req.body.isComplete;

            todo.save()
                .then(todo => {
                    res.json("Todo Updated")
                })
                .catch(err => {
                    res.status(400).send("update failed")
                });
        }
    })
})

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
})

