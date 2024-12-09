<template>
  <div class="flex items-center w-3/4 mx-auto justify-center gap-12 px-2 py-4 border-2 border-gray-400 my-6 rounded-xl shadow-md">
    <input type="checkbox" class="h-5 w-5 border-2" />
    <div class="flex-col w-1/2 overflow-auto">
      <p class="text-2xl font-semibold">{{ title }}</p>
      <p class="text-xl font-light">{{ desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todos",
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
};
</script>
