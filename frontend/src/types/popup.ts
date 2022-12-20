import { ref } from "vue";

const popupTrigger = ref({
  buttonTrigger: false,
});

const popupTriggerRegister = ref({
  buttonTriggerRegister: false,
});

console.log("test popupTrigger de base " + popupTrigger.value.buttonTrigger);

const handlePopupLogin = () => {
  popupTrigger.value.buttonTrigger = !popupTrigger.value.buttonTrigger;
  console.log("test et buttonTrigger " + popupTrigger.value.buttonTrigger);
};

const handlePopupRegister = () => {
  popupTriggerRegister.value.buttonTriggerRegister =
    !popupTriggerRegister.value.buttonTriggerRegister;
  console.log(
    "test et buttonTriggerRegister " +
      popupTriggerRegister.value.buttonTriggerRegister
  );
};

export default {
  props: ["handlePopupLogin", "handlePopupRegister"],
};
export {
  popupTrigger,
  popupTriggerRegister,
  handlePopupLogin,
  handlePopupRegister,
};
