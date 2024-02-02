import { NextResponse } from "next/server";

const DATA_SOURE_URL = "https://jsonplaceholder.typicode.com/todos"

export async function GET() {
    const res = await fetch(DATA_SOURE_URL)
    const todos: Todo[] = await res.json()
    return NextResponse.json(todos)
}