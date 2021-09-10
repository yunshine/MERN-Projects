import { Link } from "react-router-dom";

const TodosList = (props) => {
    // const history = useHistory();
    
    const handleDelete = async (e) => {
        // e.preventDefault();

        // const todo = { task, note, isComplete };
        // // const payload = JSON.stringify(todo);
        // const payload = todo;
        console.log("todo being deleted... ");

        // one way to make a put request in React...
        // await apis.updateTodoById(id, payload).then(res => {
        //     console.log('Todo successfuly updated');
        //     // props.history.push(`/todos/${id}`);
            // props.history.push('/');
        // });
    }

    return (
        <div className="TodosList">
            {props.todos.map(todo => (
                <div className="TodoListTodo">
                    <p>
                        <Link to={'#'}><button>{todo.isComplete ? "done" : "O"}</button></Link>
                        {todo.task} - {todo.note} - {todo._id}
                        <Link to={`/todos/edit/${todo._id}`}><button>edit</button></Link>
                        <button onClick={handleDelete}>delete</button>
                    </p>
                </div>
            ))
            }
        </div >
    );
}

export default TodosList;