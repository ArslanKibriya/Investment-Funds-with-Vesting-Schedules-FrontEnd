import React, { useEffect, useState } from "react";
import { FGridItem, FList, FListItem } from "ferrum-design-system";
import {  useDispatch, useSelector } from "react-redux";
import {  getAllNetworksAllowedOnVesting } from '../../_apis/vesting'
import { RootState } from "../../redux/rootReducer";
import { ferrumNetworkIdentifier } from "../../utils/const.utils";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
import Web3 from "web3";
import { setWalletAddress, setwalletStatus } from "../../redux/app-contract/appContractActions";
export const ConnectWalletDialogStart = ({
  show,
  onHide,
  metaMaskClickEvent,
  walletConnectClickEvent,
}: any) => {
  const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
  const [networkShow, setNetworkshow] = useState(false)
  const isConnected  =
  useSelector((state: RootState) => state.mainAppContract.walletIsConnected);
  const dispatch = useDispatch();
   async function connectWallet() {
      const web3 = new Web3(window.ethereum);
       try {
           if (!window.ethereum) {
               alert("Please Install the wallet")
           }
           else
               await window.ethereum.enable();
           let accounts = await web3.eth.getAccounts()
           dispatch(
              setWalletAddress(accounts[0])
               
           );
           // chainId = await web3.eth.getChainId()
           let isconnected = await window.ethereum.isConnected();
                   if (isconnected) {
                       dispatch(
                          setwalletStatus(isconnected)
                           
                       );
                       
                   }
       } catch (error) {
           console.log(error);
       }
  } 
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
      </FGridItem>
      <FGridItem
        alignX={"center"}>
        <p className="f-mt-2 f-mb-2 custom-font-size-16 font-400 connect-wallet">Please connect your wallet on <br />{networkShow} network to continue</p>
      </FGridItem>
      <div className="dialog-connect-wallet text-center">
            {/* custom-padding-11 */}
            < FList display="block" type="number" variant="connect-wallet" >
                {/* <p className={'text_left custom-font-size-20 c-mb-24 font-400'}>Select Wallet</p> */}
                <FListItem display="flex" onClick={async () => { await connectWallet() }} className={'whiteLabeledListItem c-mb-50  cursor_pointer'}>
                    <p className={'text_left custom-font-size-24 clr_black_new font-700'}>{ isConnected?"Disconnect": 'MetaMask'}</p>
                    <span className="icon-wrap">
                        <img src={IconMetaMask} alt={IconMetaMask}></img>
                    </span>
                </FListItem>
            </FList >
        </div>
    </div>
  );
};

