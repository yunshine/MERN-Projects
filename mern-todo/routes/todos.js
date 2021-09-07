const express = require('express');

const todosController = require('../controllers/todos');

const router = express.Router();

router.get('/todos/list', todosController.getTodos); /* index route - show all todos */
router.get('/todos/:id', todosController.getTodoById); /* show route - show one todo */
// router.get('/todos/new', todosController.getTodoForm); /* new route - display a form to create a new todo */
// router.get('/todos/:id/edit', todosController.editTodoForm); /* edit route - display a form to edit an existing todo */
router.post('/todos/create', todosController.createTodo); /* create route - create and save a new todo */
// router.put('/todos/:id', todosController.updateTodo); /* update route - updates one todo in the DB, then redirects somewhere */
// router.delete('/todos/:id', todosController.deleteTodo); /* destroy route - delete one cafe from the DB, the redirects somewhere */

module.exports = router;