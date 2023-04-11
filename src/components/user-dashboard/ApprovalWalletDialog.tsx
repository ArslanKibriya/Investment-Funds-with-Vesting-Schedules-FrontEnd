import React, { useEffect, useLayoutEffect, useState } from "react";
import { FButton, FInputText, FTypo } from "ferrum-design-system";
import { FDialog } from "../ferrum-design-system/Fdialog/Fdialog";
import approvedIcon from '../../assets/img/approved-icon.svg'
import copyIcon from '../../assets/img/icon-copy.svg'
import crossbtn from "../../assets/img/crossbtn.svg"
import { allowedNetwork } from "../../utils/const.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import Web3Helper from "../../web3-client-container/web3Helper";

interface Props {
  transitionStatusDialog: boolean;
  setTransitionStatusDialog: any;
  isProcessing?: boolean;
  isClaiming?: boolean;
  isClaimingStatement?: any;
  isInProgress: boolean;
  transactionId: any;
  isApproved?: boolean;
  onContinueToNextStepClick: any;
  isTransactionSuccessfull?: boolean;
  onContinueTransaction?: any;
  claimedTokenStatement?: any;
  isTokenClaimed?: boolean;
  isToggler?: any;
  isInSafe?: boolean,
  onSubmitSaveTxn?: any,
  txError?: string,
  showWalletTypePrompt?: boolean;
  walletTypeCallback?: any
}

