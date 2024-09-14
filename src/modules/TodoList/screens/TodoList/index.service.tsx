import { useEffect, useState } from "react";
import { TodoItemTypes } from "../../../../vite-env";
import { TodoTypes } from "../../Types/TodoTypes";

export const TodoListServiceComponent = ({ children }: TodoTypes) => {
  const [todos, setTodos] = useState<TodoItemTypes[]>([]);
  const [title, setTitle] = useState<TodoItemTypes["todo"]>("");

  // Add Todo
  const AddTodos = async () => {
    let newTodo: TodoItemTypes = {
      todo: title,
      completed: false,
      id: Math.floor(Math.random() * 1000),
      userId: 7,
    };
    await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodos((prev) => [...prev, res]));
    setTitle("");
  };

  // Delete Todo
  const deleteTodo = (id: TodoItemTypes["id"]): void => {
    let newTodo = todos.filter((i) => i.id !== id);
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
    setTodos(newTodo);
  };

  // isComplete Todo Fun
  const completeTodo = (
    id: TodoItemTypes["id"],
    completed: TodoItemTypes["completed"]
  ): void => {
    let newTodo = todos.map((i) => {
      if (i.id == id) {
        i.completed = !i.completed;
      }
      return i;
    });
    /* updating completed status of todo with id 1 */
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
    setTodos(newTodo);
  };
  //   Edit Todo

  const editTodo = (
    id: TodoItemTypes["id"],
    todo: TodoItemTypes["todo"]
  ): void => {
    let editTodo = todos.map((i) => {
      if (i.id === id) {
        i.todo = todo;
      }
      return i;
    });
    /* updating completed status of todo with id 1 */
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo,
      }),
    })
      .then((res) => res.json())
      .then(console.log);

    setTodos(editTodo);
    console.log(todos);
  };

  //   Get All todos
  const getTodos = () => {
    fetch("https://dummyjson.com/todos?limit=3&skip=7")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  };

  useEffect(() => {
    //   saveTodo(todos);
    getTodos();
  }, []);

  return children({
    todos,
    title,
    AddTodos,
    deleteTodo,
    completeTodo,
    editTodo,
    setTitle,
  });
};
