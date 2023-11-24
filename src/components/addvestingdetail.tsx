import React from "react";
import dashboardIcon from "../assets/img/dashboard_white.svg";
import vestingIcon from "../assets/img/vesting_white.svg";
import { FSider } from "./ferrum-design-system/Fsider/Fsider";
import { FSiderItem } from "./ferrum-design-system/Fsider/FsiderItem/FsiderItem";
import ferrumlogo from "../assets/img/ferrum-logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { smartContractAddress } from "../utils/const.utils";
import downimg from "../assets/img/down-arrow.png";
export const AddVestingDetail = () => {
  const mainContractAddress = useSelector(
    (state: RootState) => state.mainAppContract.mainContract
  );
  return (
    <>
      <div
        style={{ backgroundColor: "white" }}
        className="f-mt--6 d-flex justify-content-center"
      >
        <div className="col-11">
          <div
            style={{ color: "black", fontSize: "22px" }}
            className="font-700 col-11 f-pt-1"
          >
            Add vesting details
          </div>
          <div
            style={{ color: "black", fontSize: "15px", lineHeight: "20px" }}
            className="f-pt-1"
          >
            Unsure how to upload a file? Feel free to contact us on{" "}
            <a style={{ color: "blue", fontSize: "18px" }}>Telegram</a> to learn
            how.
          </div>
          <div className="f-pt-1 f-mt-1 bg_gray_new">
            <label className="d-flex align-items-center clr_black_new  f-pl--2 f-pb-1  ">
              <div className="col-1 d-flex justify-content-center">
                <input type="radio" value="option1" />
              </div>
              <div className="col-10 ">
                <div
                  style={{ fontSize: "18px" }}
                  className="font-500 clr_black_new"
                >
                  Create new vesting plan
                </div>
              </div>

              <div className="col-1 d-flex justify-content-center">
                <img src={downimg} alt="" />
              </div>
            </label>
            {/* <div className="f-pt-1 f-pb-1 f-pl-1">
              <button className="wallet-button  f-pt--5 f-pb--5">
                <div
                  style={{ color: "white", fontSize: "16px" }}
                  className="font-700 cursor_pointer"
                >
                  Add address
                </div>
              </button>
            </div> */}
          </div>
          <div className="f-pt-1">
            <label className="d-flex align-items-center clr_black_new bg_gray_new f-pl--2 f-pb-1 f-pt-1 ">
              <div className="col-1 d-flex justify-content-center">
                <input type="radio" value="option1" />
              </div>
              <div className="col-10 d-flex align-items-center ">
                <div
                  style={{ fontSize: "16px" }}
                  className="font-500 col-7 clr_black_new"
                >
                  Upload via Google Drive
                </div>
                <div className="col-5 d-flex justify-content-center">
                  <div
                    style={{
                      backgroundColor: "rgb(250 204 21)",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                    }}
                    className="f-pt--4 f-pb--4 f-pl--2 f-pr--2"
                  >
                    verification pending
                  </div>
                </div>
              </div>

              <div className="col-1 d-flex justify-content-center">
                <img src={downimg} alt="" />
              </div>
            </label>
          </div>
          <div className="f-pt-1">
            <label className="d-flex align-items-center clr_black_new bg_gray_new f-pl--2 f-pb-1 f-pt-1 ">
              <div className="col-1 d-flex justify-content-center">
                <input type="radio" value="option1" />
              </div>
              <div className="col-10 ">
                <div
                  style={{ fontSize: "18px" }}
                  className="font-500 clr_black_new"
                >
                  Upload file (CSV or Excel)
                </div>
              </div>

              <div className="col-1 d-flex justify-content-center">
                <img src={downimg} alt="" />
              </div>
            </label>
          </div>
          <div className="f-pt-2 f-pb-1 ">
            <button className="wallet-button  f-pt--5 f-pb--5">
              <div
                style={{ color: "white", fontSize: "16px" }}
                className="font-700 cursor_pointer"
              >
                Continue
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
