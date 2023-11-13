import React from "react";
import dashboardIcon from "../assets/img/dashboard_white.svg";
import vestingIcon from "../assets/img/vesting_white.svg";
import { FSider } from "./ferrum-design-system/Fsider/Fsider";
import { FSiderItem } from "./ferrum-design-system/Fsider/FsiderItem/FsiderItem";
import ferrumlogo from "../assets/img/ferrum-logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { smartContractAddress } from "../utils/const.utils";
export const AsideMenu = () => {
  const mainContractAddress = useSelector(
    (state: RootState) => state.mainAppContract.mainContract
  );
  return (
    <FSider variant={"whiteLabeled"}>
      <div className="f-mt-3 sider">
        <div className="sider-dashboard">
          <FSiderItem
            to={`/dashboard`}
            title="Dashboard"
            prefix={<img src={dashboardIcon} alt={dashboardIcon} />}
            variant={"whiteLabeled"}
          />
        </div>
        <FSiderItem
          to={`/`}
          title="Token vesting"
          prefix={<img src={vestingIcon} alt={vestingIcon} />}
          variant={"whiteLabeled"}
        />
      </div>
      {/* <FSiderItem to={''} title="Setting" prefix={<img src={settingIcon} />} variant={'whiteLabeled'} />
      <FSiderItem to={''} title="Support" prefix={<img src={supportIcon} />} variant={'whiteLabeled'} />
      <FSiderItem to={''} title="Logout" prefix={<img src={logoutIcon} />} variant={'whiteLabeled'} /> */}
    </FSider>
  );
};
