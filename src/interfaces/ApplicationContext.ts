export interface APPLICATION_CONTEXT {
  locale: APPLICATION_LOCALE;
  openConnectWalletDialog: any;
  isMobile: Boolean;
}

export const defaultApplcationContext: APPLICATION_CONTEXT = {
  locale: {
    menu_swap: "",
    menu_transactions: "",
    myTrades_table_c1: "",
    myTrades_table_c2: "",
    myTrades_table_c3: "",
    myTrades_table_c4: "",
    myTrades_table_c5: "",
    myTrades_title: "",
    swap_title: "",
    swap_connect: "",
    swap_disconnect: "",
    swap_heading: "",
    swap_information_infoTwo: "",
    swap_information_infoOne: "",
    swap_myTrades: "",
    swap_swapModal_title: "Connect Wallet",
    swap_swap_title: "",
    swap_swap_tokenSelectorOne: "Token",
    swap_swap_tokenSelectorTwo: "Token 2",
    swap_tokenSelectorModal_title: "",
    transactions_table_c1: "",
    transactions_table_c2: "",
    transactions_table_c3: "",
    transactions_table_c4: "",
    transactions_table_c5: "",
    title_transactions: "",
  },
  openConnectWalletDialog: () => {
    // console.log("Open wallet Dialog");
  },
  isMobile: false,
};

export interface APPLICATION_LOCALE {
  menu_swap: String;
  menu_transactions: String;
  myTrades_table_c1: String;
  myTrades_table_c2: String;
  myTrades_table_c3: String;
  myTrades_table_c4: String;
  myTrades_table_c5: String;
  myTrades_title: String;
  swap_title: String;
  swap_connect: String;
  swap_disconnect: String;
  swap_heading: String;
  swap_information_infoTwo: String;
  swap_information_infoOne: String;
  swap_myTrades: String;
  swap_swapModal_title: String;
  swap_swap_title: String;
  swap_swap_tokenSelectorOne: String;
  swap_swap_tokenSelectorTwo: String;
  swap_tokenSelectorModal_title: String;
  transactions_table_c1: String;
  transactions_table_c2: String;
  transactions_table_c3: String;
  transactions_table_c4: String;
  transactions_table_c5: String;
  title_transactions: String;
}
