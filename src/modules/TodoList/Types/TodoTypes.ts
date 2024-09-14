import { ReactNode } from "react"
import { TodoItemTypes } from "../../../vite-env"

export type childrenTypes = {
    todos: TodoItemTypes[]
    title: TodoItemTypes['todo']
    setTitle: (title: TodoItemTypes['todo']) => void,
    AddTodos: () => void,
    deleteTodo: (id: TodoItemTypes['id']) => void,
    completeTodo: (id: TodoItemTypes['id'], completed: TodoItemTypes['completed']) => void,
    editTodo: (id: TodoItemTypes['id'], title: TodoItemTypes['todo']) => void,
    data?: any
}

export interface TodoTypes {
    children: (props: childrenTypes) => ReactNode;
}