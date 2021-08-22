import api from '../api'

const todoCreate = () => {
    return (
        <form>
            <h1>hi</h1>
        </form>
    );
}
export default todoCreate;


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