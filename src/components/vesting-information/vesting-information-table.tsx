import { FGrid, FGridItem, FTypo } from 'ferrum-design-system'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { FCard } from '../ferrum-design-system/Fcard/Fcard';
import VestingCards from './vesting-card';
import moment from 'moment'
const VestingInformationTable = () => {
    const location: any = useLocation();
    const { pool } = location.state && location.state;
    console.log('pool', pool);
    var vestingTime = moment(pool.vestingTimestamp * 1000).utc().format('MMMM, DD yyyy HH:mm' + " UTC");
    var cliffPeriodTime = moment(pool.cliffPeriodTimestamp * 1000).utc().format('MMMM, DD yyyy HH:mm' + " UTC");
    var commaAllocation = new Intl.NumberFormat();
    return (
        <>
            <div className="d_flex align_center justify_end">
                <div className="bg_white d_flex justify_center implementation_box">
                    <p className={'custom-font-size-16 font-400 clr_black_new f-mt-1'}>Status: {pool.status === 'completed' ? 'Implemented' : 'Sign Created'}</p>
                </div>
            </div>
            <div className={'position_relative'} style={{ marginTop: '-30px' }}>
                <FCard variant={'whiteLabeled'}>
                    <FGrid>
                        <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                            <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                Title Round
                            </FTypo>
                            <FTypo size={18} weight={700} color="#DAA961">
                                {pool.name}
                            </FTypo>
                        </FGridItem>
                        <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                            <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                Vesting
                            </FTypo>
                            <FTypo size={18} weight={700} color="#DAA961">
                                {pool.description}
                            </FTypo>
                        </FGridItem>
                    </FGrid>
                    <FGrid>
                        <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                            <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                Allocation
                            </FTypo>
                            <FTypo size={18} weight={700} color="#DAA961">
                            {commaAllocation.format(pool.totalAllocation)}
                            </FTypo>
                        </FGridItem>
                        <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                            <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                Network
                            </FTypo>
                            <FTypo size={18} weight={700} color="#DAA961">
                                {pool.network.networkShortName}
                            </FTypo>
                        </FGridItem>
                    </FGrid>
                    <FGrid>
                        <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                            <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                           Vesting End Date & Time
                            </FTypo>
                            <FTypo size={18} weight={700} color="#DAA961">
                                {vestingTime}
                            </FTypo>
                        </FGridItem>
                        <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                            <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                Token Address
                            </FTypo>
                            <FTypo size={18} weight={700} color="#DAA961">
                                {pool.tokenContractAddress}
                            </FTypo>
                        </FGridItem>
                    </FGrid>
                    {pool.cliffPeriodTimestamp !== pool.cliffVestingTimestamp &&
                        <FGrid>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                Cliff (Lock) Period End Date & Time
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    {cliffPeriodTime}
                                </FTypo>
                            </FGridItem>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Cliff Percentage
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    {pool.cliffPercentage}
                                </FTypo>
                            </FGridItem>
                        </FGrid>

                    }
                </FCard>
            </div>
            <VestingCards totalAllocation={pool.totalAllocation} />
        </>
    )
}
export default VestingInformationTable;







