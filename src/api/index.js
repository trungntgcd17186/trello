import axios from "axios";

const Url = "https://trello-tenomad.herokuapp.com";

const getTodos = async () => {
  const response = await axios.get(`${Url}/todos`);
  return response;
};

const getUsers = async () => {
  const response = await axios.get(`${Url}/users`);
  return response;
};

const getTodoFollowId = async (id) => {
  const response = await axios.get(`${Url}/todos/${id}`);
  return response;
};

const editTodo = async (id, data) => {
  const response = await axios.put(`${Url}/todos/${id}`, data);
  return response;
};

const onDropEditTodo = async (id, saveDatas, dataComplete) => {
  const response = await axios.put(`${Url}/todos/${id}`, {
    ...saveDatas,
    completed: !dataComplete,
  });
  return response;
};

export { getTodos, getUsers, getTodoFollowId, editTodo, onDropEditTodo };
