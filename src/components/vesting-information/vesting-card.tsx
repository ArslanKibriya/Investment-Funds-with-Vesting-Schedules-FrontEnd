import React from "react";
import { FGrid, FGridItem, FTypo } from "ferrum-design-system";
const VestingCards = () => {
  var commaAllocation = new Intl.NumberFormat();
  return (
    <>
      <div>
        <div className="d-block text-title">Dashboard</div>
      </div>
      <div className="f-pt-1">
        <div className="d-flex f-pt-2 f-pb-2 dashboard-description align-items-center">
          <div className="col-1 f-pl-1">
            <img
              src="https://app.team.finance/_next/static/media/wallet-ringed.9d5742db.svg"
              alt=""
            />
          </div>
          <div className="f-pl-1">
            <div
              style={{ fontSize: "20px", fontWeight: 600, lineHeight: "24px" }}
            >
              See what's under the hood
            </div>
            <div className="f-pt--6">
              Connect your wallet to see all services and check your contracts.
            </div>
          </div>
        </div>
      </div>

      <div className={"f-mt-2 f-mb-2 f-pr-1 d-flex"}>
        <div className="col-6 f-mr-1">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">Token Vesting</div>
                <p className="f-pt-1 font-size-11">
                  Let your investors, advisors and employees get paid
                  automatically, without you having to lift a finger.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button className="text-blue-lm text-button vesting-button f-pl-2 f-pr-2 f-pt--7 f-pb--7">
                      Create Vesting
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">Liquidity Locks</div>
                <p className="f-pt-1 font-size-12">
                  Prevent rug pulls and increase community trust by locking LP
                  tokens.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button className="text-blue-lm text-button vesting-button  f-pt--7 f-pb--7">
                      Create Liquidity lock
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"f-mt-2 f-mb-2 f-pr-1 d-flex"}>
        <div className="col-6 f-mr-1">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">Team Token Locks</div>
                <p className="f-pt-1 font-size-12">
                  Improve security and build trust in your token by locking your
                  team tokens.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button
                      style={{ fontSize: "15px" }}
                      className="text-blue-lm text-button vesting-button f-pt--7 f-pb--7"
                    >
                      Create team token lock
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className={"vesting-small-cards"}>
            <div>
              <div className={"f-pb-1 f-pt-1 f-pl-1 col-9 text-black"}>
                <div className="font-size-20 ">NFT Locks</div>
                <p className="f-pt-1 font-size-12">
                  Lock your NFTs to showcase your confidence in the collection.
                </p>
                <div className="d-flex f-pt-1 align-items-center">
                  <div className="d-flex justify-content-center col-8">
                    <button className="text-blue-lm text-button vesting-button f-pl-1 f-pr-2 f-pt--7 f-pb--7">
                      Create NFT lock
                    </button>
                  </div>
                  <div className="col-4 text-blue-lm ">More Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VestingCards;
