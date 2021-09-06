import { useState } from 'react';
import { Link } from "react-router-dom";
// the useHistory hook is used for redirects....
import { useHistory } from 'react-router-dom';
import apis from '../api';

const TodoNew = () => {
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
        <div className="TodoNew">
            <h2>Create a New Todo</h2>

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
export default TodoNew;


// class RecipesCreate extends Component {
 

//     handleChangeInputName = async event => {
//         const name = event.target.value;
//         this.setState({ name });
//     }

//     handleChangeInputImages = async event => {
//         const images = event.target.value;
//         this.setState({ images });
//     }

//     handleChangeInputDescription = async event => {
//         const description = event.target.value;
//         this.setState({ description });
//     }

//     handleChangeInputIngredients = async event => {
//         const ingredients = event.target.value;
//         this.setState({ ingredients });
//     }

//     handleChangeInputDirections = async event => {
//         const directions = event.target.value;
//         this.setState({ directions });
//     }

//     handleIncludeRecipe = async () => {
//         const { name, images, description, ingredients, directions } = this.state;
//         const payload = { name, images, description, ingredients, directions };

//         await api.createRecipe(payload).then(res => {
//             window.alert(`Recipe successfully created!`);
//             this.props.history.push('/recipes/list');
//         });
//     }

//     render() {
//         const { name, images, description, ingredients, directions } = this.state;
//         return (
//             <Wrapper>
//                 <Title>Create A New Recipe</Title>

//                 <Label>Name: </Label>
//                 <InputText
//                     type="text"
//                     value={name}
//                     onChange={this.handleChangeInputName}
//                 />

//                 <Label>Images: </Label>
//                 <InputText
//                     type="text"
//                     value={images}
//                     onChange={this.handleChangeInputImages}
//                 />

//                 <Label>Description: </Label>
//                 <InputText
//                     type="text"
//                     value={description}
//                     onChange={this.handleChangeInputDescription}
//                 />

//                 <Label>Ingredients (please include a comma and a space between ingredients): </Label>
//                 <textarea
//                     className="form-control"
//                     value={ingredients}
//                     onChange={this.handleChangeInputIngredients}
//                     style={{ height: 80, margin: '5px' }}
//                     rows={4}
//                 />

//                 <Label>Directions (please include a period and a space between each step): </Label>
//                 <textarea
//                     className="form-control"
//                     value={directions}
//                     onChange={this.handleChangeInputDirections}
//                     style={{ height: 120, margin: '5px' }}
//                     rows={6}
//                 />

//                 <Button onClick={this.handleIncludeRecipe}>Add Recipe</Button>
//                 <CancelButton href={'/recipes/list'}>Cancel</CancelButton>
//             </Wrapper>
//         )
//     }
// }