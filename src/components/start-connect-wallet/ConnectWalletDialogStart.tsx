import React, { useEffect, useState } from "react";
import { FDialog, FGridItem } from "ferrum-design-system";
import { WalletConnector } from "foundry";
import { ConnectWalletDialog } from "../connect-wallet/ConnectWalletDialog";
import { FButton } from "../ferrum-design-system/Fbutton/Fbutton";
import chibiLogo from '../../assets/img/chibidinos-logo.svg'
import { connectWallet } from "foundry/dist/container-components/wallet-connector/redux/walletConnectorActions";
import { connect, useSelector } from "react-redux";
import { ConnectWalletList } from "../connect-wallet/ConnectList";
import { signInUser, getAllNetworksAllowedOnVesting } from '../../_apis/vesting'
import { RootState } from "../../redux/rootReducer";
import ferrumlogo from "../../assets/img/ferrum-logo.svg";
import { ferrumNetworkIdentifier } from "../../utils/const.utils";

export const ConnectWalletDialogStart = ({
  show,
  onHide,
  metaMaskClickEvent,
  walletConnectClickEvent,
}: any) => {
  const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
  const [networkShow, setNetworkshow] = useState(false)

  useEffect(() => {

    getAllNetworksAllowedOnVesting(ferrumNetworkIdentifier, 0, 10)
      .then((response: any) => {
        console.log('networks reponse:', response)
        if (response && response.data && response.data.body && response.data.body.networks && response.data.body.networks.length > 0) {
          let network = response.data.body.networks[0];
          if (network && network.name) {
            // console.log('networks response:', network.name)
            setNetworkshow(network.name);
            console.log(networkShow)
          }
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.data && error.response.data.status && error.response.data.status.message) {
          console.log(error.response.data.status.message);
        }
      });

  }, [])
  return (
    <div>
      <FGridItem
        alignX={"center"}
        alignY={"center"}
        className={"f-mt-2"}
      >
        <img src={ferrumlogo} alt={ferrumlogo} height="36px" width="289px"></img>
      </FGridItem>
      <FGridItem
        alignX={"center"}>
        <p className="f-mt-2 f-mb-2 custom-font-size-16 font-400 connect-wallet">Please connect your wallet on <br />{networkShow} network to continue</p>
      </FGridItem>
      <WalletConnector.WalletConnector
        WalletConnectView={FButton}
        WalletConnectModal={ConnectWalletList}
        WalletConnectViewProps={{
          className: "mt-3 w-100 f-mb-4 custom-font-size-14 font-700 connect-button-hide",//hide the connect btn
          variant: "whiteLabeled"
        }}
      />
    </div>
  );
};
function check(check: any) {
  throw new Error("Function not implemented.");
}

