import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Modify the state type and arg types to match your needs
interface userState {
  userId: number | null;
  userName: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  isOpenNav: boolean;
}

const initialState: userState = {
  userId: null,
  userName: "",
  userFirstName: "",
  userLastName: "",
  userPassword: "",
  isOpenNav: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    UserInfoRedux: (
      state: userState,
      action: PayloadAction<Partial<userState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutUserRedux: () => {
      return initialState;
    },
  },
});

export const { UserInfoRedux, logoutUserRedux } = userSlice.actions;

export default userSlice.reducer;
