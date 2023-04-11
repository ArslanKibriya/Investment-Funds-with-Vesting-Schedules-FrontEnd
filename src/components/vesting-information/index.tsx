import React from "react";
import Datatable from "react-bs-datatable";
import { FCard, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { FTable } from "../ferrum-design-system/Ftable/Ftable";
import { FButton } from "../ferrum-design-system/Fbutton/Fbutton";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Pagination } from "../pagination";
import { smartContractAddress, ferrumNetworkIdentifier } from "../../utils/const.utils";
export const VestingInformation = ({ poolList, offSet, setOffSet, dataLimit }: any) => {
    const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
    const history = useHistory();
    const tableHeads: any[] = [
        { prop: "titleRound", title: "Title Round" },
        { prop: "allocation", title: "Allocation" },
        { prop: "status", title: "Status" },
        { prop: "network", title: "Network" },
        { prop: "action", title: <></> },
    ];
    var commaAllocation = new Intl.NumberFormat();
    const body = poolList && poolList.map((vesting: any, index: any) => {
        return {
            titleRound: <FTypo className={"col-amount"}>{vesting.name}</FTypo>,
            allocation: <FTypo className={"col-amount"}>{commaAllocation.format(vesting.totalAllocation)}</FTypo>,
            status: (
                <FTypo className={"col-amount"}>
                    {vesting.status === 'completed' ? 'Implemented' : 'Sign Created'}
                </FTypo>
            ),
            network: (
                <div className={'white-small-box'}>
                    <span className={'custom-font-size-14 font-400'}>{vesting.network.networkShortName}</span>
                </div >
            ),
            action: (
                <div className="col-action">
                    <FButton
                        className={'custom-font-size-16 font-400 border-radius-8'}
                        variant={`${vesting.status === "completed" ? 'whiteLabeled' : 'whiteLabeledPrimary'}`}
                        style={{ width: '201px', height: '40px' }}
                        title={`View Vesting`}
                        onClick={() => history.push({
                            pathname: `/vesting/vesting-card/${mainContractAddress}`,
                            search: `?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`,
                            state: {
                                pool: vesting
                            }
                        })} />
                </div>
            ),
        };
    });
    return (
        <>
            <FCard className="f-mt-2 padding_0" variant="whiteLabeled" >
                <FItem display={"flex"} alignX="between" alignY={"center"} className="f-m-0 f-pt-2 f-pb-1">
                    <FTypo className="card-title f-pl-1" size={24} weight={400}>Vesting</FTypo>
                    <FButton
                        className={'f-mr-2 clr_black custom-font-size-16 font-400 border-radius-8 bg_purple'}
                        title={"Add New Vesting"}
                        style={{ width: "max-content" }}
                        onClick={() => history.push({
                            pathname: `/vesting/vesting-form/${mainContractAddress}`,
                            search: `?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`,
                            state: {
                                isEditedForm: false
                            }
                        })} />
                </FItem>
                {poolList ?
                    <div style={{ paddingBottom: 30 }}>
                        <FTable variant={'whiteLabeled'} className={'f-mb-1'}>
                            <Datatable tableBody={body} tableHeaders={tableHeads} />
                        </FTable>
                        <FGrid>
                            <FGridItem size={[4, 4, 4]} >
                            </FGridItem>
                            <FGridItem size={[4, 4, 4]} >
                            </FGridItem>
                            <FGridItem size={[4, 4, 4]} alignX={'center'}>
                                <Pagination offSet={offSet} setOffSet={setOffSet} dataLimit={dataLimit} dataLength={poolList.length} isTable={true} />
                            </FGridItem>
                        </FGrid>
                    </div>
                    :
                    <div className={'d_flex justify_center align_center f-mb-2 f-mt-2'}>
                        <div className="loader-black"></div>
                    </div>
                }
            </FCard>
        </>
    );
};