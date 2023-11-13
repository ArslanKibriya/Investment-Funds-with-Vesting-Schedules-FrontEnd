import React, { useEffect, useState } from "react";
import { FGridItem, FList, FListItem } from "ferrum-design-system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
import Web3 from "web3";
import {
  setWalletAddress,
  setwalletStatus,
} from "../../redux/app-contract/appContractActions";

export const ConnectWalletDialogStart = ({
  show,
  onHide,
  metaMaskClickEvent,
  walletConnectClickEvent,
}: any) => {
  const mainContractAddress = useSelector(
    (state: RootState) => state.mainAppContract.mainContract
  );
  const [networkShow, setNetworkshow] = useState(false);
  const isConnected = useSelector(
    (state: RootState) => state.mainAppContract.walletIsConnected
  );

  return (
    <div>
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <p className="f-mt-2 f-mb-2 custom-font-size-16 font-400 connect-wallet">
          Please connect your wallet on <br />
          {networkShow} network to continue
        </p>
      </div>
      <div className="dialog-connect-wallet text-center">
        {/* custom-padding-11 */}
        <div>
          {/* <p className={'text_left custom-font-size-20 c-mb-24 font-400'}>Select Wallet</p> */}
          <div
            className={"whiteLabeledListItem c-mb-50 d-flex  cursor_pointer"}
          >
            <div className="col-6 d-flex" style={{ alignItems: "center" }}>
              <p
                style={{ paddingLeft: "4px" }}
                className={
                  "text_left custom-font-size-24 clr_black_new font-700"
                }
              >
                {isConnected ? "Disconnect" : "MetaMask"}
              </p>
            </div>
            <span
              className="col-6 d-flex"
              style={{
                justifyContent: "end",
                alignItems: "center",
                paddingRight: "3px",
              }}
            >
              <img src={IconMetaMask} alt={IconMetaMask}></img>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
