import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// the useHistory hook is used for redirects....
// import { useHistory } from 'react-router-dom';
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
    // const history = useHistory();
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
                    console.log("One Todo's Data: ", data.data);
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

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const todo = { task, note, isComplete };
    //     console.log("todo being edited... ", todo)

    //     setIsPending(true);
    //     // one way to make a put request in React...
    //     fetch(`http://localhost:3000/api/todos/${id}`, {
    //         method: 'PUT',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(todo)
    //     }).then(() => {
    //         console.log("todo has been updated...");
    //         setIsPending(false);
    //         // how to use the useHistory hook to redirect to a specific page...
    //         history.push(`/todos/edit/${id}`);
    //     });
    // }

    const handleEdit = async (e) => {
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

    const handleDelete = async (e) => {
        e.preventDefault();

        console.log("todo being deleted... ");

        // one way to make a delete request in React...
        await apis.deleteTodoById(id).then(res => {
            console.log('Todo successfuly deleted; id: ', id);
            props.history.push('/');
        });
    }

    return (
        <div className="TodoEdit">
            <h2>Edit This Todo</h2>

            {/* how to submit a form in React... */}
            <form>
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

                {!isPending && <button onClick={handleEdit}>Update Todo</button>}
                {!isPending && <button onClick={handleDelete}>Delete Todo</button>}
                {isPending && <button disabled>Updating Todo...</button>}
            </form>
            <Link to={'/'}><button>GO HOME</button></Link>
        </div>
    );
}
export default TodoEdit;