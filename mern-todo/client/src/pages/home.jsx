import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const TodosIndex = () => {
    const [todos, setTodos] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    return (
        <Link to={'/todos/new'}><button>create a new todo</button></Link>
    );
}

export default TodosIndex;