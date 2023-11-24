import React, { useState } from "react";
import { FGrid, FGridItem, FTypo } from "ferrum-design-system";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { ConnectWalletDialog } from "../connect-wallet/ConnectWalletDialog";
import vestingicon from "../../assets/img/vesting_black.svg";
import { FaArrowLeft, FaArrowRight, FaInfo } from "react-icons/fa";
import telegramlogo from "../../assets/img/footer-telegram.svg";
import instalogo from "../../assets/img/footer-insta.svg";
import fblogo from "../../assets/img/footer-fb.svg";
const VestingCards = () => {
  const location = useLocation();
  const history = useHistory();

  var commaAllocation = new Intl.NumberFormat();
  return (
    <>
      <div>
        <div className="d-block text-title">Dashboard</div>
      </div>
      <div className="f-pt-1">
        <div className="d-flex f-pt-2 f-pb-2 dashboard-description align-items-center">
          <div className="col-1 f-pl-1">
            <img
              src="https://app.team.finance/_next/static/media/wallet-ringed.9d5742db.svg"
              alt=""
            />
          </div>
          <div className="f-pl-1">
            <div
              style={{ fontSize: "20px", fontWeight: 600, lineHeight: "24px" }}
            >
              See what's under the hood
            </div>
            <div className="f-pt--6">
              Connect your wallet to see all services and check your contracts.
            </div>
          </div>
        </div>
      </div>

      <div className={"f-mt-2 f-mb-2 f-pr-1 d-flex"}>
        <div className="col-6 f-mr-1">
          <div className={" vesting-small-cards"}>
            <div className="d-flex">
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">Token Vesting</div>
                <p className="f-pt-1 font-size-11 line-h-s">
                  Let your investors, advisors and employees get paid
                  automatically, without you having to lift a finger.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button
                      onClick={() => history.push("/tokenvesting")}
                      className="text-blue-lm text-button vesting-button cursor_pointer f-pl-2 f-pr-2 f-pt--7 f-pb--7"
                    >
                      Create Vesting
                      <FaArrowRight
                        className="f-pl--4"
                        style={{ color: "rgba(31,74,233,.6)" }}
                      />
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
              <div className="col-3 d-flex f-pt-1 justify-content-center">
                <div
                  style={{
                    backgroundColor: "rgba(219,234,254,.5)",
                    borderRadius: "9999px",
                    height: "5rem",
                    width: "5rem",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div
                    style={{
                      backgroundColor: "rgb(219 234 254)",
                      borderRadius: "9999px",
                      height: "3rem",
                      width: "3rem",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={vestingicon}
                      alt=""
                      height={20}
                      style={{ color: "blue" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">Liquidity Locks</div>
                <p className="f-pt-1 font-size-12 line-h-s">
                  Prevent rug pulls and increase community trust by locking LP
                  tokens.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button className="text-blue-lm text-button vesting-button  f-pt--7 f-pb--7">
                      Create Liquidity lock
                      <FaArrowRight
                        className="f-pl--4"
                        style={{ color: "rgba(31,74,233,.6)" }}
                      />
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"f-mt-2 f-mb-2 f-pr-1 d-flex"}>
        <div className="col-6 f-mr-1">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">Team Token Locks</div>
                <p className="f-pt-1 font-size-12 line-h-s">
                  Improve security and build trust in your token by locking your
                  team tokens.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button
                      style={{ fontSize: "15px" }}
                      className="text-blue-lm text-button vesting-button f-pt--7 f-pb--7"
                    >
                      Create team token lock
                      <FaArrowRight
                        className="f-pl--4"
                        style={{ color: "rgba(31,74,233,.6)" }}
                      />
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">NFT Locks</div>
                <p className="f-pt-1 font-size-12 line-h-s">
                  Lock your NFTs to showcase your confidence in the collection.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button className="text-blue-lm text-button vesting-button f-pl-1 f-pr-2 f-pt--7 f-pb--7">
                      Create NFT lock
                      <FaArrowRight
                        className="f-pl--4"
                        style={{ color: "rgba(31,74,233,.6)" }}
                      />
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex f-pt-3 header-bottom">
        <div className="col-6"></div>
        <div style={{ color: "black" }} className="col-6 d-flex f-pb-2">
          <div className="col-4">
            <div className="font-700">Services</div>
            <div style={{ color: "gray" }} className="f-pt-1">
              <div>Token Creation</div>
              <div className="f-pt-1">Token Locks</div>
              <div className="f-pt-1">Vesting</div>
              <div className="f-pt-1">Tokenomics Tool</div>
              <div className="f-pt-1">Enterprise</div>
              <div className="f-pt-1">Tokens</div>
            </div>
          </div>
          <div className="col-4">
            <div className="font-700">Team Finance</div>
            <div style={{ color: "gray" }} className="f-pt-1">
              <div>FAQ</div>
              <div className="f-pt-1">Pricing</div>
              <div className="f-pt-1">About</div>
              <div className="f-pt-1">Docs</div>
            </div>
          </div>
          <div className="col-4">
            <div className="font-700">Legal</div>
            <div style={{ color: "gray" }} className="f-pt-1">
              <div>Terms and Conditions</div>
              <div className="f-pt-1">Privacy Policy</div>
              <div className="f-pt-1">Disclaimers</div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex f-pt-2">
        <div style={{ color: "gray" }} className="col-10">
          © 2023 TrustSwap Inc. All Rights Reserved.
        </div>
        <div className="col-2 d-flex">
          <div className="col-4"></div>
          <div className="col-8 d-flex">
            <div className="col-4">
              <img
                style={{ color: "black" }}
                src={telegramlogo}
                alt=""
                height={24}
              />
            </div>
            <div className="col-4">
              <img
                style={{ color: "black" }}
                src={instalogo}
                alt=""
                height={24}
              />
            </div>
            <div className="col-4">
              <img style={{ color: "black" }} src={fblogo} alt="" height={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VestingCards;
