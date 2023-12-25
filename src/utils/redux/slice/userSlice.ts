import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Modify the state type and arg types to match your needs
interface userState {
  userId: string;
  userName: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  isOpenNav: boolean;
  isSuccessOrder: boolean;
  averageSalesRedux: number;
}

const initialState: userState = {
  userId: "",
  userName: "",
  userFirstName: "",
  userLastName: "",
  userPassword: "",
  isOpenNav: false,
  isSuccessOrder: true,
  averageSalesRedux: 0,
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
