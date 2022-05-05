import { useContext } from "react";
import { TodoContext } from "../pages/todos";

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodoContext must be used within a TodoContext Provider."
    );
  }
  return context;
}
