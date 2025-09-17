import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null); // will hold full user object
  const phoneNumber = ref("");
   // separate phone number if needed

    const accountNumber=ref("");
    const amount=ref("");

  function setUser(newUser) {
    user.value = newUser;
  }

  function setPhoneNumber(number) {
    phoneNumber.value = number;
  }

  function setAccountNumber(number){
    accountNumber.value=number
  }

  function setAmount(number){
    amount.value=number
  }

  return { user, phoneNumber,accountNumber,amount, setUser, setPhoneNumber,setAccountNumber,setAmount };
});
