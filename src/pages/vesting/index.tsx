import React, { useEffect, useState } from "react";

const TokenVesting = () => {
  return (
    <>
      <div className="d-flex f-pb--5 f-pt--5  bg-white header-vertical-line">
        <div className="col-3 d-flex justify-content-end align-items-center">
          <img
            src="https://app.team.finance/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-header.17238289.png&w=256&q=75"
            alt=""
          />
          <div className="header-line"></div>
        </div>
        <div
          style={{ color: "blue" }}
          className="col-5 d-flex  align-items-center"
        >
          <div className="col-1 d-flex justify-content-center  ">{">"}</div>
          <div className="col-4 d-flex justify-content-start font-700 ">
            Back to home page
          </div>
        </div>
      </div>
      <div className="d-flex bg-pink-header">
        <div className="col-7 f-pt-1 d-flex align-items-center justify-content-end">
          <div className="col-9 ">
            <div className="d-flex">
              <div
                style={{ color: "black", fontSize: "32px", lineHeight: "42px" }}
                className="col-7 font-700 f-pl--2"
              >
                Create vesting contract
              </div>
              <div className="col-5 d-flex align-items-center">
                <button className="text-blue-lm text-button vesting-button f-pt--7 f-pb--7">
                  <div>
                    <img
                      src="https://app.team.finance/_next/static/media/wallet-ringed.9d5742db.svg"
                      alt=""
                      height={12}
                    />
                    Save & continue later
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "blue" }} className="col-5">
          hbkn
        </div>
      </div>
    </>
  );
};

export default TokenVesting;
