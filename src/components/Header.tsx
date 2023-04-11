import React, { useEffect, useLayoutEffect, useState } from "react";
import { FHeader, FButton, FItem, FLayout, FGrid, FGridItem, FTypo } from "ferrum-design-system";
import { RiSwapLine } from "react-icons/ri";
import { useHistory, useLocation } from "react-router";
import { WalletConnector } from "foundry";
import ChibiHeaderLogo from "../assets/img/chibi-header-logo.svg";
import { ConnectWalletDialog } from "../components/connect-wallet/ConnectWalletDialog";
import { FToggle } from "./ferrum-design-system/switch";
import ContractLogo from '../assets/img/contract-logo-header.svg'
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import leftIcon from '../assets/img/back-arrow.svg';
import { Link } from "react-router-dom";
import { TruncateWithoutRounding } from "../utils/global.utils";
import ferrumlogo from "../assets/img/ferrum-logo.svg"
import { smartContractAddress, ferrumNetworkIdentifier, allowedNetwork } from "../utils/const.utils";
import Menu from "../assets/img/Menu.svg"
import crossbtn from "../assets/img/crossbtn.svg"
interface Props {
  myClaims?: boolean;
  setMyClaims?: any;
}
export const Header = ({ myClaims, setMyClaims }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const currentRoute = location.pathname;
  const { isConnected, walletAddress, walletBalance } = useSelector((state: RootState) => state.walletConnector);
  const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
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
      setOpenToggler(true)
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
    var Web3 = require('web3');
    return Web3.utils.fromWei(String(wei), 'ether');
  }
  return (
    <FGrid className={'w-100 bg-pink-header d_flex justify_between align_center header_layout ml_0 mr_0'}>
      <FGridItem alignX="left" size={[4, 4, 4]}>
        <div className="d_flex justify_between align_center w-100">
          {currentRoute === `/user/dashboard/${mainContractAddress}` ?
            <div className={'d_flex justify_start align_center'}>
              <img src={ferrumlogo} alt={ferrumlogo} height="36px" width="289px" className="c-mr-36"></img>
              {userTogglermobile &&
                <FTypo size={16} weight={400} color="white">
                  Dashboard
                </FTypo>
              }
            </div>
            : currentRoute === `/dashboard/${mainContractAddress}` || currentRoute === `/${mainContractAddress}` ?
              <FTypo size={18} weight={700} color="#ffffff">
                Welcome to your Dashboard
              </FTypo>
              : currentRoute === `/vesting/vesting-form/${mainContractAddress}` ?
                <div className="f-mt-2 f-mb-2 d_flex justify_start align_center">
                  <Link to={`/dashboard/${mainContractAddress}?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`}>
                    <div className={'round img_29 bg_white d_flex justify_center align_center f-mr-1'}>
                      <img src={leftIcon} alt={leftIcon} style={{ width: 29, height: 29 }} />
                    </div>
                  </Link>
                  <p className={' custom-font-size-18 font-700'} >
                    Add New Vesting</p>
                </div>
                : currentRoute === `/vesting/vesting-card/${mainContractAddress}` ?
                  <div className="f-mt-2 f-mb-2 d_flex justify_start align_center">
                    <Link to={`/dashboard/${mainContractAddress}?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`}>
                      <div className={'round img_29 bg_white d_flex justify_center align_center f-mr-1'}>
                        <img src={leftIcon} alt={leftIcon} style={{ width: 29, height: 29 }} />
                      </div>
                    </Link>
                    <p className={'custom-font-size-18 font-700'}>View Vesting</p>
                  </div>
                  :
                  null
          }
        </div>
      </FGridItem>
      <FGridItem alignX="end" alignY="center" size={[8, 8, 8]}>
        {isConnected &&
          <>
            {userTogglermobile && currentRoute === `/user/dashboard/${mainContractAddress}` &&
              <div className={'f-mr-1 d_flex align_center justify_start'}>
                <FTypo size={12} weight={700} color="white" className={"f-mr--7"}>
                  My claims
                </FTypo>
                <FToggle isChecked={myClaims} setIsChecked={setMyClaims} />
              </div>
            }
            {!userTogglermobile &&
              <div
                className="toggler-imagemobile"
                onClick={() => setOpenToggler(!openToggler)}
              >
                <img color={'white'}src={Menu} alt="btn"/>
              </div>
            }
            {userTogglermobile &&

              < div className={'wallet_address_card d_flex align_center justify_start'}>
                <img src={allowedNetwork.logo} style={{ width: 20, height: 20 }} />
                <FTypo size={10} width={155} weight={700} color="white" className={"f-pl--2"} truncate={{ truncateLength: 10, truncatePosition: "center" }}>
                  {walletAddress}
                </FTypo>
                <div className={'BNB_card d_flex align_center justify_center text_center'}>
                  <FTypo size={12} weight={700} color="white">
                    {TruncateWithoutRounding(WeiToEther(walletBalance), 3)}
                  </FTypo>
                  <FTypo size={10} weight={700} color="#F3BA2F" className={"f-pl--2"}>
                    {allowedNetwork.networkCurrencySymbol}
                  </FTypo>
                </div>
              </div>
            }
            {!openToggler &&
              <div className={'ml_0 dashboard-toggler'}>
                <div className="myaccount-card">
                  <FTypo size={16} weight={400} color="#ffffff">
                    My Account
                    {/* <img className="cross-btn" src={crossbtn} alt="" /> */}
                  </FTypo>
                  <div onClick={() => setOpenToggler(!openToggler)}>
                    <img className="cross-btn" src={crossbtn} alt="" />
                  </div>
                </div>
                {currentRoute === `/user/dashboard/${mainContractAddress}` &&
                  <div className={'myclaimmobile'}>
                    <FTypo size={16} weight={700} lineHeight={24} color="white" className={"f-mr--7 myclaimtoggler-mobile"}>
                      My claims
                    </FTypo>
                    <FToggle isChecked={myClaims} setIsChecked={setMyClaims} />
                  </div>
                }
                <div className="toggler-data">
                  < div className={'text_center '}>
                    <div className="contractlogo-toggler">
                      <img src={allowedNetwork.logo} style={{ width: 20, height: 20 }} />
                      <FTypo size={12} width={155} weight={700} color="white" className={"f-pl--2"} truncate={{ truncateLength: 7, truncatePosition: "center" }}>
                        {walletAddress}
                      </FTypo>
                    </div>
                    <div className={'BNB_card BNB_card-toggle '}>
                      <div color="white">
                        {TruncateWithoutRounding(WeiToEther(walletBalance), 3)}
                      </div>
                      <div className="bnbaccount-toggler" >
                        BNB
                      </div>
                    </div>
                  </div>
                </div>

                <WalletConnector.WalletConnector
                  WalletConnectView={FButton}
                  WalletConnectModal={ConnectWalletDialog}
                  WalletConnectViewProps={{
                    className: `custom-font-size-14 font-700 connectBtn account-btn ${isConnected ? 'bg_purple' : 'bg_white'}`,
                    variant: "whiteLabeled"
                  }}
                />
              </div>
            }
          </>

        }
        {userTogglermobile &&
          <WalletConnector.WalletConnector
            WalletConnectView={FButton}
            WalletConnectModal={ConnectWalletDialog}
            WalletConnectViewProps={{
              className: `custom-font-size-14 font-700 connectBtn ${isConnected ? 'bg_purple' : 'bg_white'}`,
              variant: "whiteLabeled"
            }}
          />
        }
      </FGridItem>
    </FGrid>
  );
};
