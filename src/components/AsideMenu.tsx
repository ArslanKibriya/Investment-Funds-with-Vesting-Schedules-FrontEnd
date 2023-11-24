import React from "react";
import dashboardIcon from "../assets/img/dashboard_black.svg";
import vestingIcon from "../assets/img/vesting_black.svg";
import { FSider } from "./ferrum-design-system/Fsider/Fsider";
import { FSiderItem } from "./ferrum-design-system/Fsider/FsiderItem/FsiderItem";
import ferrumlogo from "../assets/img/ferrum-logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { smartContractAddress } from "../utils/const.utils";
import { FaDashcube } from "react-icons/fa";
export const AsideMenu = () => {
  const mainContractAddress = useSelector(
    (state: RootState) => state.mainAppContract.mainContract
  );
  return (
    <FSider variant={"whiteLabeled"}>
      <div className="f-mt-3 sider">
        <div className="sider-dashboard">
          <FSiderItem
            to={`/`}
            title="Dashboard"
            prefix={<img src={dashboardIcon} />}
            variant={"whiteLabeled"}
          />
        </div>
        <FSiderItem
          to={`/TokenVesting`}
          title="Token vesting"
          prefix={<img src={vestingIcon} alt={vestingIcon} />}
          variant={"whiteLabeled"}
        />
      </div>
      <FSiderItem
        to={""}
        title="Liquitity Locks"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
      <FSiderItem
        to={""}
        title="Team token locks"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
      <FSiderItem
        to={""}
        title="NFT locks"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
      <FSiderItem
        to={""}
        title="Token creation"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
      <div className="header-bottom"></div>
      <FSiderItem
        to={""}
        title="Pricing"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
      <FSiderItem
        to={""}
        title="Website"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
      <FSiderItem
        to={""}
        title="Docs"
        prefix={<img src={vestingIcon} />}
        variant={"whiteLabeled"}
      />
    </FSider>
  );
};
