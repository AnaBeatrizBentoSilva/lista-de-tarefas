// src/services/TodoService.js

const baseUrl = 'http://localhost:3002/tasks'; // URL do json-server

const showMessage = (msg, isError = false) => {
  // Exibe mensagens no console por simplicidade
  console.log(`${isError ? 'Error: ' : 'Success: '}${msg}`);
};

const errorHandler = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    showMessage(errorText, true);
    throw new Error(errorText);
  }
  return response;
};

const create = async (todo) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    await errorHandler(response);
    return await response.json();
  } catch (error) {
    showMessage('Ocorreu um erro!', true);
    throw error;
  }
};

const read = async () => {
  try {
    const response = await fetch(baseUrl);
    await errorHandler(response);
    return await response.json();
  } catch (error) {
    showMessage('Ocorreu um erro!', true);
    throw error;
  }
};

const readById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    await errorHandler(response);
    return await response.json();
  } catch (error) {
    showMessage('Ocorreu um erro!', true);
    throw error;
  }
};

const update = async (todo) => {
  try {
    const response = await fetch(`${baseUrl}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    await errorHandler(response);
    return await response.json();
  } catch (error) {
    showMessage('Ocorreu um erro!', true);
    throw error;
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    await errorHandler(response);
    return await response.json();
  } catch (error) {
    showMessage('Ocorreu um erro!', true);
    throw error;
  }
};

export default {
  create,
  read,
  readById,
  update,
  deleteTodo,
};
