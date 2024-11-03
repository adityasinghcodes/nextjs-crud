"use client";

import dynamic from "next/dynamic";

const DynamicCreateTodo = dynamic(() => import("@/components/create-todo"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function CreateTodoWrapper() {
  return <DynamicCreateTodo />;
}
