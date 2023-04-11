import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VestingInformation } from "../../components/vesting-information";
import { RootState } from "../../redux/rootReducer";
import { getAllAdminPools } from "../../_apis/vesting";

const VestingContainer = () => {
    const [poolList, setPoolList] = useState(null);
    const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
    const userAuthToken = useSelector((state: RootState) => state.mainAppContract.userToken);
    const [offSet, setOffSet] = useState(0);
    const [dataLimit, setDataLimit] = useState(10);
    useEffect(() => {
        getAllAdminPools('completed', mainContractAddress, offSet, dataLimit, userAuthToken)
            .then((response: any) => {
                setPoolList(response.data.body.pools);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    return (
        <>
            <div className="f-mt-2 f-mb-2 f-ml-2">
                <p className={' custom-font-size-18 font-700'}>Vesting</p>
            </div>
            <VestingInformation poolList={poolList} offSet={offSet} setOffSet={setOffSet} dataLimit={dataLimit} />
        </>
    );
};

export default VestingContainer;