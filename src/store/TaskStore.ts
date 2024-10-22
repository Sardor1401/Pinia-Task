import {defineStore} from 'pinia'
import { computed, ref } from 'vue';



export interface Task {
    id: string;
    title: string;
    isFav: boolean
}

export const useTaskStore = defineStore('taskStore', () => {
   let tasks = ref<Task[]>([])
   let loading:boolean = false
   const favs = computed<Task[]>(() => {
    return tasks.value.filter(task => task.isFav)
   })

    const favCount = computed<number>(()=>{
        return tasks.value.reduce((p,c)=>{
            return c.isFav ? p + 1 :p
        }, 0)
    })
    

    const totalCount = computed<number>(()=>{
        return tasks.value.length
    })

    function reset() {
        tasks.value = []
    }

    async function getTasks(){
        loading = true
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json()
        tasks.value = data
        loading = false
    }

    async function addTask(task:Task){
        tasks.value.push(task)

        const res = await fetch('http://localhost:3000/tasks',{
            method:'POST',
            body:JSON.stringify(task),
            headers:{'Content-Type': 'application/json'}
        })

        if(!res.ok){
            console.log(res.status);
             
        }
    }

    async function deleteTask(id:string){
        tasks.value = tasks.value.filter(task => task.id !== id)
        const res = await fetch('http://localhost:3000/tasks/'+id,{
            method:'DELETE',
        })

        if(res.ok){
            console.log(res.status);
            
        }
    }

    async function toggleFav(id:string){
        const task = tasks.value.find(t=>t.id === id)
        task.isFav = !task.isFav


        const res = await fetch('http://localhost:3000/tasks/'+id,{
            method:'PATCH',
            body:JSON.stringify({isFav:task.isFav}),

            headers:{'Content-Type': 'application/json'}
        })

        if(res.ok){
            console.log(res.status);
            
        }
    }
   
   
    return {
        tasks,
        favs,
        favCount,
        totalCount,
        loading,
        addTask,
        deleteTask,
        toggleFav,
        getTasks,
        reset,
    }
})


