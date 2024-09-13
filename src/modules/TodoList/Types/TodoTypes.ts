import { ReactNode } from "react"
import { TodoItemTypes } from "../../../vite-env"

export type childrenTypes = {
    todos: TodoItemTypes[]
    title: TodoItemTypes['title']
    setTitle: (title: TodoItemTypes['title']) => void,
    AddTodos: () => void,
    deleteTodo: (id: TodoItemTypes['id']) => void,
    completeTodo: (id: TodoItemTypes['id']) => void,
    editTodo: (id: TodoItemTypes['id'], title: TodoItemTypes['title']) => void,
    data?: any
}

export interface TodoTypes {
    children: (props: childrenTypes) => ReactNode;
}