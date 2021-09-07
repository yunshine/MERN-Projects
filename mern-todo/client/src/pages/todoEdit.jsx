import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// the useHistory hook is used for redirects....
import { useHistory } from 'react-router-dom';
import apis from '../api';

const TodoEdit = (props) => {
    const [task, setTask] = useState('');
    const [note, setNote] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [todo, setTodo] = useState(null);
    const [error, setError] = useState(null);
    // isPending used for dynamic text on form submit button...
    const [isPending, setIsPending] = useState(false);
    // first, to use the useHistory hook, you need to invoke the hook...
    const history = useHistory();

    const id = props.match.params.id;

    useEffect(() => {
        // use AbortController by 1) associating the AbortController with a specific fetch request by using as an option { signal: abortController.signal }, then we can 2) use the AbortController to stop the fetch...
        const abortController = new AbortController();

        console.log("there was a render that occurred, and useEffect ran in todoEdit.jsx file...");
        setTimeout(() => {

            fetch(`http://localhost:3000/api/todos/${id}`, { signal: abortController.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('There was an error, and data could not be fetched...');
                    }
                    return res.json();
                })
                .then(data => {
                    setTodo(data.data);
                    setIsPending(false);
                    setError(null);
                    setTask(data.data.task);
                    setNote(data.data.note);
                    setIsComplete(data.data.isComplete);
                    console.log("One Todo Data: ", data.data);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log("This fetch request has been aborted by abortController...");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 250);

        // ... the line below aborts the fetch that it is associated with
        return () => abortController.abort();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const todo = { task, note, isComplete };

        setIsPending(true);
        // how to make a post request in React...
        fetch(`http://localhost:8080/todos/create/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        }).then(() => {
            console.log("new todo created...");
            setIsPending(false);
            // how to use the useHistory hook to redirect to a specific page...
            history.push('/')
        });
    }

    return (
        <div className="TodoEdit">
            <h2>Edit This Todo</h2>

            {/* how to submit a form in React... */}
            <form onSubmit={handleSubmit}>
                <label>Todo Item</label>
                {/* how to use forms in React... */}
                <input
                    type="text"
                    required
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <label>Todo Note</label>
                {/* how to use forms in React... */}
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>

                {!isPending && <button>Submit Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
            <Link to={'/'}><button>GO HOME</button></Link>
        </div>
    );
}
export default TodoEdit;