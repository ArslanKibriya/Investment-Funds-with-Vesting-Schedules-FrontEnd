import { FButton, FCard, FGrid, FGridItem, FItem, FTypo } from 'ferrum-design-system'
import { WalletConnector } from 'foundry';
import React, { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { Web3Helper } from '../../../web3-client-container/web3Helper';
import { ConnectWalletDialog } from '../../connect-wallet/ConnectWalletDialog';
import toast, { Toaster } from "react-hot-toast";
import upIcon from '../../../assets/img/upIcon.svg'
import DownIcon from '../../../assets/img/DownIcon.svg'


interface Props {
    isConnected: any;
    pool: any;
    claimCliffToken: any;
    claimNonCliffToken: any;
    claimVestingToken: any;
    showPrompt: any;

}
const SeedRoundCard = ({ isConnected, pool, claimCliffToken, claimNonCliffToken, claimVestingToken, showPrompt }: Props) => {
    pool.totalAllocation = 0;
    pool.totalClaimable = 0;
    pool.totalClaimed = 0;
    const { networkClient, currentWallet } = useSelector((state: RootState) => state.walletConnector);
    const walletAddress  =
    useSelector((state: RootState) => state.mainAppContract.accountWalletAddress);
    var poolObject = { 'pool': pool, 'cliffClaimable': 0, 'nonCliffClaimable': 0, 'vestingClaimable': 0, 'cliffAllocation': 0, 'nonCliffAllocation': 0, 'vestingAllocation': 0, 'cliffClaimed': 0, 'nonCliffClaimed': 0, 'vestingClaimed': 0, 'totalClaimed': 0, 'totalAllocation': 0, 'totalClaimable': 0 }
    const [poolDataLoaded, setPoolDataLoaded] = useState<any>(pool);
    const [checkVest, setCheckVest] = useState(false)
    const [show, setShow] = useState(false)
    // show cliff button if cliff token available otherwise simple noncliff button
    const [showCliffButton, setShowCliffButton] = useState(0)
    let simpleClaimableResponse;
    useEffect(() => {
        contractAddressMethods(pool);
        const interval = setInterval(() => {
            contractAddressMethods(pool);
            
        }, pool.pool ? 20000 : 20000);
        return () => clearInterval(interval);
    }, [])

    function WeiToEther(wei: any) {
        var Web3 = require('web3');
        return Web3.utils.fromWei(String(wei), 'ether');

    }
    // async function CHECK() {
    //     response = await web3Helper.addCliffVesting(titleRound, vestingDateEpoch, tokenAddress, cliffPeriodEpoch, cliffPercentage, cliffVestingDateEpoch, userAddresses, userAllocations, signature, salt, walletAddress, setIsProcessing, setIsInProgress, setTransactionId, poolIdFromCreatePool, userAuthToken, setTransitionWalletDialog);
    // }
    async function contractAddressMethods(pool: any) {

        if (networkClient && pool) {
            const web3Helper = new Web3Helper(networkClient as any);           
            if (pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp) {
                let cliffClaimableResponse;
                console.log(pool.poolId, walletAddress)
                cliffClaimableResponse = await web3Helper.cliffClaimable(pool.poolId, walletAddress);
                console.log('cliffcliffClaimableResponsecliffClaimableResponseclaimablerespomse', cliffClaimableResponse)
                if (!!cliffClaimableResponse) {
                    console.log('cliffClaimableResponse', cliffClaimableResponse)
                    poolObject.cliffClaimable = cliffClaimableResponse? WeiToEther(cliffClaimableResponse) : 0;
                }
                let nonCliffClaimableResponse;
                nonCliffClaimableResponse = await web3Helper.nonCliffClaimable(pool.poolId, walletAddress);
                if (!!nonCliffClaimableResponse) {
                    console.log('nonCliffClaimableResponse', nonCliffClaimableResponse)
                    poolObject.nonCliffClaimable = nonCliffClaimableResponse? WeiToEther(nonCliffClaimableResponse) : 0;
                }
                let cliffInfoResponse;
                cliffInfoResponse = await web3Helper.userCliffInfo(pool.poolId, walletAddress);
                if (!!cliffInfoResponse) {
                    poolObject.cliffAllocation = cliffInfoResponse.cliffAlloc ? WeiToEther(cliffInfoResponse.cliffAlloc) : 0;
                    poolObject.cliffClaimed = cliffInfoResponse.claimedAmnt ? WeiToEther(cliffInfoResponse.claimedAmnt) : 0;
                }
                let nonCliffInfoResponse;
                nonCliffInfoResponse = await web3Helper.userNonCliffInfo(pool.poolId, walletAddress);
                if (!!nonCliffInfoResponse) {
                    poolObject.nonCliffAllocation = nonCliffInfoResponse.nonCliffAlloc ? WeiToEther(nonCliffInfoResponse.nonCliffAlloc) : 0;
                    poolObject.nonCliffClaimed = nonCliffInfoResponse.claimedAmnt ? WeiToEther(nonCliffInfoResponse.claimedAmnt) : 0;
                    poolObject.totalClaimed = Number(poolObject.nonCliffClaimed) + Number(poolObject.cliffClaimed);
                    poolObject.totalAllocation = Number(poolObject.nonCliffAllocation) + Number(poolObject.cliffAllocation);
                    poolObject.totalClaimable = Number(poolObject.cliffClaimable) + Number(poolObject.nonCliffClaimable);
                    setPoolDataLoaded(poolObject);
                    setShowCliffButton(Number(poolObject.cliffClaimable))
                }


            } else {
                //for simple vesting

                simpleClaimableResponse = await web3Helper.simpleClaimable(pool.poolId, walletAddress);
                if (!!simpleClaimableResponse) {
                    poolObject.vestingClaimable = simpleClaimableResponse[0] ? WeiToEther(simpleClaimableResponse[0]) : 0;
                    poolObject.totalClaimable = simpleClaimableResponse ? WeiToEther(simpleClaimableResponse) : 0;
                }
                let vestingInfoResponse;
                vestingInfoResponse = await web3Helper.userSimpleInfo(pool.poolId, walletAddress);
                if (!!vestingInfoResponse) {
                    poolObject.vestingAllocation = vestingInfoResponse.allocation ? WeiToEther(vestingInfoResponse.allocation) : 0;
                    poolObject.vestingClaimed = vestingInfoResponse.claimedAmount ? WeiToEther(vestingInfoResponse.claimedAmount) : 0;
                    poolObject.totalClaimed = vestingInfoResponse.claimedAmount ? WeiToEther(vestingInfoResponse.claimedAmount) : 0;
                    poolObject.totalAllocation = vestingInfoResponse.allocation ? WeiToEther(vestingInfoResponse.allocation) : 0;
                    setPoolDataLoaded(poolObject);
                }
            }
        }
    }
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='ml-0 vesting-option-card '>
                {pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp &&
                    <> <FTypo className='d_flex'>
                        <FTypo size={20} weight={400} color="#DAB46E" className={"f-pb-1"}>
                            {pool.name}
                        </FTypo>
                        <div onClick={() => setShow(!show)}>
                            {!show &&
                                <img className='img-btn-cliffwrapper' src={DownIcon} alt={DownIcon} style={{ width: 29, height: 29 }} />
                            }
                            {show &&
                                <img className='img-btn-cliffwrapper' src={upIcon} alt={upIcon} style={{ width: 29, height: 29 }} />
                            }
                        </div>
                    </FTypo></>
                }
                {pool.cliffPeriodTimestamp == pool.cliffVestingTimestamp &&
                    <FTypo size={20} weight={400} color="#DAB46E" className={"f-pb-1"}>
                        {pool.name}
                    </FTypo>
                }
                <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6]} alignX="left">

                        <><FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m"}>
                            Total Allocation
                        </FTypo><FTypo size={19} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                {Number(poolDataLoaded.totalAllocation).toFixed(3)}
                                <FTypo size={11} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                    TOKEN
                                </FTypo>
                            </FTypo></>

                    </FGridItem>
                    <FGridItem size={[6, 6]} alignX="left">
                        <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m gapmar-m"}>
                            Total Claimable
                        </FTypo>
                        <FTypo size={19} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                            {Number(poolDataLoaded.totalClaimable).toFixed(3)}
                            <FTypo size={11} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid>
                <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6]} alignX="left">
                        <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m"}>
                            Total Claimed
                        </FTypo>
                        <FTypo size={19} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                            {Number(poolDataLoaded.totalClaimed).toFixed(3)}
                            <FTypo size={11} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6]} alignX="left">
                        <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--8 headingpool-m gapmar-m"}>
                            Network
                        </FTypo>
                        <div className={'white-small-box gapmardata-m'}>
                            <span className={'custom-font-size-14 font-400'}>{pool.network.networkShortName}</span>
                        </div >
                    </FGridItem>
                </FGrid>
                <div>
                    <FTypo size={13} weight={400} color="#6F767E" className={"f-mt-2 headingpool-m"}>
                        Vesting
                    </FTypo>
                    <FTypo size={12} weight={400} color="#FFFFFF" className={"f-mt--8 gapmardata-m"}>
                        {pool.description}
                    </FTypo>
                </div>
                {
                    show && pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp &&
                    <><h1 className='vestingdetails-cliff f-mt-2 '>Vesting Details
                    </h1>
                        <FGrid className={' f-mt-1'}>
                            <FGridItem size={[6, 6, 6]} alignX="left">
                                <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m"}>
                                    Cliff Allocation
                                </FTypo>
                                <FTypo size={19} weight={600} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                    {Number(poolDataLoaded.cliffAllocation).toFixed(3)}
                                    <FTypo size={11} weight={400} color="#FFFFFF" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                            <FGridItem size={[6, 6, 6]} alignX="left">
                                <FTypo size={12} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m gapmar-m"}>
                                    Non Cliff Allocation
                                </FTypo>
                                <FTypo size={19} weight={600} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                    {Number(poolDataLoaded.nonCliffAllocation).toFixed(3)}
                                    <FTypo size={11} weight={400} color="#FFFFFF" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                        <FGrid className={'f-mt-2'}>
                            <FGridItem size={[6, 6, 6]} alignX="left">
                                <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m"}>
                                    Cliff Claimable
                                </FTypo>
                                <FTypo size={19} weight={600} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                    {Number(poolDataLoaded.cliffClaimable).toFixed(3)}
                                    <FTypo size={11} weight={400} color="#FFFFFF" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                            <FGridItem size={[6, 6, 6]} alignX="left">
                                <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m gapmar-m"}>
                                    Non Cliff Claimable
                                </FTypo>
                                <FTypo size={19} weight={600} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                    {Number(poolDataLoaded.nonCliffClaimable).toFixed(3)}
                                    <FTypo size={11} weight={400} color="#FFFFFF" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                        <FGrid className={'f-mt-2'}>
                            <FGridItem size={[6, 6, 6]} alignX="left">
                                <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m"}>
                                    Cliff Claimed
                                </FTypo>
                                <FTypo size={19} weight={600} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                    {Number(poolDataLoaded.cliffClaimed).toFixed(3)}
                                    <FTypo size={11} weight={400} color="#FFFFFF" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                            <FGridItem size={[6, 6, 6]} alignX="left">
                                <FTypo size={13} weight={400} color="#6F767E" className={"f-pb--2 headingpool-m gapmar-m"}>
                                    Non Cliff Claimed
                                </FTypo>
                                <FTypo size={19} weight={600} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5 gapmardata-m">
                                    {Number(poolDataLoaded.nonCliffClaimed).toFixed(3)}
                                    <FTypo size={11} weight={400} color="#FFFFFF" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                    </>

                }
                <div>
                    {isConnected ?
                        <> {pool.cliffPercentage != 0 &&
                            <FGrid className={'cliffvesting-btn'}>
                                <FGridItem size={[6, 6]}>
                                    <div className='cliffbtn justify_center align_center f-mt-1'>
                                        {pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp &&
                                            <FButton
                                                className={`custom-font-size-14 font-700 border-radius-8 connectBtn cliffbtn`}
                                                onClick={() => {
                                                    if(Number(poolDataLoaded.cliffAllocation) === Number(poolDataLoaded.cliffClaimed) && Number(poolDataLoaded.cliffAllocation) != 0 ){
                                                        toast.error('You already claimed your Cliff Token.');
                                                        return
                                                    }
                                                    if(Number(poolDataLoaded.cliffAllocation) == 0){
                                                        toast.error('You dont have cliff claimable token.');
                                                        return
                                                    }
                                                    if (Number(poolDataLoaded.cliffClaimable) !== 0) {
                                                        if(currentWallet === 2) {
                                                            showPrompt(pool.poolId, () => claimCliffToken(pool.poolId), 'cliff')
                                                        }else {
                                                            showPrompt(claimCliffToken(pool.poolId), 'cliff');
                                                        }
                                                    } else {
                                                        toast.error('Your claiming time is not reached yet.');
                                                    }
                                                }}
                                                title={'Claim Cliff'} />}

                                    </div>
                                </FGridItem>
                                <FGridItem size={[6, 6]}>
                                    <div className='cliffbtn justify_center align_center f-mt-1 '>
                                        {pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp &&
                                            <FButton
                                                className={`custom-font-size-13 font-700 border-radius-8 connectBtn cliffbtn cliffbtn-bg`}
                                                onClick={() => {
                                                    if(Number(poolDataLoaded.nonCliffAllocation) === Number(poolDataLoaded.nonCliffClaimed) && Number(poolDataLoaded.nonCliffAllocation) != 0){
                                                        toast.error('You already claimed your Non Cliff Token.');
                                                        return
                                                    }
                                                    if(Number(poolDataLoaded.nonCliffAllocation) == 0){
                                                        toast.error('You dont have non cliff claimable token.');
                                                        return
                                                    }
                                                    if (Number(poolDataLoaded.nonCliffClaimable) !== 0) {
                                                        if(currentWallet === 2) {
                                                            showPrompt(pool.poolId, () => claimNonCliffToken(pool.poolId), 'non-cliff')
                                                        }else {
                                                            showPrompt(claimNonCliffToken(pool.poolId), 'non-cliff');
                                                        }
                                                    } else {
                                                        toast.error('Your claiming time is not reached yet.');
                                                    }
                                                }}
                                                title={'Claim Non Cliff'} />}
                                    </div>
                                </FGridItem>
                            </FGrid>
                        }
                            {pool.cliffPercentage == 0 &&
                                <div className='simpletoken-width f-mt-1'>
                                    {pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp &&
                                        <FButton
                                            className={`custom-font-size-14 font-700 border-radius-8 connectBtn clifftokenbtn`}
                                            onClick={() => {
                                                if(Number(poolDataLoaded.nonCliffAllocation) === Number(poolDataLoaded.nonCliffClaimed) && Number(poolDataLoaded.nonCliffAllocation) != 0 ){
                                                    toast.error('You already claimed your Non Cliff Token.');
                                                    return
                                                }
                                                if(Number(poolDataLoaded.nonCliffAllocation) == 0){
                                                    toast.error('You dont have non cliff claimable token.');
                                                    return
                                                }

                                                if (Number(poolDataLoaded.nonCliffClaimable) !== 0) {
                                                    if(currentWallet === 2) {
                                                        showPrompt(pool.poolId, () => claimNonCliffToken(pool.poolId), 'non-cliff')
                                                    }else {
                                                        showPrompt(claimNonCliffToken(pool.poolId));
                                                    }
                                                } else {
                                                    toast.error('Your claiming time is not reached yet.');
                                                }
                                            }}
                                            title={'Claim Non Cliff'} />}
                                </div>
                            }
                            <div className='simpletoken-width f-mt-1'>
                                {pool.cliffPeriodTimestamp == pool.cliffVestingTimestamp &&
                                    <FButton
                                        className={`custom-font-size-14 font-700 border-radius-8 connectBtn simpletoken-width`}
                                        onClick={() => {
                                            if(Number(poolDataLoaded.vestingAllocation) === Number(poolDataLoaded.vestingClaimed) && Number(poolDataLoaded.vestingAllocation) != 0){               
                                                toast.error('You already claimed your Token.');
                                                return
                                            } 
                                            if(Number(poolDataLoaded.vestingAllocation) == 0){
                                                toast.error('You dont have vesting claimable token.');
                                                return
                                            }
                                            if (Number(poolDataLoaded.vestingClaimable) !== 0) {
                                                if(currentWallet === 2) {
                                                    showPrompt(pool.poolId, () => claimVestingToken(pool.poolId), 'vesting')
                                                }else {
                                                    showPrompt(claimVestingToken(pool.poolId), 'vesting')
                                                }
                                                return
                                            } else {
                                                toast.error('Your claiming time is not reached yet.');
                                                
                                            }
                                        }}
                                        title={'Claim Token'} />}
                            </div></>

                        :
                        <div className='d_flex justify_end align_center w-100 f-mt-2'>
                            <WalletConnector.WalletConnector
                                WalletConnectView={FButton}
                                WalletConnectModal={ConnectWalletDialog}
                                WalletConnectViewProps={{
                                    className: `custom-font-size-14 font-700 connectBtn ${isConnected ? 'bg_purple' : 'bg_white'}`,
                                    variant: "whiteLabeled"
                                }}
                            />
                        </div>
                    }
                </div>
            </div>

        </>
    )
}
export default SeedRoundCard;







function titleRound(titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any): any {
    throw new Error('Function not implemented.');
}
function vestingDateEpoch(titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any): any {
    throw new Error('Function not implemented.');
}

function tokenAddress(titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: (titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any): any {
    throw new Error('Function not implemented.');
}

function cliffPeriodEpoch(titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: (titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, tokenAddress: (titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: (titleRound: (titleRound: any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, vestingDateEpoch: any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, tokenAddress: any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any) => any, cliffPeriodEpoch: any, cliffPercentage: any, cliffVestingDateEpoch: any, userAddresses: any, userAllocations: any, signature: any, salt: any, walletAddress: String, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolIdFromCreatePool: any, userAuthToken: any, setTransitionWalletDialog: any): any {
    throw new Error('Function not implemented.');
}

