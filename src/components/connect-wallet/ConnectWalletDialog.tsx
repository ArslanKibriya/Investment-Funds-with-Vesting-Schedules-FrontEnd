import React from "react";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
// import IconCoinbase from "../../assets/img/icon-coinbase.png";
import IconWalletConnect from "../../assets/img/icon-wallet-connect.svg";
// import { useApplicationUIContext } from "../../ApplicationUiContext";
import { FCard, FItem, FList, FListItem } from "ferrum-design-system";
import "./ConnectWalletDialog-styles.scss";
import { FDialog } from "../ferrum-design-system/Fdialog/Fdialog";
import {
  setWalletAddress,
  setwalletStatus,
} from "../../redux/app-contract/appContractActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import crossbtn from "../../assets/img/crossbtn.svg";
export const ConnectWalletDialog = ({ show, setShow }: any) => {
  const dispatch = useDispatch();
  const isConnected = useSelector(
    (state: RootState) => state.mainAppContract.walletIsConnected
  );
  const onclose = () => {
    setShow(false);
  };
  return (
    <Dialog open={show} onClose={onclose}>
      <div style={{ backgroundColor: "#111315" }}>
        <DialogTitle>
          <div className="d-flex">
            <div
              className="col-8"
              style={{ fontSize: "16px", fontWeight: 400, color: "white" }}
            >
              Wallet
            </div>
            <div
              className="col-4 d-flex"
              style={{ justifyContent: "end", alignItems: "center" }}
              onClick={() => onclose()}
            >
              <img src={crossbtn} alt="" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="d-flex justify-content-around">
            <div
              onClick={() => {
                dispatch(setwalletStatus(false));
                dispatch(setWalletAddress(""));
              }}
              className={"whiteLabeledListItem d-flex  row cursor_pointer"}
              style={{ alignItems: "center" }}
            >
              <div
                className={"col-6 clr_black_new"}
                style={{
                  justifyContent: "start",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                {isConnected ? "Disconnect" : "MetaMask"}
              </div>
              <div className="col-6 d-flex" style={{ justifyContent: "end" }}>
                <img src={IconMetaMask} alt={IconMetaMask}></img>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
