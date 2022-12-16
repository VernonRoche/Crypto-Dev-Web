import { watchEffect, ref } from "vue";

const popupTrigger = ref({
  buttonTrigger: false,
});

console.log("test popupTrigger de base " + popupTrigger.value.buttonTrigger);

const handlePopupLogin = () => {
  popupTrigger.value.buttonTrigger = !popupTrigger.value.buttonTrigger;
  console.log("test et buttonTrigger " + popupTrigger.value.buttonTrigger);
};

export default {
  props: ["handlePopupLogin"],
};
export { popupTrigger, handlePopupLogin };
