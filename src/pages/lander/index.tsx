import React, { useEffect, useState, useLayoutEffect } from "react";
import Dashboard from "../../pages/dashboard";
import { ApplicationUIProvider } from "../../ApplicationUiContext";
import { FadeLoader } from "react-spinners";
import { defaultApplcationContext } from "../../interfaces/ApplicationContext";
import { Route, Switch } from "react-router";
import { useLocation } from "react-router-dom";
import { FLayout, FContainer, FMain } from "ferrum-design-system";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { WalletApplicationWrapper } from "foundry";
import toast, { Toaster } from "react-hot-toast";
import { AsideMenu, Header } from "../../components";
import { ConnectWalletDialogStart } from "../../components/start-connect-wallet/ConnectWalletDialogStart";
import { FCard } from "../../components/ferrum-design-system/Fcard/Fcard";
import VestingForm from "../../components/vesting-information/vesting-forms";
import VestingContainer from "../vesting";
import VestingInformationTable from "../../components/vesting-information/vesting-information-table";
import UserDashboard from "../dashboard/user-dashboard";
import { Footer } from "../../components/footer";
import {
  signInUser,
  getAllNetworksAllowedOnVesting,
} from "../../_apis/vesting";
import * as AppActions from "../../redux/app-contract/appContractActions";
import {
  ferrumNetworkIdentifier,
  setAllowedNetwork,
} from "../../utils/const.utils";

