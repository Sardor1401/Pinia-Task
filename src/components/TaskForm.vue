<script setup>
import { useTaskStore } from '@/store/TaskStore';
import { ref } from 'vue';

const taskStore = useTaskStore()

const newTask = ref('')

const handleSubmit=()=>{
   if(newTask.value.trim()){
    taskStore.addTask({
        title:newTask.value,
        isFav:false,
        id:Math.floor(Math.random()*10000)
    })
    
   }
   newTask.value = ''
}

</script>


<template>
  <form @submit.prevent="handleSubmit">
    <input  class="p-2 rounded-md"
    type="text"
    placeholder="I need to....."
    v-model="newTask"
    required
    >
    <button class="px-5 py-2 rounded-md ml-2 bg-yellow-300">Add</button>
  </form>
</template>

