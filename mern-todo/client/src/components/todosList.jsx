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

    console.log("todos: ", props.todos)
    return (
        <div className="TodosList">
            {props.todos.map(todo => (
                <div className="TodoListTodo">
                    <p>
                        <Link to={'#'}><button>{todo.isComplete ? "done" : "O"}</button></Link>
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