import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItems from "../../components/TodoItems";
import { childrenTypes } from "../../Types/TodoTypes";

const TodoListComponent = ({
  todos,
  title,
  setTitle,
  AddTodos,
  deleteTodo,
  completeTodo,
  editTodo,
}: childrenTypes) => {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo List</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => {
          return (
            <TodoItems
              key={i.id}
              todo={i}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
              editTodo={editTodo}
            />
          );
        })}
      </Stack>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="Add Todo"
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") {
            AddTodos();
          }
        }}
      />
      <Button
        disabled={title === ""}
        onClick={AddTodos}
        sx={{
          margin: "1rem 0",
        }}
        fullWidth
        variant="contained"
      >
        ADD
      </Button>
    </Container>
  );
};

export default TodoListComponent;
