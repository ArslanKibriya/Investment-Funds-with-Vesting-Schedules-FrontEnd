import { createSlice } from "@reduxjs/toolkit";
import {
  defaultApplicationConfigState,
  APPLICATION_CONFIG_STATE,
} from "../../interfaces/applicationConfigInterfaces";

const initialApplicationState: APPLICATION_CONFIG_STATE = {
  ...defaultApplicationConfigState,
};

export const applicationConfigSlice = createSlice({
  name: "applicationConfig",
  initialState: initialApplicationState,
  reducers: {
    //error occured while loading Application Config
    // catchLoadApplicationConfigError: (state, action) => {
    //   state = {
    //     ...defaultWalletState,
    //     error: `${action.type}: ${action.payload.error}`,
    //   };
    // },
    loadApplicationConfig: (state) => {
      // state = { ...defaultApplicationConfigState, isConfigLoading: true };
      state.isConfigLoading = true;
      state.isConfigLoaded = false;
      state.applicationLocale = undefined;
    },
    applicationConfigLoaded: (state, action) => {
      state.isConfigLoading = false;
      state.isConfigLoaded = true;
      state.applicationLocale = action.payload.applicationLocale;
    },
  },
});
