import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import apis from '../api';


const TodosIndex = () => {
    const [todos, setTodos] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // use AbortController by 1) associating the AbortController with a specific fetch request by using as an option { signal: abortController.signal }, then we can 2) use the AbortController to stop the fetch...
        const abortController = new AbortController();

        console.log("there was a render that occurred, and useEffect ran...");
        setTimeout(() => {
            
            fetch('http://localhost:3000/api/todos/list', { signal: abortController.signal })
            // await api.getAllRecipes().
            .then(res => {
                if (!res.ok) {
                    throw Error('There was an error, and data could not be fetched...');
                }
                console.log("in fetch good...", res);
                    return res.json();
                })
                .then(data => {
                    setTodos(data);
                    setIsPending(false);
                    setError(null);
                    console.log("testing todos: ", data)
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log("This fetch request has been aborted by abortController...");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 500);

        // ... the line below aborts the fetch that it is associated with
        return () => abortController.abort();
    }, []);
    // dependency array options: [ ] an empty array like this will run the useEffect hook on only the initial render; [name] useEffect runs when the value for 'name' changes; [blogs] useEffect runs when the value for 'blogs' changes...

    return (
        <div className="TodosIndex">
            <h1>this is the todosindex...</h1>
        </div>
    );
}

export default TodosIndex;