const Lander = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentRouteContractAddress: any = location.pathname.split("/").pop();
  const currentRoute = location.pathname;
  const [applicationContext, setApplicationContext] = useState(
    defaultApplcationContext
  );
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [myClaims, setMyClaims] = useState(false);
  const { isConnecting } = useSelector(
    (state: RootState) => state.walletConnector
  );
  const isConnected = useSelector(
    (state: RootState) => state.mainAppContract.walletIsConnected
  );
  const walletAddress = useSelector(
    (state: RootState) => state.mainAppContract.accountWalletAddress
  );
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAllowedNetwork, setIsAllowedNetwork] = useState(false);
  const [metamaskChainId, setMetamaskChainId] = useState(-1);
  const [allowedNetworkChainId, setAllowedNetworkChainId] = useState(-2);
  const [allowedNetworkName, setAllowedNetworkName] = useState("");
  const [responseCheck, setResponseCheck] = useState(false);
  const { isConfigLoading, isConfigLoaded, applicationLocale } = useSelector(
    ({ applicationConfig }: RootState) => ({
      isConfigLoaded: applicationConfig.isConfigLoaded,
      applicationLocale: applicationConfig.applicationLocale,
      isConfigLoading: applicationConfig.isConfigLoading,
    }),
    shallowEqual
  );
  const mainContractAddress = useSelector(
    (state: RootState) => state.mainAppContract.mainContract
  );

  // useLayoutEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  async function checkChainId() {
    try {
      let response = await window.ethereum.request({ method: "eth_chainId" });
      let chainId = parseInt(response, 16);
      setMetamaskChainId(chainId);
      return chainId;
    } catch (e) {
      console.log(e);
      setMetamaskChainId(-1);
      return -1;
    }
  }

  useEffect(() => {
    checkChainId();
  }, []);

  useEffect(() => {
    setResponseCheck(false);
    getAllNetworksAllowedOnVesting(ferrumNetworkIdentifier, 0, 10)
      .then((response: any) => {
        console.log("networks reponse:", response);
        if (
          response &&
          response.data &&
          response.data.body &&
          response.data.body.networks &&
          response.data.body.networks.length > 0
        ) {
          let network = response.data.body.networks[0];
          if (network && network.chainId) {
            setAllowedNetwork(network);
            setAllowedNetworkChainId(network.chainId);
            console.log("networks chainId:", network.chainId);
          }
          if (network && network.name) {
            setAllowedNetworkName(network.name);
            setResponseCheck(true);
          }
        }
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.status &&
          error.response.data.status.message
        ) {
          console.log(error.response.data.status.message);
        }
      });
  }, []);

  useEffect(() => {
    if (isConfigLoaded === true && applicationLocale !== undefined) {
      setApplicationContext({
        ...applicationContext,
        locale: applicationLocale,
        openConnectWalletDialog: () => {
          // setConnectWalletDialog(true);
        },
      });
    }
    // eslint-disable-next-line
  }, [isConfigLoaded, applicationLocale]);

  useEffect(() => {
    if (windowDimensions) {
      setApplicationContext({
        ...applicationContext,
        isMobile: windowDimensions.width <= 991,
      });
    }
    // eslint-disable-next-line
  }, [windowDimensions]);

  useEffect(() => {
    setIsSignedIn(false);
    setIsAllowedNetwork(false);
    const fetchChainId = async () => {
      let currentChainId = await checkChainId();
      console.log("here 2", currentChainId);
      if (currentChainId == allowedNetworkChainId) {
        setIsAllowedNetwork(true);
      } else if (allowedNetworkName != "") {
        toast.error(
          "It seems like that you are connected to different network, please switch to (" +
            allowedNetworkName +
            ")"
        );
      }
      if (
        location.pathname !== `/user/dashboard/${mainContractAddress}` &&
        walletAddress &&
        isConnected &&
        !isSignedIn
      ) {
        signInUser(walletAddress)
          .then((response: any) => {
            console.log(response);
            dispatch(
              AppActions.contractAddressOfApp(currentRouteContractAddress)
            );
            dispatch(AppActions.userAuthToken(response.data.body.token));
            setIsSignedIn(true);
          })
          .catch((error) => {
            if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data.status &&
              error.response.data.status.message
            ) {
              console.log(error.response.data.status.message);
              toast.error(error.response.data.status.message);
            }
          });
      }
    };
    fetchChainId();
  }, [walletAddress]);

  useEffect(() => {
    if (
      location.pathname !== `/user/dashboard/${mainContractAddress}` &&
      !isConnected &&
      isConnecting
    ) {
      // window.location.reload();
    }
  }, [isConnected]);

  return (
    <WalletApplicationWrapper.ApplicationWrapper
      shouldInitializeCCTBProfile={false}
    >
      <>
        {isConfigLoading ? (
          <div className="page-loader">
            <FadeLoader
              height={15}
              width={5}
              radius={2}
              margin={2}
              color={"#ffffff"}
            />
          </div>
        ) : isConnected &&
          currentRoute !== `/user/dashboard/${mainContractAddress}` &&
          isSignedIn &&
          isAllowedNetwork ? (
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
                        path={`/${mainContractAddress}`}
                        component={() => <Dashboard />}
                      />
                      <Route
                        exact={true}
                        path={`/dashboard/${mainContractAddress}`}
                        component={() => <Dashboard />}
                      />
                      <Route
                        exact={true}
                        path={`/vesting/${mainContractAddress}`}
                        component={() => <VestingContainer />}
                      />
                      <Route
                        exact={true}
                        path={`/vesting/vesting-form/${mainContractAddress}`}
                        component={() => <VestingForm />}
                      />
                      <Route
                        exact={true}
                        path={`/vesting/vesting-card/${mainContractAddress}`}
                        component={() => <VestingInformationTable />}
                      />
                    </Switch>
                  </FContainer>
                </div>
              </FMain>
            </FLayout>
          </ApplicationUIProvider>
        ) : currentRoute.includes("/user/dashboard/") &&
          walletAddress &&
          isConnected &&
          isAllowedNetwork ? (
          <ApplicationUIProvider ApplicationUIContents={applicationContext}>
            <Toaster position="top-right" reverseOrder={false} />
            <FMain>
              <Header myClaims={myClaims} setMyClaims={setMyClaims} />
              <div>
                <FContainer
                  type="fluid"
                  className={"bg_img_chigi bg-pink h-100 container"}
                >
                  <Switch>
                    <Route
                      exact={true}
                      path={`/user/dashboard/${mainContractAddress}`}
                      component={() => <UserDashboard myClaims={myClaims} />}
                    />
                  </Switch>
                  <Footer />
                </FContainer>
              </div>
            </FMain>
          </ApplicationUIProvider>
        ) : (
          <div className={"h-100 bg_img_chigi bg-pink"}>
            <Toaster position="top-right" reverseOrder={false} />
            <FCard
              variant="whiteLabeled"
              width={"500px"}
              className={"centered_div"}
            >
              <ConnectWalletDialogStart
                isConnecting={isConnecting}
                isConnected={isConnected}
              />
            </FCard>
          </div>
        )}
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
