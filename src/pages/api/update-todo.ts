import { db, eq, Todo } from "astro:db";

export const prerender = false;

interface UpdateTodoBody {
  todo: string;
  desc: string;
  id: number;
}

export async function POST({
  request,
}: {
  request: Request;
}): Promise<Response> {
  try {
    const body: UpdateTodoBody = await request.json();

    const { todo, desc, id } = body;

    const result = await db
      .update(Todo)
      .set({ todo, desc })
      .where(eq(Todo.id, id));

    return new Response(
      JSON.stringify({
        result,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /update-todo:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update the todo.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
