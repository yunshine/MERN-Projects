const Todo = require('../models/todo');

/* index route controller - show all todos */
getTodos = async (req, res) => {
    await Todo.find({}, (err, todos) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        };
        if (!todos.length) {
            return res
                .status(404)
                .json({ success: false, error: `Todos not found.` });
        };
        return res.status(200).json({ success: true, data: todos });
    }).catch(err => console.log(err))
};

/* show route controller - show one todo */
getTodoById = async (req, res) => {
    console.log("TESTING: ", req)
    await Todo.findOne({ _id: req.params.id }, (err, todo) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        };

        if (!todo) {
            return res
                .status(404)
                .json({ success: false, error: `Todo not found` })
        };
        return res.status(200).json({ success: true, data: todo });
    }).catch(err => console.log("erorororro", err))
};

/* create route controller - create and save one todo */
createTodo = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a todo.',
        });
    };

    const todo = new Todo(body);

    if (!todo) {
        return res.status(400).json({ success: false, error: err });
    };

    todo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: todo._id,
                message: 'Todo successfully created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'There was an error - todo not created.',
            });
        })
};

/* update route controller - update/edit and save one todo */
updateTodo = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    };

    Todo.findOne({ _id: req.params.id }, (err, todo) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Todo not found!',
            });
        };
        todo.task = body.task;
        todo.note = body.note;
        todo.isComplete = body.isComplete;
        todo
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: todo._id,
                    message: 'Todo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Todo not updated!',
                });
            })
    });
};

deleteTodo = async (req, res) => {
    await Todo.findOneAndDelete({ _id: req.params.id }, (err, todo) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!todo) {
            return res
                .status(404)
                .json({ success: false, error: `Todo not found` });
        };

        return res.status(200).json({ success: true, data: todo });
    }).catch(err => console.log(err));
};


module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};


// const express = require('express');

// const todosController = require('../controllers/todos');

// const router = express.Router();

// router.get('/todos/list', todosController.getTodos); /* index route - show all todos */
// router.get('/todos/:id', todosController.getToDoById); /* show route - show one todo */
// router.get('/todos/new', todosController.getTodoForm); /* new route - display a form to create a new todo */
// router.get('/todos/:id/edit', todosController.editTodoForm); /* edit route - display a form to edit an existing todo */
// router.post('/todos/create', todosController.createTodo); /* create route - create and save a new todo */
// router.put('/todos/:id', todosController.updateTodo); /* update route - updates one todo in the DB, then redirects somewhere */
// router.delete('/todos/:id', todosController.deleteTodo); /* destroy route - delete one cafe from the DB, the redirects somewhere */

// module.exports = router;