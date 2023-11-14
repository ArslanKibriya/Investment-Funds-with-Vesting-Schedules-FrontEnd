import React, { useEffect, useState } from "react";
import Lander from "./pages/lander";
import { Route, Switch, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as AppActions from "./redux/app-contract/appContractActions";
import { RootState } from "./redux/rootReducer";
import { setSmartContractAddress } from "../src/utils/const.utils";
import toast, { Toaster } from "react-hot-toast";
import VestingContainer from "./pages/vesting";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentRouteContractAddress: any = location.pathname.split("/").pop();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Switch>
        <Route path={`/`} component={Lander}></Route>
        {/* <Route path={`/tokenVesting`} component={VestingContainer}></Route> */}
      </Switch>
    </>
  );
}

export default App;
