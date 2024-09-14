import { TodoItemTypes } from "../vite-env";

export const saveTodo = (todo: TodoItemTypes[]): void => {

    localStorage.setItem("todos", JSON.stringify(todo))

}

export const getTodo = (): TodoItemTypes[] => {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : []
}