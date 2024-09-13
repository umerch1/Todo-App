import { useEffect, useState } from "react";
import { getTodo, saveTodo } from "../../../../utility/features";
import { TodoItemTypes } from "../../../../vite-env";
import { TodoTypes } from "../../Types/TodoTypes";
import { useDeleteTodoMutation } from "../../../../store/api";

export const TodoListServiceComponent = ({ children }: TodoTypes) => {
  const [todos, setTodos] = useState<TodoItemTypes[]>(getTodo());
  const [title, setTitle] = useState<TodoItemTypes["title"]>("");

  // Add Todo
  const AddTodos = () => {
    let newTodo: TodoItemTypes = {
      title,
      completed: false,
      id: Math.random() * 1000,
      userId: 1,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };
  const [deleteFun, { data }] = useDeleteTodoMutation();
  console.log(data);
  // Delete Todo
  const deleteTodo = (id: TodoItemTypes["id"]): void => {
    let newTodo = todos.filter((i) => i.id !== id);
    deleteFun(id);
    setTodos(newTodo);
  };
  // isComplete Todo Fun
  const completeTodo = (id: TodoItemTypes["id"]): void => {
    let newTodo = todos.map((i) => {
      if (i.id == id) {
        i.completed = !i.completed;
      }
      return i;
    });
    setTodos(newTodo);
    console.log(newTodo);
  };
  //   Edit Todo

  const editTodo = (
    id: TodoItemTypes["id"],
    title: TodoItemTypes["title"]
  ): void => {
    let editTodo = todos.map((i) => {
      if (i.id === id) {
        i.title = title;
      }
      return i;
    });
    setTodos(editTodo);
    console.log(todos);
  };
  useEffect(() => {
    saveTodo(todos);
  }, [todos]);

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
