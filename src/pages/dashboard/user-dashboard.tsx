import { FGrid, FGridItem } from "ferrum-design-system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { Pagination } from "../../components/pagination";
import { ApprovalWalletDialog } from "../../components/user-dashboard/ApprovalWalletDialog";
import DashboardCards from "../../components/user-dashboard/user-dashboard-card";
import PrivateRoundCard from "../../components/user-dashboard/vesting-option-cards/private-round";
import SeedRoundCard from "../../components/user-dashboard/vesting-option-cards/seed-round";
import StrategicRoundCard from "../../components/user-dashboard/vesting-option-cards/strategic-round";
import { RootState } from "../../redux/rootReducer";
import { Web3Helper } from "../../web3-client-container/web3Helper";
import { getAllUserPools } from "../../_apis/vesting";
import { smartContractAddress, ferrumNetworkIdentifier } from "../../utils/const.utils";
interface Props {
  myClaims: boolean;
}
const UserDashboard = ({ myClaims }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
  const tokenAddress: any = location.pathname.split("/").pop();
  const { networkClient, currentWalletNetwork, currentWallet } = useSelector((state: RootState) => state.walletConnector);
  const walletAddress  =
  useSelector((state: RootState) => state.mainAppContract.accountWalletAddress);
  const isConnected  =
    useSelector((state: RootState) => state.mainAppContract.walletIsConnected);
  const [poolData, setPoolData] = useState<any>();
  const [offSet, setOffSet] = useState(0);
  const [dataLimit, setDataLimit] = useState(9);
  //for transition dialog
  const [transitionWalletDialog, setTransitionWalletDialog] = useState(false);
  const [isClaiming, setIsClaiming] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [tokenClaimed, setTokenClaimed] = useState('');
  // wallet connect
  const [claimType, setClaimType] = useState('');
  const [isTxInSafe, setTxIsInSafe] = useState(false);
  const [txErrorMsg, setTxErrorMsg] = useState<any>('');
  const [showWalletTypePrompt, setShowWalletTypePrompt] = useState(false);
  const [poolUseIds, setPoolUseId] = useState(false);
  //
  async function claimCliffToken(poolUseId: any, setIsSafeTx: any, isSafe: any) {
    if (networkClient && poolUseId) {
      setTokenClaimed('cliff');
      setTransitionWalletDialog(true); //transaction popup will open
      !isSafe && setIsClaiming(true);
      let response;
      const web3Helper = new Web3Helper(networkClient as any);
      response = await web3Helper.claimCliffTokens(
        poolUseId, walletAddress, setTransactionId, setTransitionWalletDialog,
        setIsClaiming, setIsInProgress, currentWallet, isSafe, setIsSafeTx);
      if (!!response) {
        setIsInProgress(false);
        setIsApproved(true);
      }

    }
  }
  const handleShowWalletPrompt = (id: any, callback: any, type: 'cliff' | 'non-cliff' | 'vesting') => {
    if (currentWallet === 2) {
      setTransitionWalletDialog(true); //transaction popup will open
      setShowWalletTypePrompt(true);
    }
    setClaimType(type)
    setPoolUseId(id)
  }

  const handleSubmit = async (tx: string) => {
    const txId = (tx||'').replace(/\s+/g, '')
    setTransactionId(txId);
    setIsClaiming(false);
    setTxIsInSafe(false)
    const web3Helper = new Web3Helper(networkClient as any);
    await web3Helper.checkTransaction(
        txId,
        (response: any) => {
          setIsInProgress(true)
          setTimeout(() => {
            setIsInProgress(false);
            setIsApproved(true);
          }, 2000)
         
        },
        () => {
            setTransitionWalletDialog(false); //transaction popup will close
            setIsInProgress(false);
        },
        (msg: string) => {
            setIsClaiming(true);
            setTxIsInSafe(true)
            setTxErrorMsg(msg)
        }
    )
  }

  async function claimNonCliffToken(poolUseId: any, setIsSafeTx: any, isSafe: any) {
    if (networkClient && poolUseId) {
      setTokenClaimed('non cliff');
      setTransitionWalletDialog(true); //transaction popup will open
      !isSafe && setIsClaiming(true);
      let response;
      const web3Helper = new Web3Helper(networkClient as any);
      response = await web3Helper.claimNonCliffTokens(poolUseId, walletAddress, setTransactionId,
        setTransitionWalletDialog, setIsClaiming, setIsInProgress, currentWallet, isSafe, setIsSafeTx
      );
      if (!!response) {
        setIsInProgress(false);
        setIsApproved(true);
      }
    }
  }
  async function claimVestingToken(poolUseId: any, setIsSafeTx: any, isSafe: any) {
    if (networkClient && poolUseId) {
      setTransitionWalletDialog(true); //transaction popup will open
      !isSafe && setIsClaiming(true);
      let response;
      const web3Helper = new Web3Helper(networkClient as any);
      response = await web3Helper.claimVestingTokens(poolUseId, walletAddress, setTransactionId,
        setTransitionWalletDialog, setIsClaiming, setIsInProgress, isSafe, setIsSafeTx);
      if (!!response) {
        setIsInProgress(false);
        setIsApproved(true);
      }
    }
  }
  const handleSafeOption = (isSafe: boolean) => {
    setShowWalletTypePrompt(false);
    const callback =  claimType === 'vesting' ?
      (safe: boolean) => claimVestingToken(poolUseIds, setTxIsInSafe, safe)
      : claimType === 'cliff' ?
        (safe: boolean) => claimCliffToken(poolUseIds, setTxIsInSafe, safe)
      : (safe: boolean) => claimNonCliffToken(poolUseIds, setTxIsInSafe, safe)

    if (isSafe) {
      setIsInProgress(false);
      callback(true);
      return
    }
    callback(false);
    return
  }
  useEffect(() => {
    getAllUserPools('completed', '', 'FRM', `${myClaims ? walletAddress : ''}`, tokenAddress, offSet, dataLimit)
      .then((response: any) => {
        setPoolData(response.data.body.pools);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [offSet]);

  function onContinueToNextStepClick() {
    history.push({
      pathname: `/user/dashboard/${mainContractAddress}`,
      search: `?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`
    });
  }
  return (
    <>
      {/* <DashboardCards /> */}
      <div className={'f-mt-1 f-mb-5'}>
        <p className={'custom-font-size-20 font-400 text_left f-mb-2 clr_white'}>Vesting Options</p>
        <FGrid>
          {poolData && poolData.map((pool: any, index: any) => {
            return (
              // <Switch>
              // <Route>
              <FGridItem size={[4, 4, 4]} className={'f-mt-1'}>
                <SeedRoundCard isConnected={isConnected} pool={pool} claimCliffToken={claimCliffToken} claimNonCliffToken={claimNonCliffToken} claimVestingToken={claimVestingToken} showPrompt={handleShowWalletPrompt}/>
              </FGridItem>
              // </Route>
              // </Switch>
            );
          })
          }
        </FGrid>
        {poolData && poolData.length > 0 &&
          <FGrid className={'f-mt-1 f-mb-1'}>
            <FGridItem size={[4, 4, 4]} >
            </FGridItem>
            <FGridItem size={[4, 4, 4]} >
            </FGridItem>
            <FGridItem size={[4, 4, 4]} alignX={'end'}>
              <Pagination offSet={offSet} setOffSet={setOffSet} dataLimit={dataLimit} dataLength={poolData.length} isTable={false} />
            </FGridItem>
          </FGrid>
        }
        <ApprovalWalletDialog
          transitionStatusDialog={transitionWalletDialog}
          setTransitionStatusDialog={setTransitionWalletDialog}
          isClaiming={isClaiming}
          isClaimingStatement={`To claim your vested tokens please continue to the prompts in the connected wallet.`}
          isInProgress={isInProgress}
          transactionId={transactionId}
          isTokenClaimed={isApproved}
          onContinueToNextStepClick={() => onContinueToNextStepClick()}
          claimedTokenStatement={`You have claimed ${tokenClaimed} tokens.`}
          isInSafe={isTxInSafe}
          onSubmitSaveTxn={(tx: string)=> handleSubmit(tx)}
          txError={txErrorMsg}
          showWalletTypePrompt={showWalletTypePrompt}
          walletTypeCallback={(isSafe: boolean) => handleSafeOption(isSafe)}
        />
      </div>
    </>
  );
};

export default UserDashboard;
