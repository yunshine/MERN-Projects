import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { TodosIndex, TodosNew } from '../components';

const Home = () => {
    const [todos, setTodos] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    return (
        <h1>hi testing</h1>
    );
}

export default Home;