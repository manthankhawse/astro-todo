import { defineTable, defineDb, column } from 'astro:db';

const Todo = defineTable({
  columns: {
    id: column.number({primaryKey:true}),
    todo: column.text(),
    desc: column.text(),
  }
});

export default defineDb({
  tables: { Todo },
})