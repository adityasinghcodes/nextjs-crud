import prisma from '@/lib/prisma';
import { todoSchema } from '@/lib/zod';
import { Todo } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = todoSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
        }

        const todoData = result.data;

        const newTodo = await prisma.todo.create({
            data: {
                title: todoData.title,
                description: todoData.description || '',
                isCompleted: todoData.isCompleted,
            },
        });

        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        console.error('Error adding todo:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Todo ID is required' }, { status: 400 });
        }

        const deletedTodo = await prisma.todo.delete({
            where: { id },
        });

        if (!deletedTodo) {
            return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting todo:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...rest } = body;
        const result = todoSchema.safeParse(rest);

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
        }

        const todoData = result.data as Todo;

        if (!id) {
            return NextResponse.json({ message: 'Todo ID is required' }, { status: 400 });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                title: todoData.title,
                description: todoData.description,
                isCompleted: todoData.isCompleted,
            },
        });

        if (!updatedTodo) {
            return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        console.error('Error updating todo:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}