import { useState } from "react";
import { TodoItemTypes } from "../../../../vite-env";
import { TodoTypes } from "../../Types/TodoTypes";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
  useMarkTodoMutation,
} from "../../../../store/api";

export const TodoListServiceComponent = ({ children }: TodoTypes) => {
  // RTK querry
  const { data: todos = [] } = useGetTodosQuery({});
  const [addItem] = useAddTodoMutation();
  const [deleteItem] = useDeleteTodoMutation();
  const [updateTodo] = useEditTodoMutation();
  const [markTodo] = useMarkTodoMutation();
  const [title, setTitle] = useState<TodoItemTypes["title"]>("");

  // Add Todos
  const AddTodos = () => {
    let newTodo: TodoItemTypes = {
      id: String(Math.floor(Math.random() * 1000)),
      title,
      completed: false,
      userId: 1,
    };
    addItem(newTodo);
    setTitle("");
  };

  // Delete Todo
  const deleteTodo = (id: TodoItemTypes["id"]) => {
    deleteItem(id);
  };

  // isComplete Todo Fun
  const completeTodo = (completed: boolean, todo: TodoItemTypes) => {
    let newTodo = { ...todo };
    newTodo.completed = completed;
    markTodo(newTodo);
  };

  //   Edit Todo
  const editTodo = (
    todo: TodoItemTypes,
    title: TodoItemTypes["title"]
  ): void => {
    let newTodo = { ...todo };
    newTodo.title = title;
    updateTodo(newTodo);
  };

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
