import { ref, computed } from "vue";
import { defineStore } from "pinia";



  export const count = ref(0);
  count.value = 3
  export function increment() {
    count.value++;
    console.log("Count new value : "+ count.value);
    
  }
  export function decrement(){
    count.value--;
    console.log("Count new value : "+ count.value);

  } 
export default { count, increment, decrement };

