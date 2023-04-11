import { FCard, FGrid, FGridItem, FTypo } from 'ferrum-design-system'
import React from 'react';
const DashboardCards = () => {
    return (
        <>
            <FGrid className={'f-mt-1 f-mb-2'}>
                <FGridItem size={[6, 6]}>
                    <FCard className={'user_dashboard_cards'}>
                        <FGrid>
                            <FGridItem size={[6, 6]}>
                                <FTypo size={24} weight={400} color="#DAB46E" className={"f-pb-1"}>
                                    Cliff Claimable
                                </FTypo>
                                <FTypo size={36} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                    12
                                    <FTypo size={20} weight={400} color="#FFFFFF" className={"f-pl-1 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>

                            </FGridItem>
                            <FGridItem size={[6, 6]}>
                                <FTypo size={24} weight={400} color="#DAB46E" className={"f-pb-1"}>
                                    Non Cliff Claimable
                                </FTypo>
                                <FTypo size={36} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                    12
                                    <FTypo size={20} weight={400} color="#FFFFFF" className={"f-pl-1 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                        <FGrid className={'f-mt-2'}>
                            <FGridItem size={[6, 6]}>
                                <FTypo size={24} weight={400} color="#DAB46E" className={"f-pb-1"}>
                                    Total Claimable
                                </FTypo>
                                <FTypo size={36} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                    12
                                    <FTypo size={20} weight={400} color="#FFFFFF" className={"f-pl-1 f-pb--1"}>
                                        TOKEN
                                    </FTypo>
                                </FTypo>

                            </FGridItem>
                            <FGridItem size={[6, 6]}>
                            </FGridItem>
                        </FGrid>
                        {/* <div>
                            <FTypo size={24} weight={400} color="#DAB46E" className={"f-pb-1"}>
                                Claimable
                            </FTypo>
                            <FTypo size={36} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                12
                                <FTypo size={20} weight={400} color="#FFFFFF" className={"f-pl-1 f-pb--1"}>
                                    TOKEN
                                </FTypo>
                            </FTypo>
                        </div> */}
                    </FCard>
                </FGridItem>
                <FGridItem size={[6, 6]}>
                    {/* <FCard className={'user_dashboard_cards'}>
                        <FTypo size={24} weight={400} color="#DAB46E" className={"f-pb-1"}>
                            Allocation
                        </FTypo>
                        <FTypo size={36} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            98212
                            <FTypo size={20} weight={400} color="#FFFFFF" className={"f-pl-1 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FCard> */}
                </FGridItem>
                {/* <FGridItem size={[4, 4, 4]}>
                    <FCard className={'user_dashboard_cards'}>
                        <FTypo size={24} weight={400} color="#DAB46E" className={"f-pb-1"}>
                            Total Claimed
                        </FTypo>
                        <FTypo size={36} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            1234
                            <FTypo size={20} weight={400} color="#FFFFFF" className={"f-pl-1 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FCard>
                </FGridItem> */}
            </FGrid>
        </>
    )
}
export default DashboardCards;







