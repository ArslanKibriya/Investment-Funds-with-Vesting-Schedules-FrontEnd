import axios from "axios";
// import web3Helper from "../helper/web3Helpers";

// const checkBaseURL = () => {
//   switch (process.env.REACT_APP_ENVIRONMENT) {
//     case "local":
//       return "http://localhost:8080";
//     case "development":
//       return "https://api-gateway.dev.svcs.ferrumnetwork.io/gateway-backend-dev";
//     case "test":
//       return "https://an54zzyt9h.execute-api.ap-south-1.amazonaws.com/default/test";
//     case "staging":
//       return "https://api-gateway.stage.svcs.ferrumnetwork.io/gateway-backend-staging";
//     case "production":
//       return "https://sij6ulh6gc.execute-api.us-east-2.amazonaws.com/default/prod-gateway-backend";
//     default:
//       return "https://api-gateway.dev.svcs.ferrumnetwork.io/gateway-backend-dev";
//   }
// };

let baseURL = process.env.REACT_APP_SERVER_URL || "";
// "https://api-gateway.dev.svcs.ferrumnetwork.io/gateway-backend-dev";
// "https://api-gateway.stage.svcs.ferrumnetwork.io/gateway-backend-staging";
// "https://an54zzyt9h.execute-api.ap-south-1.amazonaws.com/default/test";
// let baseURL = "http://localhost:8080";

const APPLICATION_CONFIG_URL =
  "https://api.phrase.com/v2/projects/75ab34699a9955ffb124792648ae95a4/translations/?access_token=7babc8751d8627369c0037934c6e2a1214940c6dce775658bb52a52c99f127f7";

const CURRENCY_LISTS = [
  "https://raw.githubusercontent.com/ferrumnet/ferrum-token-list/main/FerrumTokenList.json",
  "https://tokens.coingecko.com/uniswap/all.json",
  "https://tokens.pancakeswap.finance/pancakeswap-extended.json",
  "https://unpkg.com/quickswap-default-token-list@1.0.82/build/quickswap-default.tokenlist.json",
];

// export const signInToServer = async (userAddress: any) => {
//   const res = await axios.post(baseURL, {
//     command: "signInUsingAddress",
//     data: { userAddress },
//     params: [],
//   });
//   const { unsecureSession } = res.data;
//   if (!unsecureSession) {
//     throw new Error("Could not connect to backend");
//   }
//   return unsecureSession;
// };

// export const loadGroupInfo = async (groupId: any) => {
//   let response = await axios.post(baseURL, {
//     command: "getGroupInfo",
//     data: { groupId },
//     params: [],
//   });
//   return response.data;
// };

// export const getHttpProviders = async () => {
//   let response = await axios.post(baseURL, {
//     command: "getHttpProviders",
//     data: {},
//     params: [],
//   });
//   return response.data;
// };

// export const getSourceCurrencies = async (network: any) => {
//   let response = await axios.post(baseURL, {
//     command: "getSourceCurrencies",
//     data: { network },
//     params: [],
//   });
//   return response;
// };

// export const getTokenList = async () => {
//   let response = await axios.post(baseURL, {
//     command: "tokenList",
//     data: {},
//     params: [],
//   });
//   return response.data;
// };

// export const getTokenConfigsForGroup = async (currencies: any) => {
//   let response = await axios.post(baseURL, {
//     command: "tokenConfigForCurrencies",
//     data: { currencies },
//     params: [],
//   });
//   return response.data;
// };

export function loadApplicationConfig() {
  return axios.get(APPLICATION_CONFIG_URL);
}

// export const getCurrentList = () => (dispatch: any) => {
//   const response =
//     CURRENCY_LISTS && CURRENCY_LISTS.length
//       ? CURRENCY_LISTS.map(async (item) => {
//         return await fetch(item)
//           .then((response) => response.json())
//           .then((data) => data);
//       })
//       : null;
//   return response;
// };

// export const getContractAllocation = async (
//   userAddress: string,
//   contractAddress: string,
//   currency: string
// ) => {
//   let response = await axios.post(baseURL, {
//     command: "getContractAllocation",
//     data: { userAddress, contractAddress, currency },
//     params: [],
//   });
//   return response;
// };

