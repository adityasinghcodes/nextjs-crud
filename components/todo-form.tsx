"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { todoSchema, type TodoSchema } from "@/lib/zod";

interface TodoFormProps {
    defaultValues: TodoSchema;
    onSubmit: (data: TodoSchema) => Promise<void>;
    submitButtonText: string;
    isSubmitting: boolean;
}

export default function TodoForm({
    defaultValues,
    onSubmit,
    submitButtonText,
    isSubmitting,
}: TodoFormProps) {
    const form = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isCompleted"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Mark as completed</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button
                    disabled={isSubmitting}
                    className="w-full relative"
                    type="submit"
                >
                    {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/50 rounded-md">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    {submitButtonText}
                </Button>
            </form>
        </Form>
    );
}
