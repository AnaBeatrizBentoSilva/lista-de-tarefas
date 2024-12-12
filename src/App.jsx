// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";
import TodoService from './services/TodoService';

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [activeTab, setActiveTab] = useState("incomplete");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await TodoService.read();
      setToDoList(todos);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async (text, category) => {
    try {
      await TodoService.create({ text, category, isCompleted: false });
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await TodoService.delete(id);
      fetchTodos();
    } catch (error) {
      console.error("Error removing todo", error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = toDoList.find(todo => todo.id === id);
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await TodoService.update(updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error completing todo", error);
    }
  };

  const completedTasks = toDoList.filter(todo => todo.isCompleted);
  const incompleteTasks = toDoList.filter(todo => !todo.isCompleted);

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="tasks">
        <h2
          className={`tab ${activeTab === "incomplete" ? "active" : ""} task-header`} 
          onClick={() => setActiveTab("incomplete")}
        >
          Tarefas
        </h2>
        <h2
          className={`tab ${activeTab === "completed" ? "active" : ""} task-header`}
          onClick={() => setActiveTab("completed")}
        >
          Tarefas concluídas
        </h2>
      </div>

      <div className="todo-list">
        {activeTab === "incomplete" && (
          <div className="task-list">
            {incompleteTasks
              .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) =>
                sort === "Asc"
                  ? a.text.localeCompare(b.text)
                  : b.text.localeCompare(a.text)
              )
              .map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                />
              ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="task-list">
            {completedTasks
              .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) =>
                sort === "Asc"
                  ? a.text.localeCompare(b.text)
                  : b.text.localeCompare(a.text)
              )
              .map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                />
              ))}
          </div>
        )}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;

