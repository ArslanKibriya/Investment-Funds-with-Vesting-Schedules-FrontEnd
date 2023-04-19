import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { appContractSlice } from "./appContractSlice";
const { actions } = appContractSlice;

export const contractAddressOfApp = (contract: string) => (dispatch: any) => {
  dispatch(actions.contractAddressOfApp({ contract }));
};
export const userAuthToken = (userToken: string) => (dispatch: any) => {
  dispatch(actions.userAuthToken({ userToken }));
};
export const setwalletStatus =
  (status: boolean) => (dispatch: Dispatch) => {
    dispatch(actions.setWalletIsConnected({ walletIsConnected: status }));
  };
  export const setWalletAddress =
  (address: any) => (dispatch: Dispatch) => {
    dispatch(actions.setAccountWalletAddress({ accountWalletAddress: address }));
    };
  