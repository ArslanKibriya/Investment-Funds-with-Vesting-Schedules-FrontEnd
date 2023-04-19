import { FButton, FCard, FGrid, FGridItem, FItem, FTypo } from 'ferrum-design-system'
import { WalletConnector } from 'foundry';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { Web3Helper } from '../../../web3-client-container/web3Helper';
import { ConnectWalletDialog } from '../../connect-wallet/ConnectWalletDialog';
import toast, { Toaster } from "react-hot-toast";
interface Props {
    isConnected: any;
    pool: any;
    claimVestingToken: any;
   
}
const Seed= ({ isConnected, pool, claimVestingToken}: Props) => {

    const { networkClient } = useSelector((state: RootState) => state.walletConnector);
    const walletAddress  =
    useSelector((state: RootState) => state.mainAppContract.accountWalletAddress);
    var poolObject = { 'pool': pool, 'cliffClaimable': 0, 'nonCliffClaimable': 0, 'vestingClaimable': 0, 'cliffAllocation': 0, 'nonCliffAllocation': 0, 'vestingAllocation': 0, 'cliffClaimed': 0, 'nonCliffClaimed': 0, 'vestingClaimed': 0, 'totalClaimed': 0, 'totalAllocation': 0, 'totalClaimable': 0 }
    const [poolDataLoaded, setPoolDataLoaded] = useState<any>(pool);
    

    useEffect(() => {
        contractAddressMethods(pool);
    }, [])

    function WeiToEther(wei: any) {
        var Web3 = require('web3');
        return Web3.utils.fromWei(String(wei), 'ether');

    }

    async function contractAddressMethods(pool: any) {
        if (networkClient && pool) {
            const web3Helper = new Web3Helper(networkClient as any);
            if (pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp) {
                let cliffClaimableResponse;
                cliffClaimableResponse = await web3Helper.cliffClaimable(pool.poolId, walletAddress);
                if (!!cliffClaimableResponse) {
                    console.log('cliffClaimableResponse', cliffClaimableResponse)
                    poolObject.cliffClaimable = cliffClaimableResponse[0] ? WeiToEther(cliffClaimableResponse[0]) : 0;
                }
                let nonCliffClaimableResponse;
                nonCliffClaimableResponse = await web3Helper.nonCliffClaimable(pool.poolId, walletAddress);
                if (!!nonCliffClaimableResponse) {
                    console.log('nonCliffClaimableResponse', nonCliffClaimableResponse)
                    poolObject.nonCliffClaimable = nonCliffClaimableResponse[0] ? WeiToEther(nonCliffClaimableResponse[0]) : 0;
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
                }
            } else {
                //for simple vesting
                let simpleClaimableResponse;
                simpleClaimableResponse = await web3Helper.simpleClaimable(pool.poolId, walletAddress);
                if (!!simpleClaimableResponse) {
                    poolObject.vestingClaimable = simpleClaimableResponse[0] ? WeiToEther(simpleClaimableResponse[0]) : 0;
                    poolObject.totalClaimable = simpleClaimableResponse[0] ? WeiToEther(simpleClaimableResponse[0]) : 0;
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
            <div className={'ml_0 vesting-option-card'}>
                <FTypo size={25} weight={400} color="#DAB46E" className={"f-pb-1"}>
                    {pool.name}
                </FTypo>
                
                    
                
                {/* <FGrid className={'f-mt--3'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Cliff Allocation
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.cliffAllocation).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Non Cliff Allocation
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.nonCliffAllocation).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid> */}
                <FGrid className={'f-mt-2'}>
                    {/* <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            vesting Allocation
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.vestingAllocation).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem> */}
                    
                      
                    
                    <FGridItem size={[6, 6, 6]} alignX="left">
                      
                        <><FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                                Total Allocation
                            </FTypo><FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                    {Number(poolDataLoaded.totalAllocation).toFixed(3)}
                                    <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo></>
                        
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Total Claimable
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.totalClaimable).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid>
                {/* <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Cliff Claimable
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.cliffClaimable).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Non Cliff Claimable
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.nonCliffClaimable).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid> */}
                {/* <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Vesting Claimable
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.vestingClaimable).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Total Claimable
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.totalClaimable).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid> */}

                {/* <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Cliff Claimed
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.cliffClaimed).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Non Cliff Claimaed
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.nonCliffClaimed).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid> */}
                <FGrid className={'f-mt-2'}>
                    {/* <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Vesting Claimed
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.vestingClaimed).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem> */}
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--2"}>
                            Total Claimed
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            {Number(poolDataLoaded.totalClaimed).toFixed(3)}
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--8"}>
                            Network
                        </FTypo>
                        <div className={'white-small-box'}>
                            <span className={'custom-font-size-14 font-400'}>{pool.network.networkShortName}</span>
                        </div >
                    </FGridItem>
                </FGrid>
                {/* <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--8"}>
                            Networks
                        </FTypo>
                        <div className={'white-small-box'}>
                            <span className={'custom-font-size-14 font-400'}>{pool.network.networkShortName}</span>
                        </div >
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#DAB46E" className={"f-pb--8"}>
                            Networks
                        </FTypo>
                        <div className={'white-small-box'}>
                            <span className={'custom-font-size-14 font-400'}>{pool.network.networkShortName}</span>
                        </div >
                    </FGridItem>

                </FGrid> */}
                <div>
                    <FTypo size={20} weight={400} color="#DAB46E" className={"f-mt-2"}>
                        Vesting
                    </FTypo>
                    <FTypo size={16} weight={400} color="white" className={"f-mt--8"}>
                        10% at TGE, 1 month cliff + 7 months linear
                    </FTypo>
                    {/* <FTypo size={16} weight={400} color="white" className={"f-mt--8"}>
                        {pool.description}
                    </FTypo> */}
                </div>
                <div className={`d_flex align_center f-mt-1 w-100`}>
                    {isConnected ?
                        <FGrid className={'pl_0 pr_0 w-100'}>
                            {/* <FGridItem size={[4, 4, 4]}>
                                {poolDataLoaded &&
                                <FButton
                                    className={`custom-font-size-14 font-700 border-radius-8 connectBtn bg_claim seed-round-btn-width`}
                                    onClick={() => {
                                        if (Number(poolDataLoaded.cliffClaimable) !== 0) {
                                            claimCliffToken(pool.poolId);
                                        } else {
                                            toast.error('You dont have cliff claimable token.');
                                        }
                                    }}
                                    title={'Claim Cliff'}
                                />
}  
                            </FGridItem> */}
                            
                           
                             
                            <FGridItem size={[4, 4, 4]}>
                               {pool.cliffClaimableResponse&&
                                <FButton
                                    className={`custom-font-size-14 font-700 border-radius-8 connectBtn  seed-round-btn-width`}
                                    onClick={() => {
                                        if (Number(poolDataLoaded.vestingClaimable) !== 0) {
                                            claimVestingToken(pool.poolId);
                                        } else {
                                            toast.error('You dont have vesting claimable token.');
                                        }
                                    }}
                                    title={'Claim Token'}
                                />
                                }  
                            </FGridItem>
                        </FGrid>
                        :
                        <div className={`d_flex justify_end align_center w-100`}>
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
export default Seed;