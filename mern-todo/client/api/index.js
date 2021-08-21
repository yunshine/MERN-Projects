import axios from 'axios';

const api = axios.create({
    baseURL: process.env.PORT || 'http://localhost:3000/api',
    // baseURL: 'https://instant-pot-recipes.herokuapp.com/api' || 'http://localhost:3000/api',
});

export const getAllTodos = () => api.get(`/todos/list`);
export const createTodo = payload => api.post(`/todos/create`, payload);
export const getTodoById = id => api.get(`/todos/${id}`);
export const updateTodoById = (id, payload) => api.put(`/todos/${id}`, payload);
export const deleteTodoById = id => api.delete(`/recipes/${id}`);

// export const registerUser = payload => api.post(`/users/register`, payload);

const apis = {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById
    // registerUser
};

export default apis;