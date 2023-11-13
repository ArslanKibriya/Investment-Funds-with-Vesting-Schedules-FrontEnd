import React, { useEffect, useState, useLayoutEffect } from "react";
import Dashboard from "../../pages/dashboard";
import { ApplicationUIProvider } from "../../ApplicationUiContext";
import { FadeLoader } from "react-spinners";
import { defaultApplcationContext } from "../../interfaces/ApplicationContext";
import { Route, Switch } from "react-router";
import { useLocation } from "react-router-dom";
import { FLayout, FContainer, FMain } from "ferrum-design-system";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WalletApplicationWrapper } from "foundry";
import toast, { Toaster } from "react-hot-toast";
import { AsideMenu, Header } from "../../components";
import VestingContainer from "../vesting";

const Lander = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [applicationContext, setApplicationContext] = useState(
    defaultApplcationContext
  );

  return (
    <WalletApplicationWrapper.ApplicationWrapper
      shouldInitializeCCTBProfile={false}
    >
      <>
        <ApplicationUIProvider ApplicationUIContents={applicationContext}>
          <FLayout themeBuilder={false}>
            <Toaster position="top-right" reverseOrder={false} />
            <AsideMenu />

            <FMain>
              <Header />
              <div>
                <FContainer type="fluid" className={"bg_img_chigi bg-pink"}>
                  <Switch>
                    <Route
                      exact={true}
                      path={`/`}
                      component={() => <Dashboard />}
                    />
                    <Route
                      exact={true}
                      path={`/TokenVesting`}
                      component={() => <VestingContainer />}
                    />
                  </Switch>
                </FContainer>
              </div>
            </FMain>
          </FLayout>
        </ApplicationUIProvider>
      </>
    </WalletApplicationWrapper.ApplicationWrapper>
  );
};

export default Lander;
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
