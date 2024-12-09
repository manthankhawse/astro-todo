<template>
  <form class="w-1/3 mx-auto my-12 flex flex-col items-center justify-center space-y-6" @submit.prevent="submitForm">
    <div class="w-full">
      <label for="task" class="block text-xl font-semibold text-gray-700 mb-2">Todo:</label>
      <input 
        v-model="newTodo.todo" 
        placeholder="Add new todo" 
        type="text" 
        name="task" 
        class="w-full border-2 border-gray-300 rounded-md shadow-sm px-4 py-2 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="w-full">
      <label for="description" class="block text-xl font-semibold text-gray-700 mb-2">Description:</label>
      <input 
        v-model="newTodo.desc" 
        type="text" 
        name="description" 
        placeholder="Add description" 
        class="w-full border-2 border-gray-300 rounded-md shadow-sm px-4 py-2 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button 
      type="submit" 
      class="w-full bg-blue-500 rounded-lg py-3 text-white text-2xl font-semibold shadow-md hover:bg-blue-600 transition duration-200"
    >
      Add Todo
    </button>
  </form>

  <div class="w-1/2 mx-auto">
    <div 
      v-for="todo in results" 
      :key="todo.id" 
      class="flex items-center gap-2 my-2"
    >
      <Todos 
        :title="todo.todo" 
        :desc="todo.desc" 
      />
      <button 
        @click="editTodo(todo)" 
        class="border-2 border-black px-2 py-1 rounded-md text-xl font-semibold"
      >
        Edit
      </button>
      <button 
        @click="deleteTodo(todo.id)" 
        class="border-2 px-2 py-1 rounded-md text-xl font-semibold bg-red-400 text-white"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Todos from "./Todos.vue";

interface Todo {
  id: number;
  todo: string;
  desc: string;
}

export default defineComponent({
  name: "TodoArea",
  components: {
    Todos,
  },
  data() {
    return {
      results: [] as Todo[], 
      newTodo: {
        id: -1,
        todo: "",
        desc: "",
      } as Todo, 
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get<{ result: Todo[] }>("/api/get-todo");
        this.results = response.data.result;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },

    async submitForm() {
      if (this.newTodo.todo.trim() && this.newTodo.desc.trim()) {
        if (this.newTodo.id !== -1) {
          await this.updateTodo();
        } else {
          await this.addTodo();
        }
        this.resetForm();
      } else {
        alert("Please fill in both fields.");
      }
    },

    async addTodo() {
      try {
        const response = await axios.post("/api/add-todo", {
          todo: this.newTodo.todo,
          desc: this.newTodo.desc,
        });
        this.results.push(response.data.result[0]); // Add new todo to results
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },

    async updateTodo() {
      try {
        await axios.post("/api/update-todo", this.newTodo);
        const index = this.results.findIndex((todo) => todo.id === this.newTodo.id);
        if (index !== -1) {
          this.results[index] = { ...this.newTodo }; // Update in results array
        }
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },

    async deleteTodo(id: number) {
      try {
        await axios.post("/api/delete-todo", { id });
        this.results = this.results.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    },

    editTodo(todo: Todo) {
      this.newTodo = { ...todo }; 
    },

    resetForm() {
      this.newTodo = {
        id: -1,
        todo: "",
        desc: "",
      };
    },
  },
});
</script>
