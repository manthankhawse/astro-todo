import { db, Todo } from "astro:db";

export const prerender = false;

interface AddTodoBody {
  todo: string;
  desc: string;
}

export async function POST({
  request,
}: {
  request: Request;
}): Promise<Response> {
  try {
    const body: AddTodoBody = await request.json();

    const { todo, desc } = body;
    const result = await db.insert(Todo).values({ todo, desc });

    return new Response(
      JSON.stringify({
        result,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /add-todo:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to add the todo.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
