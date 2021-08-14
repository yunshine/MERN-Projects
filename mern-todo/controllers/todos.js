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
                .json({ success: false, error: `Todos not found` });
        };
        return res.status(200).json({ success: true, data: todos });
    }).catch(err => console.log(err))
};

createRecipe = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a recipe',
        });
    };

    const recipe = new Recipe(body);

    if (!recipe) {
        return res.status(400).json({ success: false, error: err });
    };

    recipe
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: recipe._id,
                message: 'Recipe created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'There was an error - recipe not created',
            });
        })
};

updateRecipe = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    };

    Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Recipe not found!',
            });
        };
        recipe.name = body.name;
        recipe.images = body.images;
        recipe.description = body.description;
        recipe.ingredients = body.ingredients;
        recipe.directions = body.directions;
        recipe
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: recipe._id,
                    message: 'Recipe updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Recipe not updated!',
                });
            })
    });
};

deleteRecipe = async (req, res) => {
    await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` });
        };

        return res.status(200).json({ success: true, data: recipe });
    }).catch(err => console.log(err));
};

getRecipeById = async (req, res) => {
    await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        };

        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        };
        return res.status(200).json({ success: true, data: recipe });
    }).catch(err => console.log(err))
};

module.exports = {
    getTodos,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
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