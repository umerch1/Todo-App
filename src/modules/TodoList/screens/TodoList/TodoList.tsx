import { TodoListServiceComponent } from "./index.service";
import TodoListComponent from ".";

export const TodoList = (props: any) => {
  return (
    <TodoListServiceComponent {...props}>
      {(props: any) => <TodoListComponent {...props} />}
    </TodoListServiceComponent>
  );
};
