import React from "react";
import ferrumFooterLogo from "../assets/img/ferrum-footer-logo.svg";
import socialIcon from "../assets/img/social-icon-1.svg";
import twitterIcon from "../assets/img/footer-twitter.svg";
import instaIcon from "../assets/img/footer-insta.svg";

export const SelectBlockChain = () => {
  const chainmainnet = [
    {
      mainnet: {
        name: "Ethereum",
        symbol: "ETH",
        img: "https://app.team.finance/icons/wizard/ethereum.svg",
      },
      testnet: {
        name: "Goerli testnet",
        symbol: "ETH",
        img: "https://app.team.finance/icons/wizard/ethereum.svg",
      },
    },
    {
      mainnet: {
        name: "BSC",
        symbol: "BNB",
        img: "https://app.team.finance/icons/wizard/binance.svg",
      },
      testnet: {
        name: "Sepolia testnet",
        symbol: "ETH",
        img: "https://app.team.finance/icons/wizard/ethereum.svg",
      },
    },
    {
      mainnet: {
        name: "Avalanche",
        symbol: "AVAX",
        img: "https://app.team.finance/icons/wizard/avax.svg",
      },
      testnet: {
        name: "BSC testnet",
        symbol: "BNB",
        img: "https://app.team.finance/icons/wizard/binance.svg",
      },
    },
    {
      mainnet: {
        name: "Cronos",
        symbol: "CRO",
        img: "https://app.team.finance/icons/wizard/cronos.svg",
      },
      testnet: {
        name: "Cronos",
        symbol: "CRO",
        img: "https://app.team.finance/icons/wizard/cronos.svg",
      },
    },
    {
      mainnet: {
        name: "Polygon",
        symbol: "Matic",
        img: "https://app.team.finance/icons/wizard/polygon.svg",
      },
      testnet: {
        name: "Polygon",
        symbol: "Matic",
        img: "https://app.team.finance/icons/wizard/polygon.svg",
      },
    },
    {
      mainnet: {
        name: "Heco",
        symbol: "HECO",
        img: "https://app.team.finance/icons/wizard/heco.svg",
      },
    },
    {
      mainnet: {
        name: "Ethereum",
        symbol: "ETH",
        img: "https://app.team.finance/icons/wizard/ethereum.svg",
      },
    },
    {
      mainnet: {
        name: "BSC",
        symbol: "BNB",
        img: "https://app.team.finance/icons/wizard/binance.svg",
      },
    },
    {
      mainnet: {
        name: "Avalanche",
        symbol: "AVAX",
        img: "https://app.team.finance/icons/wizard/avax.svg",
      },
    },
    {
      mainnet: {
        name: "Cronos",
        symbol: "CRO",
        img: "https://app.team.finance/icons/wizard/cronos.svg",
      },
    },
    {
      mainnet: {
        name: "Polygon",
        symbol: "Matic",
        img: "https://app.team.finance/icons/wizard/polygon.svg",
      },
    },
    {
      mainnet: {
        name: "Heco",
        symbol: "HECO",
        img: "https://app.team.finance/icons/wizard/heco.svg",
      },
    },
  ];
  const chaintestnet = [
    {
      testnet: {
        name: "Goerli testnet",
        symbol: "ETH",
        img: "https://app.team.finance/icons/wizard/ethereum.svg",
      },
    },
    {
      testnet: {
        name: "Sepolia testnet",
        symbol: "ETH",
        img: "https://app.team.finance/icons/wizard/ethereum.svg",
      },
    },
    {
      testnet: {
        name: "BSC testnet",
        symbol: "BNB",
        img: "https://app.team.finance/icons/wizard/binance.svg",
      },
    },
    {
      testnet: {
        name: "Cronos",
        symbol: "CRO",
        img: "https://app.team.finance/icons/wizard/cronos.svg",
      },
    },
    {
      testnet: {
        name: "Polygon",
        symbol: "Matic",
        img: "https://app.team.finance/icons/wizard/polygon.svg",
      },
    },
  ];
  return (
    <>
      <div
        style={{ backgroundColor: "white" }}
        className="f-mt--6 d-flex justify-content-center"
      >
        <div className="col-11">
          <div
            style={{ fontSize: "22px" }}
            className="font-700 f-pt-1 clr_black_new"
          >
            Select blockchain
          </div>
          <div style={{ color: "black", fontSize: "16px" }} className="f-pt-1">
            Choose the blockchain that your token is built on.
          </div>
          <div
            style={{ fontSize: "20px" }}
            className="font-700 f-pt-1 clr_black_new"
          >
            Mainnet
          </div>
          <div className="grid f-pt-1 f-pb-2  ">
            {chainmainnet.map(
              (
                item: {
                  mainnet: any;
                },
                index: any
              ) => {
                return (
                  <>
                    <label className="d-flex align-items-center clr_black_new bg_gray_new f-pl--2 f-pb--6 f-pt--6 ">
                      <div className="col-2">
                        <img src={item.mainnet.img} alt="" height={16} />
                      </div>
                      <div className="col-8 ">
                        <div
                          style={{ fontSize: "18px" }}
                          className="font-500 clr_black_new"
                        >
                          {item.mainnet.name}
                        </div>
                        <div
                          style={{ fontSize: "16px" }}
                          className="font-500 clr_gray_new f-pt--3"
                        >
                          {item.mainnet.symbol}
                        </div>
                      </div>
                      <div className="col-2">
                        <input type="radio" value="option1" />
                      </div>
                    </label>
                  </>
                );
              }
            )}
          </div>
          <div style={{ fontSize: "20px" }} className="font-700 clr_black_new">
            Testnets
          </div>
          <div className="grid f-pt-1 f-pb-2  ">
            {chaintestnet.map(
              (
                item: {
                  testnet: any;
                },
                index: any
              ) => {
                return (
                  <>
                    <label className="d-flex align-items-center clr_black_new bg_gray_new f-pl--2 f-pb--6 f-pt--6 ">
                      <div className="col-2">
                        <img src={item.testnet.img} alt="" height={16} />
                      </div>
                      <div className="col-8 ">
                        <div
                          style={{ fontSize: "18px" }}
                          className="font-500 clr_black_new"
                        >
                          {item.testnet.name}
                        </div>
                        <div
                          style={{ fontSize: "16px" }}
                          className="font-500 clr_gray_new f-pt--3"
                        >
                          {item.testnet.symbol}
                        </div>
                      </div>
                      <div className="col-2">
                        <input type="radio" value="option1" />
                      </div>
                    </label>
                  </>
                );
              }
            )}
          </div>
          <div className="f-pb-1 ">
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
