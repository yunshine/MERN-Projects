import { useState } from 'react';
import { Link } from "react-router-dom";
// the useHistory hook is used for redirects....
import { useHistory } from 'react-router-dom';
import apis from '../api';

const TodoEdit = () => {
    const [task, setTask] = useState('');
    const [note, setNote] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    // isPending used for dynamic text on form submit button...
    const [isPending, setIsPending] = useState(false);
    // first, to use the useHistory hook, you need to invoke the hook...
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        const todo = { task, note, isComplete };

        setIsPending(true);

        // how to make a post request in React...
        fetch('http://localhost:8080/todos/create', {
            method: 'POST',
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
            <h2>Edita New Todo</h2>

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