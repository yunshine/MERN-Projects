import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { TodosIndex, TodosNewForm } from '../components';

const Home = () => {
    const [todos, setTodos] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div className="Home">
            <h1>hi testing</h1>
            <TodosNewForm />
            <TodosIndex />
        </div>
    );
}

export default Home;