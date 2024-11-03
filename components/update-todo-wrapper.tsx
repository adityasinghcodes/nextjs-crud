"use client";

import { Todo } from "@prisma/client";
import dynamic from "next/dynamic";

const DynamicUpdateTodo = dynamic(() => import("@/components/update-todo"), {
  ssr: false,
});

export default function UpdateTodoWrapper({ todo }: { todo: Todo }) {
  return <DynamicUpdateTodo todo={todo} />;
}
