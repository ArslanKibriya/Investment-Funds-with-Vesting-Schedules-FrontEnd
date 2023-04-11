import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VestingInformation } from "../../components/vesting-information";
import VestingCards from "../../components/vesting-information/vesting-card";
import { RootState } from "../../redux/rootReducer";
import { getAllAdminPools, getTotalAllocationAdmin } from "../../_apis/vesting";

const Dashboard = () => {
  const [poolList, setPoolList] = useState(null);
  const [totalAllocationAdmin, setTotalAllocationAdmin] = useState(0);
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
    getTotalAllocationAdmin(mainContractAddress, userAuthToken)
      .then((response: any) => {
        setTotalAllocationAdmin(response.data.body.totalAllocation);
      })
      .catch((e) => {
        console.log(e);
      });

  }, [offSet])

  return (
    <>
      {/* <div className="f-mt-2 f-mb-3 f-ml-1">
        <p className={'custom-font-size-18 font-700 clr_black'}>Welcome to your Dashboard</p>
      </div> */}
      <VestingCards totalAllocation={totalAllocationAdmin} />
      <VestingInformation poolList={poolList} offSet={offSet} setOffSet={setOffSet} dataLimit={dataLimit} />
    </>
  );
};

export default Dashboard;
