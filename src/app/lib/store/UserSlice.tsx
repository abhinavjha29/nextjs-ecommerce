import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
interface UserState {
  token: string | undefined | null;
  isAdmin?: string | undefined | null;
  isLoggedIn: boolean;
}

// interface User {
//   name: string;
//   email: string;
// }
interface LoginPayload {
  token: string;
  userId: string;
}
const initialState: UserState = {
  // details: null,
  token: null,
  isAdmin: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state: UserState) {
      state.token = Cookies.get("token");
      state.isLoggedIn = true;
    },
    logout(state: UserState) {
      state.token = null;
      state.isAdmin = null;
      state.isLoggedIn = false;
      Cookies.remove("isAdmin");
    },
    setIsAdmin(state: UserState) {
      state.isAdmin = Cookies.get("isAdmin");
    },
  },
});

export const { login, logout, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;
