import React, { useState } from "react";
import ferrumFooterLogo from "../assets/img/ferrum-footer-logo.svg";
import socialIcon from "../assets/img/social-icon-1.svg";
import twitterIcon from "../assets/img/footer-twitter.svg";
import instaIcon from "../assets/img/footer-insta.svg";
import downimg from "../assets/img/DownIcon.svg";
import upimg from "../assets/img/up.png";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaQuestion,
  FaQuestionCircle,
} from "react-icons/fa";
export const FAQs = ({ faqsDialog, setFaqsDialog }: any) => {
  const [tokenVesting, setTokenVesting] = useState(false);
  const [faqsWallet, setFaqsWallet] = useState(false);
  const [faqsCost, setFaqsCost] = useState(false);
  const [investorAndemployee, setinvestorAndemployee] = useState(false);
  const [faqsFile, setFaqsFile] = useState(false);
  const [faqsRewards, setFaqsRewards] = useState(false);
  const [faqsLockup, setFaqsLockup] = useState(false);
  const [faqsTeamFinance, setFaqsTeamFinance] = useState(false);
  const [faqsVestedToken, setFaqsVestedToken] = useState(false);
  const [faqsVesting, setFaqsVesting] = useState(false);

  return (
    <>
      {!faqsDialog ? (
        <div className="col-11">
          <div className="d-flex justify-vcontent-between f-pb-1">
            <div style={{ fontSize: "1.5rem" }} className="font-700 col-2">
              FAQs
            </div>
            <div className="col-9"></div>
            <div
              onClick={() => setFaqsDialog(true)}
              className="col-1 d-flex justify-content-end cursor_pointer"
            >
              <FaArrowAltCircleRight />
            </div>
          </div>
          <div
            onClick={() => setTokenVesting(!tokenVesting)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                What is Token Vesting?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {tokenVesting ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                Token Vesting involves locking a portion of a token supply and
                gradually releasing it over a set vesting period according to a
                vesting schedule. This process builds trust and credibility
                among investors by reinforcing security measures, and ensures
                that tokens are released in a secure and controlled manner.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsWallet(!faqsWallet)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                Why do I need to connect my wallet?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {faqsWallet ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsWallet ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                Connecting your wallet avoids the need to create a username and
                password. It allows Team Finance to correctly identify the
                vesting contracts which belong to you so that you can adjust
                these in the future if needed, and also to claim your tokens.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsCost(!faqsCost)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                How much does it cost?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {faqsCost ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsCost ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                $100USD, paid in the native token of the blockchain your token
                is built on e.g. if building on Binance Smart Chain, $100USD
                worth of BNB.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setinvestorAndemployee(!investorAndemployee)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                What is the difference between an investor and employee
                contract?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {investorAndemployee ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                The main difference between the two is that the project admins
                have the ability to end vesting contracts for employees. This is
                not possible under an investor vesting contract.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsFile(!faqsFile)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                Why won't it accept my uploaded file?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsFile ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                Normally this is an issue with formatting. Please make sure to
                revise the Vesting Template Example (available for download in
                the 'add vesting details' section) and make sure you comply with
                the requirements outlined in that document.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsRewards(!faqsRewards)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                Can I vest tokens that receive rewards or dividends?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsRewards ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                No, if you vest a token that receives rewards or dividends you
                will no longer be able to receive those rewards or dividends.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsLockup(!faqsLockup)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                What is a lockup period?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsLockup ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                A lockup period, or cliff, are commonly used in company vesting
                plans. These plans are often 4 years in length, with a 1 year
                lockup/cliff, meaning that an employee or investor does not
                receive any tokens during the first year. After the first year,
                they receive their tokens normally as per the vesting cadence.
                Lockups are important because they incentivise long-term
                alignment and commitment to your company, and reduce short-term
                sell pressure.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsTeamFinance(!faqsTeamFinance)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                Can I organise a call with someone from Team Finance?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsTeamFinance ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2 line-h-s">
                Absolutely! We're happy to chat. Please contact us on Telegram.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsVestedToken(!faqsVestedToken)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                Where will I be able to see my vested tokens after deploying the
                contract?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsVestedToken ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2">
                Tokens can be withdrawn via our 'Claims' dashboard. Here
                investors and employees will also have access to a dashboard and
                the ability to buy/sell their tokens directly from the platform.
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => setFaqsVesting(!faqsVesting)}
            className="faqs-content-box "
          >
            <div className="d-flex">
              <div className="col-11 text-base font-500">
                Where can I find more information about Vesting?
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {tokenVesting ? (
                  <img src={upimg} alt="" height={16} />
                ) : (
                  <img src={downimg} alt="" height={7} />
                )}
              </div>
            </div>
            {faqsVesting ? (
              <div style={{ fontSize: "12px" }} className="f-pt--2">
                Check out our Gitbooks for more information.
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex justify-vcontent-between f-pb-1">
            <div style={{ fontSize: "1.5rem" }} className="font-700 f-pt-1">
              Haven't found your question?
            </div>
          </div>
          <div className="faqs-content-box ">
            <div className="d-flex">
              <div className="col-1">
                <img
                  src="https://app.team.finance/assets/vesting/telegramIcon.svg"
                  alt=""
                />
              </div>
              <div className="col-10 text-base font-500">
                <div>
                  <div style={{ fontSize: "1.5rem" }} className="font-700">
                    Ask in Telegram
                  </div>
                  <div style={{ fontSize: "12px" }} className="f-pt--2">
                    Response time ~5 minutes
                  </div>
                </div>
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                {"<"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={() => setFaqsDialog(false)} className="">
          <div className="col-6 f-mb-1 cursor_pointer d-flex justify-content-center align-items-center">
            <FaArrowAltCircleLeft />
          </div>
          <div className="col-6 cursor_pointer faqs-question-box d-flex justify-content-center align-items-center">
            <FaQuestionCircle className="" />
          </div>
        </div>
      )}
    </>
  );
};
