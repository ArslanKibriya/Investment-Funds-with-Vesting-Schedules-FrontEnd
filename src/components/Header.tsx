import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FHeader,
  FButton,
  FItem,
  FLayout,
  FGrid,
  FGridItem,
  FTypo,
} from "ferrum-design-system";
import { useHistory, useLocation } from "react-router";
import { ConnectWalletDialog } from "../components/connect-wallet/ConnectWalletDialog";
import { FToggle } from "./ferrum-design-system/switch";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import leftIcon from "../assets/img/back-arrow.svg";
import { Link } from "react-router-dom";
import { TruncateWithoutRounding } from "../utils/global.utils";
import ferrumlogo from "../assets/img/ferrum-logo.svg";
import {
  smartContractAddress,
  ferrumNetworkIdentifier,
  allowedNetwork,
} from "../utils/const.utils";
import Menu from "../assets/img/Menu.svg";
import crossbtn from "../assets/img/crossbtn.svg";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
interface Props {
  myClaims?: boolean;
  setMyClaims?: any;
}
export const Header = ({ myClaims, setMyClaims }: Props) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [show, setShow] = useState(false);
  const { walletBalance } = useSelector(
    (state: RootState) => state.walletConnector
  );
  const isConnected = useSelector(
    (state: RootState) => state.mainAppContract.walletIsConnected
  );
  const walletAddress = useSelector(
    (state: RootState) => state.mainAppContract.accountWalletAddress
  );
  const mainContractAddress = useSelector(
    (state: RootState) => state.mainAppContract.mainContract
  );
  const [userTogglermobile, setUserTogglerMobile] = useState(false);
  const [openToggler, setOpenToggler] = useState(true);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  //for mobile design view
  useEffect(() => {
    if (windowDimension.width < 768) {
      setUserTogglerMobile(false);
    } else {
      setUserTogglerMobile(true);
      setOpenToggler(true);
    }
  }, [windowDimension]);
  useLayoutEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;

      setWindowDimension({ width, height });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function WeiToEther(wei: any) {
    var Web3 = require("web3");
    return Web3.utils.fromWei(String(wei), "ether");
  }
  return (
    <FGrid
      className={
        "w-100 bg-pink-header d_flex justify_between align_center header_layout ml_0 mr_0"
      }
    >
      {userTogglermobile && (
        <div className="col-4">
          <div className="d_flex justify_between align_center w-100 ">
            {currentRoute === `/user/dashboard/${mainContractAddress}` ? (
              <div className={"d_flex justify_start align_center"}>
                <img
                  src={ferrumlogo}
                  alt={ferrumlogo}
                  // height="36px"
                  // width="289px"
                  className="c-mr-36 no-gutter"
                ></img>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "white",
                  }}
                >
                  Dashboard
                </div>
              </div>
            ) : currentRoute === `/dashboard/${mainContractAddress}` ||
              currentRoute === `/${mainContractAddress}` ? (
              <div
                style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff" }}
              >
                Welcome to your Dashboard
              </div>
            ) : currentRoute ===
              `/vesting/vesting-form/${mainContractAddress}` ? (
              <div className="f-mt-2 f-mb-2 d_flex justify_start align_center">
                <Link
                  to={`/dashboard/${mainContractAddress}?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`}
                >
                  <div
                    className={
                      "round img_29 bg_white d_flex justify_center align_center f-mr-1"
                    }
                  >
                    <img
                      src={leftIcon}
                      alt={leftIcon}
                      style={{ width: 29, height: 29 }}
                    />
                  </div>
                </Link>
                <p className={" custom-font-size-18 font-700"}>
                  Add New Vesting
                </p>
              </div>
            ) : currentRoute ===
              `/vesting/vesting-card/${mainContractAddress}` ? (
              <div className="f-mt-2 f-mb-2 d_flex justify_start align_center">
                <Link
                  to={`/dashboard/${mainContractAddress}?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`}
                >
                  <div
                    className={
                      "round img_29 bg_white d_flex justify_center align_center f-mr-1"
                    }
                  >
                    <img
                      src={leftIcon}
                      alt={leftIcon}
                      style={{ width: 29, height: 29 }}
                    />
                  </div>
                </Link>
                <p className={"custom-font-size-18 font-700"}>View Vesting</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <FGridItem alignX="end" alignY="center" size={[8, 8, 8]}>
        {isConnected && (
          <>
            {userTogglermobile &&
              currentRoute === `/user/dashboard/${mainContractAddress}` && (
                <div className={"f-mr-1 d_flex align_center justify_start"}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                    }}
                    className={"f-mr--9"}
                  >
                    My claims
                  </div>
                  <FToggle isChecked={myClaims} setIsChecked={setMyClaims} />
                </div>
              )}
            {!userTogglermobile && (
              <>
                <div className="col-8">
                  <img
                    src={ferrumlogo}
                    alt={ferrumlogo}
                    height="30px"
                    width="220px"
                    className="c-mr-36 no-gutter"
                  ></img>
                </div>
                <div
                  className="col-4 d-flex"
                  style={{ justifyContent: "end" }}
                  onClick={() => setOpenToggler(!openToggler)}
                >
                  <img color={"white"} src={Menu} alt="btn" />
                </div>
              </>
            )}
            {userTogglermobile && (
              <div
                className={
                  "wallet_address_card d_flex align_center justify_start"
                }
              >
                {/* <img
                  src={allowedNetwork.logo}
                  style={{ width: 20, height: 20 }}
                /> */}
                <FTypo
                  size={10}
                  width={155}
                  weight={700}
                  color="white"
                  className={"f-pl--2"}
                  truncate={{ truncateLength: 10, truncatePosition: "center" }}
                >
                  {walletAddress}
                </FTypo>
                <div
                  className={
                    "BNB_card d_flex align_center justify_center text_center"
                  }
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {TruncateWithoutRounding(WeiToEther(walletBalance), 3)}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#F3BA2F",
                    }}
                    className={"f-pl--2"}
                  >
                    {allowedNetwork.networkCurrencySymbol}
                  </div>
                </div>
              </div>
            )}
            <Dialog open={!openToggler}>
              <div style={{ backgroundColor: "#111315", borderRadius: "none" }}>
                <DialogTitle>
                  <div className="d-flex">
                    <div
                      className="col-6"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "white",
                      }}
                    >
                      My Account
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{ justifyContent: "end", alignItems: "center" }}
                      onClick={() => setOpenToggler(!openToggler)}
                    >
                      <img src={crossbtn} alt="" />
                    </div>
                  </div>
                </DialogTitle>
                <DialogContent>
                  {currentRoute ===
                    `/user/dashboard/${mainContractAddress}` && (
                    <div className="d-flex">
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "white",
                        }}
                        className="col-6"
                      >
                        My claims
                      </div>
                      <div
                        className="col-6 d-flex"
                        style={{ justifyContent: "end" }}
                      >
                        <FToggle
                          isChecked={myClaims}
                          setIsChecked={setMyClaims}
                        />
                      </div>
                    </div>
                  )}
                  <div style={{ paddingTop: "15px" }}>
                    <div className={"text_center "}>
                      <div className="contractlogo-toggler">
                        {/* <img
                          src={allowedNetwork.logo}
                          style={{ width: 20, height: 20 }}
                        /> */}
                        <FTypo
                          size={12}
                          width={155}
                          weight={700}
                          color="white"
                          className={"f-pl--2"}
                          truncate={{
                            truncateLength: 7,
                            truncatePosition: "center",
                          }}
                        >
                          {walletAddress}
                        </FTypo>
                      </div>
                      <div className={"BNB_card BNB_card-toggle "}>
                        <div color="white">
                          {TruncateWithoutRounding(
                            WeiToEther(walletBalance),
                            3
                          )}
                        </div>
                        <div className="bnbaccount-toggler">BNB</div>
                      </div>
                    </div>
                    <div
                      className="d-flex"
                      style={{
                        justifyContent: "center",
                        paddingTop: "15px",
                        paddingLeft: "5px",
                      }}
                    >
                      <div
                        className="font-size-14 col-7 btn btn-secondary"
                        onClick={() => setShow(true)}
                      >
                        Wallet
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </div>
            </Dialog>
          </>
        )}
        {userTogglermobile && (
          <div
            className="font-size-14 f-ml-1 btn btn-secondary"
            onClick={() => setShow(true)}
          >
            wallet
          </div>
        )}
        <ConnectWalletDialog show={show} setShow={setShow} />
      </FGridItem>
    </FGrid>
  );
};
