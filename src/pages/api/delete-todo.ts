import { db, eq, Todo } from "astro:db";

export const prerender = false;

interface DeleteTodoBody {
  id: number;
}

export async function POST({
  request,
}: {
  request: Request;
}): Promise<Response> {
  try {
    const body: DeleteTodoBody = await request.json();

    const { id } = body;

    if (typeof id !== "number") {
      return new Response(
        JSON.stringify({ error: "Invalid or missing 'id' in the request body." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await db.delete(Todo).where(eq(Todo.id, id));

    return new Response(
      JSON.stringify({
        result,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /delete-todo:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to delete the todo.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
