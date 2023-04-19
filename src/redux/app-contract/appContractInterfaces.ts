export interface APP_CONTRACT_STATE {
    mainContract: string;
    userToken: string;
    walletIsConnected: Boolean;
    accountWalletAddress: string;
}

export const defaultAppContractState: APP_CONTRACT_STATE = {
    mainContract: '',
    userToken: '',
    walletIsConnected: false,
    accountWalletAddress:'',
}