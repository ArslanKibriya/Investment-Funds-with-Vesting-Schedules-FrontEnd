import { appContractSlice } from "./appContractSlice";
const { actions } = appContractSlice;

export const contractAddressOfApp = (contract: string) => (dispatch: any) => {
  dispatch(actions.contractAddressOfApp({ contract }));
};
export const userAuthToken = (userToken: string) => (dispatch: any) => {
  dispatch(actions.userAuthToken({ userToken }));
};
