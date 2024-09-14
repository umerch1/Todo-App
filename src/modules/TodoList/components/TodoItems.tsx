import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { TodoItemTypes } from "../../../vite-env";
import { childrenTypes } from "../Types/TodoTypes";

type PropsType = {
  todo: TodoItemTypes;
  deleteTodo: (id: TodoItemTypes["id"]) => void;
  completeTodo: childrenTypes["completeTodo"];
  editTodo: (id: TodoItemTypes["id"], completed: TodoItemTypes["todo"]) => void;
};
const TodoItems = ({ todo, deleteTodo, completeTodo, editTodo }: PropsType) => {
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<TodoItemTypes["todo"]>(todo.todo);
  return (
    <Paper
      key={todo.userId}
      variant="elevation"
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
        {activeEdit ? (
          <TextField
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && editTitle !== "") {
                editTodo(todo.id, editTitle);
                setActiveEdit(false);
              }
            }}
          />
        ) : (
          <Typography
            marginRight={"auto"}
            sx={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            {todo.todo}
          </Typography>
        )}
        <Checkbox
          checked={todo.completed}
          onChange={() => completeTodo(todo.id, todo.completed)}
        />
        <Button onClick={() => deleteTodo(todo.id)}>
          <Delete />
        </Button>
        <Button onClick={() => setActiveEdit(!activeEdit)}>
          <Edit />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItems;
