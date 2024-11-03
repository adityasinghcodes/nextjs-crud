import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo } from "@prisma/client";

import DeleteTodo from "@/components/delete-todo";
import DynamicUpdateTodo from "@/components/update-todo-wrapper";

export default async function TodoList() {
  const response = await fetch("http://localhost:3000/api/todos");
  if (!response.ok) {
    return <div>Failed to load todos.</div>;
  }

  const todos = await response.json();
  const todoList = todos || [];

  return (
    <div className="space-y-4">
      {todoList.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">All done for today!</p>
          </CardContent>
        </Card>
      ) : (
        todoList.map((todo: Todo) => (
          <Card className="group relative" key={todo.id}>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DynamicUpdateTodo todo={todo} />
              <DeleteTodo id={todo.id} />
            </div>
            <CardHeader>
              <CardTitle>
                <span className={todo.isCompleted ? "line-through" : ""}>
                  {todo.title}
                </span>
              </CardTitle>
            </CardHeader>
            {todo.description && (
              <CardContent>
                <p>{todo.description}</p>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
