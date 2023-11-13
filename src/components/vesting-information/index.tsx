import React from "react";
import Datatable from "react-bs-datatable";
import { FCard, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { FTable } from "../ferrum-design-system/Ftable/Ftable";
import { FButton } from "../ferrum-design-system/Fbutton/Fbutton";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Pagination } from "../pagination";
import { smartContractAddress } from "../../utils/const.utils";
export const VestingInformation = ({
  poolList,
  offSet,
  setOffSet,
  dataLimit,
}: any) => {
  const history = useHistory();

  return (
    <>
      <div>igh.</div>
    </>
  );
};
