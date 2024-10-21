<script setup lang="ts">
import { Task, useTaskStore } from '@/store/TaskStore';
import {TrashIcon,HeartIcon} from '@heroicons/vue/24/outline'


defineProps<{
  task: Task
}>()

const taskStore = useTaskStore()
 
</script>


<template>
  <div class="flex justify-center">
    <div class="w-[600px] h-[80px] text-black bg-slate-50 shadow-sm shadow-slate-300 mt-2 rounded-md  flex justify-between items-center">
    <h3 class="font-bold text-xl ml-4">{{ task.title }}</h3>
    <div class="flex mr-4">
      <TrashIcon @click="taskStore.deleteTask(task.id)" class="size-5 cursor-pointer fill-gray-400"/>
      <HeartIcon @click="taskStore.toggleFav(task.id)"
        class="size-5 text-right cursor-pointer" 
        :class="[
          task.isFav ? 'fill-red-500' : 'fill-gray-400'
        ]" 
      />
    </div>
  </div>
  </div>
</template>

