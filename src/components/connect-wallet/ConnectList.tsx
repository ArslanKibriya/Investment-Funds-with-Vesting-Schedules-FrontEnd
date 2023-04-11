import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
// import IconCoinbase from "../../assets/img/icon-coinbase.png";
import IconWalletConnect from "../../assets/img/icon-wallet-connect.svg";
// import { useApplicationUIContext } from "../../ApplicationUiContext";
import { FCard, FItem, FList, FListItem } from "ferrum-design-system";
import "./ConnectWalletDialog-styles.scss";



export const ConnectWalletList = ({
    metaMaskClickEvent,
    walletConnectClickEvent,
}: any) => {
    const { isConnected, isConnecting } = useSelector((state: RootState) => state.walletConnector);

    return (
        <div className="dialog-connect-wallet text-center">
            {/* custom-padding-11 */}
            < FList display="block" type="number" variant="connect-wallet" >
                {/* <p className={'text_left custom-font-size-20 c-mb-24 font-400'}>Select Wallet</p> */}
                <FListItem display="flex" onClick={metaMaskClickEvent} className={'whiteLabeledListItem c-mb-50  cursor_pointer'}>
                    <p className={'text_left custom-font-size-24 clr_black_new font-700'}>{isConnected ? 'Disconnect' : 'MetaMask'}</p>
                    <span className="icon-wrap">
                        <img src={IconMetaMask} alt={IconMetaMask}></img>
                    </span>
                </FListItem>
                <FListItem display="flex" onClick={walletConnectClickEvent} className={'whiteLabeledListItem c-mb-50 cursor_pointer'}>
                    <p className={'text_left custom-font-size-24 clr_black_new font-700'}>WalletConnects</p>
                    <span className="icon-wrap">
                        <img src={IconWalletConnect} alt={IconWalletConnect}></img>
                    </span>
                </FListItem>
            </FList >
        </div>
    );
};
