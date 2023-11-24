import React, { useEffect, useState } from "react";
import { RiUnderline } from "react-icons/ri";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { FAQs } from "../../components/faqs";
import { ConnectWalletDialog } from "../../components/connect-wallet/ConnectWalletDialog";
import { WalletConnector } from "foundry";
import { FButton } from "ferrum-design-system";
import { SelectBlockChain } from "../../components/selectblockchain";
import { AddVestingDetail } from "../../components/addvestingdetail";
import dowmimg from "../../assets/img/down-arrow.png";
import {
  FaArrowAltCircleRight,
  FaBeer,
  FaCalendar,
  FaCentercode,
  FaFoursquare,
  FaGoogleWallet,
  FaSave,
} from "react-icons/fa";
import { Divider } from "@material-ui/core";
import { CreateContractDialog } from "../../components/CreateContractDialog";
const TokenVesting = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [faqs, setFaqs] = useState(false);

  return (
    <>
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <div className="d-flex f-pb--5 f-pt--5  bg-white header-vertical-line">
          <div
            style={faqs ? { flex: 2.7 } : { flex: 2.8 }}
            className="column d-flex justify-content-end align-items-center"
          >
            <img
              src="https://app.team.finance/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-header.17238289.png&w=256&q=75"
              alt=""
            />
            <div className="header-line"></div>
          </div>
          <div
            style={{ color: "blue", flex: 9.2 }}
            className="column d-flex  align-items-center cursor_pointer"
            onClick={() => history.push("/")}
          >
            <div
              style={{ flex: 0.5 }}
              className="column d-flex justify-content-center  "
            >
              {"<"}
            </div>
            <div
              style={{ flex: 11.5 }}
              className="column d-flex justify-content-start font-700 "
            >
              Back to home page
            </div>
          </div>
        </div>
        <div className="d-flex bg-pink-header f-pt-1 f-pr--4">
          <div
            className={
              faqs
                ? "col-10 d-flex  justify-content-end"
                : "col-7 d-flex  justify-content-end"
            }
          >
            <div className={faqs ? "col-10 f-pr--6" : "col-9 f-pr--6"}>
              <div className="d-flex">
                <div
                  style={{
                    color: "black",
                    fontSize: "32px",
                    lineHeight: "42px",
                  }}
                  className="col-7 font-700 f-pl--2"
                >
                  Create vesting contract
                </div>
                <div className="col-5 cursor_pointer d-flex align-items-center justify-content-end">
                  <button className="text-blue-lm text-button vesting-button f-pt--7 f-pb--7">
                    <div style={{ fontSize: "15px" }} className="d-flex">
                      <FaSave />
                      <div className="f-pl--3">Save & continue later</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="col-12 f-pl--8 f-pr--8 f-pt-2 f-pb-2">
                <div className="row">
                  <div
                    className="column  blue-progressbar"
                    style={{ flex: 2.5 }}
                  >
                    <div className="d-flex align-items-center progress-bar-text f-pt--8">
                      <div className="col-3">
                        <FaGoogleWallet />
                      </div>
                      <div style={{ color: "" }} className="col-9 ">
                        Connect wallet
                      </div>
                    </div>
                  </div>
                  <div className="column before-progress" style={{ flex: 2.5 }}>
                    <div className="d-flex align-items-center progress-bar-text f-pt--8">
                      <div className="col-3">
                        <FaFoursquare />
                      </div>
                      <div style={{ color: "" }} className="col-9 ">
                        Select blockchain
                      </div>
                    </div>
                  </div>

                  <div className="column before-progress" style={{ flex: 2.5 }}>
                    <div className="d-flex align-items-center progress-bar-text f-pt--8">
                      <div className="col-3">
                        <FaCentercode />
                      </div>
                      <div style={{ color: "" }} className="col-9 ">
                        Enter token address
                      </div>
                    </div>
                  </div>
                  <div className="column before-progress" style={{ flex: 2.5 }}>
                    <div className="d-flex align-items-center progress-bar-text f-pt--8">
                      <div className="col-3">
                        <FaCalendar />
                      </div>
                      <div style={{ color: "" }} className="col-9 ">
                        Add vesting details
                      </div>
                    </div>
                  </div>
                  <div className="column before-progress" style={{ flex: 2.5 }}>
                    <div className="d-flex align-items-center progress-bar-text f-pt--8">
                      <div className="col-3">
                        <FaArrowAltCircleRight />
                      </div>
                      <div
                        style={{ color: "" }}
                        className="col-9 progress-bar-text"
                      >
                        Create contract
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: "white" }} className="">
                <div
                  style={{ color: "black", fontSize: "22px" }}
                  className="font-700 f-pt-1 f-pl-1"
                >
                  Connect wallet
                </div>
                <div
                  style={{ color: "black", fontSize: "16px" }}
                  className="f-pt-1 f-pl-1"
                >
                  Make sure to connect only the wallet that contains the tokens
                  you would like to vest.
                </div>
                <div className="f-pt-2 f-pl-1 f-pb-1 ">
                  {/* <WalletConnector.WalletConnector
                    WalletConnectView={FButton}
                    WalletConnectModal={ConnectWalletDialog}
                    WalletConnectViewProps={{
                      className: `custom-font-size-14 font-700 connectBtn ${"bg_white"}`,
                      variant: "whiteLabeled",
                    }}
                  /> */}

                  <button
                    className="wallet-button  f-pt--5 f-pb--5"
                    onClick={() => setShow(true)}
                  >
                    <div
                      style={{ color: "white", fontSize: "16px" }}
                      className="font-700 cursor_pointer"
                    >
                      Select Wallet
                    </div>
                  </button>
                </div>
              </div>
              <div className="d-flex f-mt--6 section-select-wallet align-items-center">
                <div className="col-1 d-flex justify-content-center f-pt-2 f-pb-2">
                  <FaFoursquare />
                </div>
                <div className="col-6">Select blockchain</div>
                <div className="col-4 f-pt-2 f-pb-2"></div>
                <div className="col-1 f-pt-2 f-pb-2">
                  <img src={dowmimg} alt="" />
                </div>
              </div>
              <SelectBlockChain />
              <div className="d-flex f-mt--6 section-select-wallet align-items-center">
                <div className="col-1 d-flex justify-content-center f-pt-2 f-pb-2">
                  <FaCentercode />
                </div>
                <div className="col-6">Enter token address</div>
                <div className="col-4 f-pt-2 f-pb-2"></div>
                <div className="col-1 f-pt-2 f-pb-2">
                  <img src={dowmimg} alt="" />
                </div>
              </div>
              <div className="d-flex f-mt--6 section-select-wallet align-items-center">
                <div className="col-1 d-flex justify-content-center f-pt-2 f-pb-2">
                  <FaCalendar />
                </div>
                <div className="col-6">Add vesting details</div>
                <div className="col-4 f-pt-2 f-pb-2"></div>
                <div className="col-1 f-pt-2 f-pb-2">
                  <img src={dowmimg} alt="" />
                </div>
              </div>
              <AddVestingDetail />
              <div className="d-flex f-mt--6 section-select-wallet align-items-center">
                <div className="col-1 d-flex justify-content-center f-pt-2 f-pb-2">
                  <FaArrowAltCircleRight />
                </div>
                <div className="col-6">Create contract</div>
                <div className="col-4 f-pt-2 f-pb-2"></div>
                <div className="col-1 f-pt-2 f-pb-2">
                  <img src={dowmimg} alt="" />
                </div>
              </div>
              <div
                style={{ color: "rgba(34,34,34,.65)" }}
                className="d-flex f-pt-2"
              >
                <div style={{ fontSize: "11px" }}>
                  By locking tokens into this smart contract you agree to our
                </div>
                <div
                  style={{ fontSize: "12px", textDecoration: "underline" }}
                  className="cursor_pointer f-pb-2"
                >
                  Terms and Conditions
                </div>
              </div>
            </div>
          </div>
          {faqs && <div style={{ flex: 1.2 }} className="column"></div>}

          <div
            style={
              faqs
                ? { flex: 0.8, height: "max-content" }
                : { height: "max-content" }
            }
            className={
              !faqs
                ? "col-5 f-pt-2 f-pb-2 f-pr--3 faqs-dialog d-flex justify-content-center"
                : "column f-pt-2 f-pb-2 f-pr--3 faqs-dialog faqs-width d-flex justify-content-center"
            }
          >
            <FAQs faqsDialog={faqs} setFaqsDialog={setFaqs} />
          </div>
        </div>

        {/* <ConnectWalletDialog show={show} setShow={setShow} /> */}
        <CreateContractDialog show={show} setShow={setShow} />
      </div>
    </>
  );
};

export default TokenVesting;
