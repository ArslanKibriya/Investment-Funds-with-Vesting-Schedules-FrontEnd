import React, { useState, useEffect } from "react";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
import IconWalletConnect from "../../assets/img/icon-wallet-connect.svg";
import "./ConnectWalletDialog-styles.scss";
import { FDialog } from "../ferrum-design-system/Fdialog/Fdialog";
import {
  setWalletAddress,
  setwalletStatus,
} from "../../redux/app-contract/appContractActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import crossbtn from "../../assets/img/crossbtn.png";
import WalletConnect from "@walletconnect/client";
import Web3 from "web3";
export const ConnectWalletDialog = ({ show, setShow }: any) => {
  const dispatch = useDispatch();
  const isConnected = useSelector(
    (state: RootState) => state.mainAppContract.walletIsConnected
  );
  const onclose = () => {
    setShow(false);
  };
  const [wcConnector, setWcConnector] = useState<WalletConnect | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  useEffect(() => {}, []);
  async function setupWalletConnect() {
    if (!wcConnector) {
      const connector = new WalletConnect({
        bridge:
          "wss://z.bridge.walletconnect.org/?env=browser&host=localhost%3A3000&protocol=wc&version=1",
      });
      if (connector.connected) {
        setConnected(true);
        setAccounts(connector.accounts);
      }
      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }
        setConnected(true);
        console.log(connected, "connectWallettwo");
        setAccounts(payload.params[0].accounts);
      });
      connector.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }
        setAccounts(payload.params[0].accounts);
      });
      connector.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }
        setConnected(false);
        setAccounts([]);
      });
      setWcConnector(connector);
    }
  }
  const connectWallettwo = async () => {
    if (wcConnector) {
      try {
        await wcConnector.createSession();
      } catch (error) {
        console.error("Error connecting WalletConnect:", error);
      }
    }
  };
  async function connectWalletMetaMask() {
    const web3 = new Web3(window.ethereum);
    console.log("hello");
    try {
      if (!window.ethereum) {
        alert("Please Install the wallet");
      } else await window.ethereum.enable();
      let accounts = await web3.eth.getAccounts();
      dispatch(setWalletAddress(accounts[0]));
      // chainId = await web3.eth.getChainId()
      let isconnected = await window.ethereum.isConnected();
      if (isconnected) {
        console.log(isconnected, "isconnected");
        dispatch(setwalletStatus(isconnected));
        setConnected(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDisconnect = async () => {
    console.log("check");
    if (window.ethereum) {
      window.localStorage.clear();
    }
  };
  console.log(isConnected, "outside");
  const connectToCoinbaseWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to Coinbase Wallet");
      } catch (e) {
        console.error("Error connecting to Coinbase Wallet:");
        if (e) {
          console.log(
            "Coinbase Wallet extension not detected. Please install it to connect."
          );
        }
      }
    } else {
      console.log(
        "No Ethereum provider found. Please install a wallet to connect."
      );
    }
  };
  return (
    <Dialog open={show} onClose={onclose}>
      <div
        style={{
          backgroundColor: "rgb(255 255 255/var(--tw-bg-opacity));",
          padding: "10px",
        }}
      >
        <DialogTitle>
          <div className="d-flex">
            <div
              className="col-11 d-flex justify-content-start"
              style={{ fontSize: "16px", fontWeight: 700, color: "black" }}
            >
              Select a Wallet
            </div>
            <div
              className="col-1 d-flex cursor_pointer"
              style={{
                color: "rgb(115 115 115/var(--tw-text-opacity)",
                justifyContent: "end",
                alignItems: "center",
              }}
              onClick={() => onclose()}
            >
              <img
                className="dialog-onclose"
                src={crossbtn}
                alt=""
                height={16}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="wallet-connect-dialog">
          <div className="d-block justify-content-around">
            <div
              onClick={() => {
                {
                  handleDisconnect();
                }
              }}
              className={" d-flex row cursor_pointer"}
              style={{ alignItems: "center" }}
            >
              <div
                className={"d-flex align-items-center clr_black_new"}
                style={{
                  justifyContent: "start",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                <div className="col-2" style={{ justifyContent: "start" }}>
                  <img src={IconMetaMask} alt={IconMetaMask} height={22}></img>
                </div>
                <div className="col-9">
                  {isConnected ? "Disconnect" : "MetaMask"}
                </div>
                <div>
                  <img
                    src="https://app.team.finance/assets/wallet/right-arrow.svg"
                    alt=""
                    height={14}
                  />
                </div>
              </div>
            </div>
            <div
              className={" d-flex f-pt-1 row cursor_pointer"}
              style={{ alignItems: "center" }}
            >
              <div
                className={"d-flex align-items-center clr_black_new"}
                style={{
                  justifyContent: "start",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                <div className="col-2" style={{ justifyContent: "start" }}>
                  <img
                    src={IconWalletConnect}
                    alt={IconWalletConnect}
                    height={16}
                  ></img>
                </div>
                <div className="col-9">{"Wallet Connect"}</div>
                <div>
                  <img
                    src="	https://app.team.finance/assets/wallet/qr-code-scan-icon.svg"
                    alt=""
                    height={14}
                  />
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                // connectToCoinbaseWallet();
              }}
              className={" d-flex f-pt-1 row cursor_pointer"}
              style={{ alignItems: "center" }}
            >
              <div
                className={"d-flex align-items-center clr_black_new"}
                style={{
                  justifyContent: "start",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                <div className="col-2" style={{ justifyContent: "start" }}>
                  <img
                    src="	https://app.team.finance/assets/wallet/coinBase@3x.png"
                    alt={IconWalletConnect}
                    height={22}
                  ></img>
                </div>
                <div className="col-9">{"Coinbase Wallet"}</div>
                <div>
                  <img
                    src="	https://app.team.finance/assets/wallet/qr-code-scan-icon.svg"
                    alt=""
                    height={14}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
