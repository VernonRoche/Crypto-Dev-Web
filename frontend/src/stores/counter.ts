import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const count = ref(0);
count.value = 3;
export function increment() {
  count.value++;
}

export function incrementgoogle() {
  countsignGoogle.value++;
}

export function decrementGoogle() {
  countsignGoogle.value--;
}

export function decrement() {
  count.value--;
}

export const countsignGoogle = ref(0);
countsignGoogle.value = 0;
export const isconnectedwithgoogle = ref(false);

export default { count, increment, decrement };
