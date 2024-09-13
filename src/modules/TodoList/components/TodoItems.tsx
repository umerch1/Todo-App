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

type PropsType = {
  todo: TodoItemTypes;
  deleteTodo: (id: TodoItemTypes["id"]) => void;
  completeTodo: (id: TodoItemTypes["id"]) => void;
  editTodo: (
    id: TodoItemTypes["id"],
    completed: TodoItemTypes["title"]
  ) => void;
};
const TodoItems = ({ todo, deleteTodo, completeTodo, editTodo }: PropsType) => {
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<TodoItemTypes["title"]>(
    todo.title
  );
  return (
    <Paper
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
            {todo.title}
          </Typography>
        )}
        <Checkbox
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
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