// export const setContractAllocation = async (
//   userAddress: string,
//   contractAddress: string,
//   currency: string,
//   authToken: string,
//   amount?: string
// ) => {
//   axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
//   let requests = await axios.post(baseURL, {
//     command: "approveAllocationGetTransaction",
//     data: { userAddress, contractAddress, currency, amount: amount || "1" },
//     params: [],
//   });
//   return requests;
// };

// export const getAvailableLiquidity = async (
//   targetNetwork: string,
//   targetCurrency: string,
//   authToken: string
// ) => {
//   axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
//   let response = await axios.post(baseURL, {
//     command: "getAvaialableLiquidity",
//     data: { userAddress: targetNetwork, currency: targetCurrency },
//     params: [],
//   });
//   const { liquidity } = response.data;
//   // console.log({ liquidity }, "logging reponse from available liquidity");
//   return liquidity;
// };

// export const addLiquidity = async (currency: string, amount: string) => {
//   let response = await axios.post(baseURL, {
//     command: "addLiquidityGetTransaction",
//     data: { currency, amount },
//     params: [],
//   });
//   // const { isApprove, requests } = response.data;
//   // console.log({ isApprove, requests }, "logging reponse from add liquidity");
//   return response;
// };

// export const removeLiquidity = async (currency: string, amount: string) => {
//   let response = await axios.post(baseURL, {
//     command: "removeLiquidityIfPossibleGetTransaction",
//     data: { currency, amount },
//     params: [],
//   });
//   // const { isApprove, requests } = response.data;
//   // console.log({ isApprove, requests }, "logging reponse from remove liquidity");
//   return response;
// };

// export const swapGetTransaction = async (
//   currency: string,
//   amount: string,
//   targetCurrency: string,
//   authToken: string
// ) => {
//   axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
//   let response = await axios.post(baseURL, {
//     command: "swapGetTransaction",
//     data: { currency, amount, targetCurrency },
//     params: [],
//   });
//   // const { isApprove, requests } = response.data;
//   // console.log(
//   //   { isApprove, requests },
//   //   "logging reponse from the swap get transaction"
//   // );
//   return response;
// };

// export const logSwapTransaction = async (txId: string, network: string) => {
//   let response = await axios.post(baseURL, {
//     command: "logSwapTransaction",
//     data: { txId, network },
//     params: [],
//   });

//   // console.log(response.data, "logging swap transaction");
//   return response;
// };

// export const checkTxStatus = async (txId: string, sendNetwork: string) => {
//   let response = await axios.post(baseURL, {
//     command: "GetSwapTransactionStatus",
//     data: { tid: txId, sendNetwork, timestamp: Date.now() },
//     params: [],
//   });

//   // console.log(response.data, "swap transaction status ");
//   return response;
// };

// export const withdraw = async (id: string) => {
//   let response = await axios.post(baseURL, {
//     command: "withdrawSignedGetTransaction",
//     data: { id },
//     params: [],
//   });

//   // console.log(response.data, "with draw Signed Get Transaction payload");
//   return response;
// };
// export const updateWithdrawItemPendingTransactions = async (id: string) => {
//   let response = await axios.post(baseURL, {
//     command: "updateWithdrawItemPendingTransactions",
//     data: { id },
//     params: [],
//   });

//   // console.log(response.data, "with draw transaction payload");
//   return response;
// };

// export const updateWithdrawItemAddTransaction = async (
//   id: string,
//   transactionId: string
// ) => {
//   // axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
//   let response = await axios.post(baseURL, {
//     command: "updateWithdrawItemAddTransaction",
//     data: { id, transactionId },
//     params: [],
//   });
//   return response;
// };
// export const getUserWithdrawItems = async (
//   network: string,
//   authToken?: string
// ) => {
//   axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
//   let response = await axios.post(baseURL, {
//     command: "getUserWithdrawItems",
//     data: { network },
//     params: [],
//   });
//   return response;
// };

// export const getNetworkTransactions = async () => {
//   let response = await axios.post(baseURL, {
//     command: "getNetworkTransactions",
//     data: {},
//     params: [],
//   });
//   return response;
// };
