import React, { useState, useEffect } from "react";
import IconMetaMask from "../assets/img/icon-metamask.svg";
import IconWalletConnect from "../assets/img/icon-wallet-connect.svg";

import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import crossbtn from "../assets/img/crossbtn.png";
import WalletConnect from "@walletconnect/client";
import Web3 from "web3";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaQuestionCircle } from "react-icons/fa";
export const CreateContractDialog = ({ show, setShow }: any) => {
  const dispatch = useDispatch();
  const onclose = () => {
    setShow(false);
  };
  const [wcConnector, setWcConnector] = useState<WalletConnect | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [createSoosDataInfoFoam, setCreateSoosDataInfoFoam] = useState<any>();
  const CustomerEditSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Name is required"),
    price: Yup.number()
      .min(0, "Minimum 0 number")
      .required("Amount is required"),
    totalCount: Yup.number()
      .min(0, "Minimum 0 number")
      .required("Total Count is required"),
    startDateTime: Yup.mixed().required("Start Date Time is required"),
    endDateTime: Yup.mixed().required("End Date Time is required"),
    timeofDay: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Time of Day is required"),
    registrationEndTime: Yup.mixed().required(
      "Registration End Time is required"
    ),
  });
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

      // chainId = await web3.eth.getChainId()
      let isconnected = await window.ethereum.isConnected();
      if (isconnected) {
        console.log(isconnected, "isconnected");

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
              className="col-11 f-pl-1 d-flex justify-content-start"
              style={{ fontSize: "16px", fontWeight: 700, color: "black" }}
            >
              Add address
            </div>
            <div
              className="col-1 d-flex cursor_pointer"
              style={{
                color: "rgb(115 115 115/var(--tw-text-opacity)",
                justifyContent: "start",
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
        <DialogContent className="">
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: "",
              startDateTime: "",
              price: "",
              endDateTime: "",
              timeofDay: "",
              registrationEndTime: "",
              totalCount: "",
            }}
            validationSchema={CustomerEditSchema}
            validate={(values) => {
              {
                setCreateSoosDataInfoFoam(values);
              }
            }}
            onSubmit={(values) => {
              {
              }
              console.log(
                "submit",
                createSoosDataInfoFoam.name,
                createSoosDataInfoFoam.startDateTime,
                createSoosDataInfoFoam.price,
                createSoosDataInfoFoam.endDateTime,
                createSoosDataInfoFoam.timeofDay,
                createSoosDataInfoFoam.registrationEndTime,
                createSoosDataInfoFoam.totalCount
              );
            }}
          >
            {({ handleSubmit }) => (
              <>
                <Form className="form form-label-right">
                  {/* <div className="centered">
                        <CircularProgress className="splash-screen-spinner" />
                      </div> */}
                  <div className="d-flex mb-4">
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Wallet address
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="text"
                        placeholder="Enter address"
                      />
                      <div style={{ fontSize: "14px", color: "gray" }}>
                        e.g. 0xdnkfjnsdkjgnofngfnnfkjnkgn
                      </div>
                    </div>
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Wallet nickname (optional)
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "black" }} className="font-700">
                      Relationship
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <label className="d-flex align-items-center clr_black_new  f-pl--2 f-pb--6 f-pt--6 ">
                        <div className="col-5 f-mr--5 input-border f-pb--6 f-pt--6 d-flex align-items-center">
                          <div className="col-9 d-flex align-items-center justify-content-center">
                            <div>Investor</div>
                          </div>
                          <div className="col-3 d-flex align-items-center justify-content-center">
                            <input type="radio" value="option1" />
                          </div>
                        </div>
                        <div className="col-6 input-border f-pb--6 f-pt--6 d-flex align-items-center">
                          <div className="col-9 d-flex align-items-center justify-content-center">
                            <div>Employee</div>
                          </div>
                          <div className="col-3 d-flex align-items-center justify-content-center">
                            <input type="radio" value="option1" />
                          </div>
                        </div>
                      </label>
                    </div>
                    <div
                      style={{ color: "#0680f2" }}
                      className="col-7 d-flex align-items-center"
                    >
                      <FaQuestionCircle />
                      <div className="f-pl--2">whats the difference</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "black" }} className="font-700">
                      Details
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Numbers of tokens to vest
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="text"
                      />
                    </div>
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Total vesting period (e.g. 4Y;6M;0D)
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Vesting start date (UDC)
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="calendar"
                      />
                    </div>
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Vesting cadence
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div style={{ color: "black" }} className="font-700">
                      Lockup period
                    </div>
                    <FaQuestionCircle className="f-pl--3" />
                  </div>
                  <div className="d-flex mb-2 f-pt--3">
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Lockup length (Month)
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="calendar"
                      />
                      <div style={{ fontSize: "14px", color: "gray" }}>
                        How long until they can claim their first tokens
                      </div>
                    </div>
                    <div className="d-block col-6 f-pr--3">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="myInput"
                        className="f-pb--1"
                      >
                        Lockup percentage
                      </label>
                      <input
                        id="myInput"
                        className={"col-12 f-pt--3 f-pb--3 input-border"}
                        name="name"
                        type="text"
                      />
                      <div style={{ fontSize: "14px", color: "gray" }}>
                        % of total tokens vested they'll receive once the lockup
                        period has finished.
                      </div>
                    </div>
                  </div>
                  <div className="d-flex f-pt-1">
                    <div className="col-6">
                      <button className="cancel-button  f-pt--5 f-pb--5">
                        <div
                          style={{ color: "#0680f2", fontSize: "16px" }}
                          className="font-700 cursor_pointer"
                        >
                          Cancel
                        </div>
                      </button>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <button
                        type="submit"
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="wallet-button   f-pt--5 f-pb--5"
                      >
                        <div
                          style={{ color: "white", fontSize: "16px" }}
                          className="font-700 cursor_pointer"
                        >
                          Add adress
                        </div>
                      </button>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </DialogContent>
      </div>
    </Dialog>
  );
};
