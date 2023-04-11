import { createSlice } from "@reduxjs/toolkit";
import { APP_CONTRACT_STATE, defaultAppContractState } from "./appContractInterfaces";

const initialApplicationState: APP_CONTRACT_STATE = {
  ...defaultAppContractState,
};

export const appContractSlice = createSlice({
  name: "appContract",
  initialState: initialApplicationState,
  reducers: {
    contractAddressOfApp: (state, action) => {
      state.mainContract = action.payload.contract
    },
    userAuthToken: (state, action) => {
      state.userToken = action.payload.userToken
    },


  },
});
