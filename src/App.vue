<script setup>
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import { useTaskStore } from './store/TaskStore';
import { ref } from 'vue';


const taskStore = useTaskStore()
taskStore.getTasks()
const filter = ref('all')

</script>

<template>
    <main class="bg-gray-100 min-h-screen">
      <header class="flex items-center justify-center gap-1  bg-gray-200">
        <img class="w-[60px]" src="./assets/image.png" alt="#">
        <h1 class=" font-bold text-4xl">Pinia Tasks</h1>
      </header>
      

      <div class="bg-gray-200 p-3 flex justify-center items-center">
        <TaskForm />
      </div>


      <nav class="flex justify-end mr-[28%] gap-1">
        <button class="p-2 bg-teal-500 mt-1 rounded-md" @click="filter='all'">All Tasks</button>
        <button class="p-2 bg-red-500 mt-1 rounded-md"  @click="filter='favs'">Fav Tasks</button>
      </nav>



      <div class="bg-red-400" v-if="taskStore.loading">Loading tasks.....</div>


      <div v-if="filter==='all'">
        <p class="ml-[28%] mt-2 text-2xl">You have {{ taskStore.totalCount }} tasks left to do</p>
        <div v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>
      <div v-if="filter === 'favs'">
        <p  class="ml-[28%] mt-2 text-2xl">You have {{ taskStore.favCount }} favs left to do</p>
        <div v-for="task in taskStore.favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>


      <button class="p-2 bg-gray-300 rounded-md" @click="taskStore.reset()">reset store</button>


    </main >
</template>


