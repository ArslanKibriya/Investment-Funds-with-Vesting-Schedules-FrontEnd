export interface APP_CONTRACT_STATE {
    mainContract: string;
    userToken: string;
}

export const defaultAppContractState: APP_CONTRACT_STATE = {
    mainContract: '',
    userToken: ''
}