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

/*
import usefetch and useEffect
build render




const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // the useEffect hook runs a function at every render of the component such as when it first loads and/or when the state changes...
    // to use useEffect, pass it a function. It will run this function at every render...
    // the second argument of the useEffect hook, called a dependency array, allows you to choose which renders to run this particular useEffect hook...
    useEffect(() => {
        // use AbortController by 1) associating the AbortController with a specific fetch request by using as an option { signal: abortController.signal }, then we can 2) use the AbortController to stop the fetch...
        const abortController = new AbortController();

        console.log("there was a render that occurred, and useEffect ran...");
        setTimeout(() => {
            fetch(url, { signal: abortController.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('There was an error, and data could not be fetched...');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log("This fetch request has been aborted by abortController...");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000);

        // ... the line below aborts the fetch that it is associated with
        return () => abortController.abort();
    }, [url]);
    // dependency array options: [ ] an empty array like this will run the useEffect hook on only the initial render; [name] useEffect runs when the value for 'name' changes; [blogs] useEffect runs when the value for 'blogs' changes...

    return { data, isPending, error };
}

export default useFetch;




*/

// {/* <div className="home">
//     {/* the template is created conditionally if isPending is true... */}
//     {isPending && <div><span className="loading">Loading...</span></div>}
//     {error && <div>{error}</div>}
//     {/* the template is created conditionally if blogs is not null... */}
//     {blogs && <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />}
//     {/* <BlogList blogs={blogs.filter(blog => blog.author === "Eunjoo")} title="Eunjoo's Blogs" /> */}
//     {/* <button onClick={() => setName("Eunjoo")}>change name</button> */}
// </div> */}