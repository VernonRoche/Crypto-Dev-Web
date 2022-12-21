import { ref } from "vue";

const popupTriggerLogin = ref({
  buttonTrigger: false,
});

const popupTriggerAccount = ref({
  buttonTriggerAccount: false,
});

const popupTriggerRegister = ref({
  buttonTriggerRegister: false,
});

const handlePopupLogin = () => {
  popupTriggerLogin.value.buttonTrigger =
    !popupTriggerLogin.value.buttonTrigger;
  console.log("test et buttonTrigger " + popupTriggerLogin.value.buttonTrigger);
};

const handlePopupAccount = () => {
  popupTriggerAccount.value.buttonTriggerAccount =
    !popupTriggerAccount.value.buttonTriggerAccount;
  console.log(
    "test et buttonTriggerAccount " +
      popupTriggerAccount.value.buttonTriggerAccount
  );
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
  props: ["handlePopupLogin", "handlePopupRegister", "handlePopupAccount"],
};
export {
  popupTriggerLogin,
  popupTriggerAccount,
  popupTriggerRegister,
  handlePopupLogin,
  handlePopupRegister,
  handlePopupAccount,
};
