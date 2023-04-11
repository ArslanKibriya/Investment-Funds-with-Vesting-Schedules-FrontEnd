import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storageSession from "redux-persist/lib/storage/session";
import localStorage from "redux-persist/es/storage";
import { WalletConnector, WalletApplicationWrapper, WalletApproverWrapper, WalletSwap } from "foundry";
import { applicationConfigSlice } from "./application-config/applicationConfigSlice";
import { appContractSlice } from "./app-contract/appContractSlice";
import { walletConnectorSlice } from "foundry/dist/container-components/wallet-connector/redux/walletConnectorSlice";

const walletConnectorPersistConfig = {
  key: "walletConnector",
  storage: storageSession,
  blacklist: ["error", "isConnecting", "networkClient", "isWeb3Initialized"],
};

const walletApplicationWrapperPersistConfig = {
  key: "walletApplicationWrapper",
  storage: localStorage,
  whitelist: ["tokenList"],
  timeout: 172800,
};
const appContractPersistConfig = {
  key: "mainAppContract",
  storage: localStorage,
};

const rootReducer = combineReducers({
  walletConnector: persistReducer(
    walletConnectorPersistConfig,
    WalletConnector.walletConnectorSlice.reducer
  ),
  applicationConfig: applicationConfigSlice.reducer,

  walletApplicationWrapper: persistReducer(
    walletApplicationWrapperPersistConfig,
    WalletApplicationWrapper.applicationWrapperSlice.reducer
  ),
  walletApprovalWrapper: WalletApproverWrapper.walletApproverWrapperSlice.reducer,
  walletSwapWrapper: WalletSwap.walletSwapperSlice.reducer,
  mainAppContract: persistReducer(appContractPersistConfig, appContractSlice.reducer),
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
