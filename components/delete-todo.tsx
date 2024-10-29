"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { mutate } from "swr";

export default function DeleteTodo({ id }: { id: string }) {
    const handleDelete = async () => {
        const response = await fetch(`/api/todos?id=${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Todo deleted successfully");
            mutate("/api/todos");
        } else {
            console.error("Failed to delete todo");
        }
    };

    return (
        <Button
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            className="mr-1 text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200"
        >
            <TrashIcon className="h-4 w-4" />
        </Button>
    );
}
