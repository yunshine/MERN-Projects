import { Link } from "react-router-dom";

const TodosList = (props) => {
    return (
        <div className="TodosList">
            {props.todos.map(todo => (
                <div className="TodoListTodo">
                    <p>
                        <Link to={'#'}><button>{todo.isComplete ? "done" : "O"}</button></Link>
                        {todo.task} - {todo.note} - {todo._id}
                        <Link to={'#'}><button>edit</button></Link>
                        <Link to={'#'}><button>delete</button></Link>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default TodosList;