import { ref, computed } from "vue";
import { defineStore } from "pinia";
/**
*  Count the number of Favorite for the current User
*/
export const count = ref(0);
count.value = 3;
export function increment() {
  count.value++;
}

/**
 * Count the number of Favorite for the current User and increment the counter with google
 */
export function incrementgoogle() {
  countsignGoogle.value++;
}

/**
 * Count the number of Favorite for the current User and decrement the counter with google
 */
export function decrementGoogle() {
  countsignGoogle.value--;
}

/**
 * Count the number of Favorite for the current User and decrement
 */
export function decrement() {
  count.value--;
}

/**
 * Count the number of Favorite for the current User and increment the counter with google
 */
export const countsignGoogle = ref(0);
countsignGoogle.value = 0;

/**
 * check if the user is connected with google
 */
export const isconnectedwithgoogle = ref(false);

export default { count, increment, decrement };