export const ApprovalWalletDialog = ({
  transitionStatusDialog,
  setTransitionStatusDialog,
  isProcessing,
  isClaiming,
  isClaimingStatement,
  isInProgress,
  transactionId,
  isApproved,
  onContinueToNextStepClick,
  isTransactionSuccessfull,
  onContinueTransaction,
  claimedTokenStatement,
  isTokenClaimed,
  isToggler,
  isInSafe,
  onSubmitSaveTxn,
  txError,
  showWalletTypePrompt,
  walletTypeCallback
}: Props) => {
  const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { networkClient, walletAddress, currentWalletNetwork, currentWallet } = useSelector((state: RootState) => state.walletConnector);
  const [approvalCross, setApprovalCross] = useState(false);
  const [txId, setTxid] = useState('')
  const [metamaskSymbol, setMetamaskSymbol] = useState('')
  const hashUrl = () => {
    window.open(`${allowedNetwork.blockExplorerUrl}/tx/${transactionId}`);
    console.log(transactionId, "hello world");
  }
  useEffect(() => {
    checkMetamaskSymbol()
    if (windowDimension.width < 768) {
      setApprovalCross(false);
    } else {
      setApprovalCross(true);
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
  async function checkMetamaskSymbol() {
    try {
        
        const web3Helper = new Web3Helper(networkClient as any);
        let response;
        response = await web3Helper.symbolMethod(mainContractAddress);
        if(!!response){
        setMetamaskSymbol(response)
        }
    } catch (e) {
        console.log(e)
    }
}
 
async function tokenMetaMASK() {

    const tokenAddress = mainContractAddress;
    const tokenSymbol = metamaskSymbol;
    const tokenDecimals = 18;
try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
  }
  console.log(showWalletTypePrompt, isClaiming, isInProgress, 'isInProgressisInProgress123445')
  return (
    <FDialog
      show={transitionStatusDialog}
      size="medium"
      showClose={true}
      variant={'new-purple-popup'}
      className="dialog-connect-wallet text-center"
    >
    <>
      <div className="f-pb-2">
        <FTypo size={24} weight={700} color="white">
          {isProcessing  && !isInSafe ?
            <>
              <div className={'d_flex justify_center align_center f-mb-2 f-mt-2'}>
                <div className="loader"></div>
              </div>
              <div className="processing-admin">
                Your request is processing. < br />
                Please wait!
              </div>
            </>
            : (isProcessing && isInSafe) || (isClaiming && isInSafe) ?
            <>
              <div className={'d_flex justify_center align_center f-mb-2 f-mt-2 transactionbox-mobile safecodebox'}>
                {/* <ClipLoader color="#fff" size={70} speedMultiplier={0.6} /> */}
                Transaction sent to safe for confirmation, Please confirm from safe and enter executed transaction
                input below.
              </div>
              <FInputText
                  variant="whiteLabeled"
                  className={'safecodeboxtransaction'}
                  // label="Vesting Description"
                  name="txIs"
                  placeholder="Transaction ID"
                  value={txId}
                  onChange={((e: any) => { setTxid(e.target.value) })}
              />
              <div className={'f-mt--10 transaction-box-action-container justify_center align_center safecodeboxsubmit'}>
                <FButton
                  variant={'whiteLabeled'}
                  className={``}
                  style={{ width: '201px', height: '40px' }}
                  title={`Submit`}
                  onClick={() => onSubmitSaveTxn(txId)}
                />
                <p></p>
                { txError && <p className="transaction-box-error">{txError}</p> }
              </div>
            </>   
        : showWalletTypePrompt ?
          <>
            <span className="qrtransactiontext-mobile qrcodebox">What type of wallet are you using?.</span>
            <div className={'f-mt--5 d_flex transaction-box-action-container justify_center align_center'}>
              <FButton
                variant={'whiteLabeled'}
                className={`walletPromptBtn`}
                style={{ width: '201px', height: '40px' }}
                title={`I am using a safe`}
                onClick={() => walletTypeCallback(true)}
              />
              <p></p>
            </div>
            <div className={'f-mt--5 d_flex transaction-box-action-container justify_center align_center'}>
              <FButton
                variant={'whiteLabeled'}
                className={`walletPromptBtn`}
                style={{ width: '201px', height: '40px' }}
                title={`I am using other wallets`}
                onClick={() => walletTypeCallback(false)}
              />
              <p></p>
            </div>
          </>
            : isClaiming ?
              <>
                <div className={'d_flex justify_center align_center f-mb-2 f-mt-2 claiming-mobile'}>
                  <div className="loader"></div>
                </div>
                <span className="claimingtext-mobile claiming-text">
                  {isClaimingStatement}. < br />
                  Please wait!
                </span>
              </>
              : isInProgress ? 
                <>
                  <div className={'d_flex justify_center align_center f-mb-2 f-mt-2 transactionbox-mobile'}>
                    {/* <ClipLoader color="#fff" size={70} speedMultiplier={0.6} /> */}
                    <div className="loader"></div>
                  </div>
                  <span className="transactiontext-mobile" color="#C69749">Transaction in Progress.</span>
                  <FTypo size={16} weight={700} color="white" className={'f-mt-1 processingId-mobile'}>
                    Transaction ID
                  </FTypo>
                  <div className={'f-mt--5 d_flex justify_center align_center '}>
                    <FTypo className=" transactionprocessing transactionidprocessing-mobile" truncate={{ truncateLength: 10, truncatePosition: "center" }}>
                      {transactionId}
                    </FTypo>
                    <img className={'cursor_pointer copyprocessing-desktop copyprocessing-mobile'} src={copyIcon} alt={copyIcon} title="copy" onClick={() => { navigator.clipboard.writeText(transactionId); }} />
                  </div>
                </>
                : isApproved && !isTransactionSuccessfull ?
                  <>
                    <div className={'d_flex justify_center align_center f-mb-2 f-mt-2'}>
                      <img src={approvedIcon} alt={approvedIcon} />
                    </div>
                    <FTypo size={22} weight={700} color="white">
                      Approved
                    </FTypo>
                    <div className={'d_flex justify_center align_center f-mt-2'}>
                      <FButton
                        className={`custom-font-size-14 font-700 connectBtn border-radius-8`}
                        onClick={() => {
                          setTransitionStatusDialog(false);
                          onContinueToNextStepClick();
                        }}
                        title={'Continue'} />
                    </div>
                  </>
                  : isTransactionSuccessfull ?
                    <>
                      <div className={'d_flex justify_center align_center f-mb-2 f-mt-2'}>
                        <img src={approvedIcon} alt={approvedIcon} />
                      </div>
                      <FTypo size={24} weight={700} color="#C69749">
                        Successfully
                      </FTypo>
                      <FTypo size={18} weight={700} color="white" className={'f-mt-1'}>
                        You created a new vesting.
                      </FTypo>
                      <FTypo size={16} weight={400} color="white" className={'f-mt-2'}>
                        Transaction ID
                      </FTypo>
                      <div className={'f-mt--5 d_flex justify_center align_center transaction transaction-success'} onClick={hashUrl}>
                        <FTypo size={16} weight={400} color="white" truncate={{ truncateLength: 15, truncatePosition: "center" }}>
                          {transactionId}
                        </FTypo>
                        <button className="copy-btn-color"> <img className={'cursor_pointer'} src={copyIcon} alt={copyIcon} title="copy" onClick={() => { navigator.clipboard.writeText(transactionId); }} /></button>
                      </div>

                      <div className={'d_flex justify_center align_center f-mt-2'}>
                        <FButton
                          className={`custom-font-size-14 font-700 connectBtn setupBtn bg_white border-radius-8 f-mt--1 f-ml-2 f-mr-2 cursor_pointer`}

                          onClick={() => {
                            setTransitionStatusDialog(false);
                            onContinueTransaction();
                          }}
                          title={'Set up another pool'} />
                        <FButton
                          className={`custom-font-size-14 font-700 connectBtn gotodashboard border-radius-8 cursor_pointer`}
                          onClick={() => {
                            setTransitionStatusDialog(false);
                            onContinueToNextStepClick();
                          }}
                          title={'Go to Dashboard'} />
                      </div>
                    </>
                    : isTokenClaimed ?
                      <> <div className="successfuldialog-mobile">
                        {!approvalCross &&
                          <div onClick={() => {
                            setTransitionStatusDialog(false)
                          }} >
                            <img className="crosssuccesfull-btn" src={crossbtn} alt="" />
                          </div>
                        }
                        <div className={'d_flex justify_center align_center f-mb-2 f-mt-2 '}>
                          <img className={'logomobile-s'} src={approvedIcon} alt={approvedIcon} />
                        </div>
                        <FTypo size={24} weight={700} color="#C69749" className="successfull-mobile">
                          Successfully
                        </FTypo>
                        <FTypo size={18} weight={700} color="white" className={'f-mt-1 claimstatement-mobile'}>
                          {claimedTokenStatement}
                        </FTypo>
                        <FTypo size={20} weight={400} color="white" className={'f-mt-2 transaction-mobile'}>
                          Transaction ID
                        </FTypo>
                        <FTypo className="d_flex align_center" size={16} >
                          <div className={'f-mt--5 d_flex justify_center align_center'} onClick={hashUrl}>
                            <FTypo  className="transaction transactionid-mobile" truncate={{ truncateLength: 10, truncatePosition: "center" }}>
                              {transactionId}
                            </FTypo>
                          </div>
                          <FTypo className="copy-btn-color copy-mobile">
                            <img className={'cursor_pointer copy-desktop '} src={copyIcon} alt={copyIcon} title="copy" onClick={() => { navigator.clipboard.writeText(transactionId); }} />
                          </FTypo>
                        </FTypo>
                        <div className={'d_flex justify_center align_center f-mt-2 successfullybtn-mobile'}>
                          <FButton
                            className={`custom-font-size-14 font-700 connectBtn border-radius-8 f-ml-2 f-mt--3 continuebtn-mobile `}
                            onClick={() => {
                              setTransitionStatusDialog(false);
                              onContinueToNextStepClick();
                            }}
                            title={'Continue'} />
                          <FButton
                            className={`ustom-font-size-14 font-700 connectBtn border-radius-8 addmetabtn Addmetabtn-mobile`}
                            onClick={() => {
                              setTransitionStatusDialog(false);
                              onContinueToNextStepClick(false);
                              tokenMetaMASK();
                            }}
                            title={'Add to Metamask'} />
                        </div>
                        </div>
                      </>

                      :
                      null
          }
        </FTypo>
      </div>
      </>
    </FDialog>
  );
};
