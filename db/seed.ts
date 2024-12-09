import { db, Todo } from 'astro:db';

export default async function() {
  await db.insert(Todo).values([
    { todo: "buy food", desc:"buy groceries"}
  ]);
}
