import CreateTodo from "@/components/create-todo";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className="max-w-7xl flex flex-col gap-10 mx-auto p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todos</h1>
        <CreateTodo />
      </div>
      <TodoList />
    </div>
  );
}
