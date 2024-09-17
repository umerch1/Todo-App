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
  editTodo: childrenTypes["editTodo"];
};
const TodoItems = ({ todo, deleteTodo, completeTodo, editTodo }: PropsType) => {
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<TodoItemTypes["title"]>(
    todo.title
  );
  const [completed, setCompleted] = useState<TodoItemTypes["completed"]>(true);
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
                editTodo(todo, editTitle);
                setActiveEdit(false);
              }
            }}
          />
        ) : (
          <Typography
            marginRight={"auto"}
            sx={{ textDecoration: completed ? "line-through" : "" }}
          >
            {todo.title}
          </Typography>
        )}
        <Checkbox
          checked={completed}
          onChange={(pre) => {
            setCompleted(pre.target.checked);
            completeTodo(completed, todo);
          }}
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
