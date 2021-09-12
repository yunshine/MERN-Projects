import { Link } from "react-router-dom";
import apis from '../api';

const TodosList = (props) => {
        
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("todo being deleted... ");

        // one way to make a delete request in React...
        await apis.deleteTodoById(id).then(res => {
            console.log('Todo successfuly deleted; id: ', id);
            window.location.reload();
        });
    }

    const handleCompleteToggle = async (e, todoId) => {
        e.preventDefault();

        const todo = { task, note, isComplete };
        // const payload = JSON.stringify(todo);
        const payload = todo;
        console.log("todo being edited... ", payload);

        // one way to make a put request in React...
        await apis.updateTodoById(id, payload).then(res => {
            console.log('Todo successfuly updated');
            // props.history.push(`/todos/${id}`);
            props.history.push('/');
        });
    }

    console.log("todos: ", props.todos)
    return (
        <div className="TodosList">
            {props.todos.map(todo => (
                <div className="TodoListTodo">
                    <p>
                        <button 
                            onClick={(e) => {
                            handleCompleteToggle(e, todo._id);}}>
                            {todo.isComplete ? "✅" : "○"}
                        </button>
                        {todo.task} - {todo.note} - {todo._id}
                        <Link to={`/todos/edit/${todo._id}`}><button>edit</button></Link>
                        <button 
                            onClick={(e) => {handleDelete(e, todo._id)}}>
                            delete
                        </button>
                    </p>
                </div>
            ))
            }
        </div >
    );
}

export default TodosList;