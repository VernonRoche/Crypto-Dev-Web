import { reactive } from "vue";  

export const Login = reactive({
    isLog: false,
    changeStateLogin(){        
        this.isLog = !this.isLog;
    } 
})