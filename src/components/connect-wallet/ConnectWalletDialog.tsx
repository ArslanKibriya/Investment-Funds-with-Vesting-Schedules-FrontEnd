import React from "react";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
// import IconCoinbase from "../../assets/img/icon-coinbase.png";
import IconWalletConnect from "../../assets/img/icon-wallet-connect.svg";
// import { useApplicationUIContext } from "../../ApplicationUiContext";
import { FCard, FItem, FList, FListItem } from "ferrum-design-system";
import "./ConnectWalletDialog-styles.scss";
import { FDialog } from "../ferrum-design-system/Fdialog/Fdialog";

export const ConnectWalletDialog = ({
  show,
  onHide,
  metaMaskClickEvent,
  walletConnectClickEvent,
}: any) => {

  return (
    <FDialog
      show={show}
      onHide={onHide}
      size="small"
      showClose={false}
      variant={'new-purple-popup'}
      className="dialog-connect-wallet text-center"
    >
      {/* custom-padding-11 */}
      <FList display="block" type="number" variant="connect-wallet">
        <p className={'text_left custom-font-size-20 c-mb-24 font-400 connect-wallet-select-m'}>Select Wallet</p>
        <FListItem display="flex" onClick={metaMaskClickEvent} className={'whiteLabeledListItem c-mb-50 cursor_pointer'}>
          <p className={'text_left custom-font-size-24 clr_black_new font-700'}>MetaMask</p>
          <span className="icon-wrap">
            <img src={IconMetaMask} alt={IconMetaMask}></img>
          </span>
        </FListItem>
        <FListItem display="flex" onClick={() => { 
            walletConnectClickEvent(); 
            window.localStorage.removeItem('walletconnect')
          }
        } className={'whiteLabeledListItem c-mb-50 cursor_pointer'}>
          <p className={'text_left custom-font-size-20 clr_black_new font-700'}>WalletConnects</p>
          <span className="icon-wrap">
            <img src={IconWalletConnect} alt={IconWalletConnect}></img>
          </span>
        </FListItem>
      </FList>
    </FDialog>
  );
};
