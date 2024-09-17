import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoItemTypes } from '../vite-env';

export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/"
    }),
    tagTypes: ['Todos'],
    endpoints: (bulder) => ({
        getTodos: bulder.query<Array<TodoItemTypes>, any>({
            query: () => '/todos',
            providesTags: ['Todos']
        }),
        addTodo: bulder.mutation<TodoItemTypes[], TodoItemTypes>({
            query: (addTodoItem) => ({
                url: `/todos`,
                method: 'POST',
                body: addTodoItem,
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: bulder.mutation<{ success: boolean, id: number }, string>({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }
            ),
            invalidatesTags: ['Todos']
        }),

        editTodo: bulder.mutation<TodoItemTypes[], TodoItemTypes>({
            query: (props) => ({
                url: `todos/${props.id}`,
                method: 'PUT',
                body: props,
            }),
            invalidatesTags: ['Todos']
        }),
        markTodo: bulder.mutation<TodoItemTypes[], TodoItemTypes>({
            query: (todo) => ({
                url: `todos/${todo.id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todos']
        }),



    }),
});
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation, useMarkTodoMutation } = myApi;