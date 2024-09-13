import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoItemTypes } from '../vite-env';

export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com"
    }),
    tagTypes: ['Todos'],
    endpoints: (bulder) => ({
        getTodos: bulder.query<Array<TodoItemTypes>, any>({
            query: () => 'todos?_limit=5',
            providesTags: ['Todos']
        }),
        deleteTodo: bulder.mutation<{ success: boolean, id: number }, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }

            }),
            invalidatesTags: ['Todos']
        }),

        editTodo: bulder.mutation<any, any>({
            query: (props) => ({
                url: `todos/${props.id}`,
                method: 'PUT',
                body: props,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
        }),
        markTodo: bulder.mutation<any, any>({
            query: (props) => ({
                url: `todos/${props.id}`,
                method: 'PUT',
                body: props,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),



    }),
});
export const { useGetTodosQuery, useDeleteTodoMutation, useEditTodoMutation, useMarkTodoMutation } = myApi;