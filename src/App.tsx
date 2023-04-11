import React, { useEffect, useState } from 'react';
import Lander from "./pages/lander";
import { Route, Switch, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as AppActions from "./redux/app-contract/appContractActions";
import { RootState } from './redux/rootReducer';
import { signInUser } from './_apis/vesting'
import { setSmartContractAddress, setFerrumNetworkIdentifier } from '../src/utils/const.utils';
import toast, { Toaster } from "react-hot-toast";


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentRouteContractAddress: any = location.pathname.split("/").pop();
  const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
  const [smartContractAddressParam, setSmartContractAddressParam] = useState("");
  const [ferrumNetworkIdentifierParam, setFerrumNetworkIdentifierParam] = useState("");

  useEffect(() => {
    console.log(location.search)
    const urlParams = new URLSearchParams(location.search);
    let sParam: string = urlParams.get('smartContractAddress') ?? "";
    let iParam: string = urlParams.get('ferrumNetworkIdentifier') ?? "";
    if (!sParam) {
      toast.error('Missing smart contract address from url')
      return
    }
    if (!iParam) {
      toast.error('Missing ferrumNetworkIdentifier from url')
      return
    }
    setSmartContractAddress(sParam);
    setFerrumNetworkIdentifier(iParam);
    setSmartContractAddressParam(sParam);
    setFerrumNetworkIdentifierParam(iParam);
    console.log("smartContractAddress", sParam ?? '')
    console.log("ferrumNetworkIdentifier", iParam ?? '')
    dispatch(
      AppActions.contractAddressOfApp(currentRouteContractAddress)
    );
  })

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {smartContractAddressParam && ferrumNetworkIdentifierParam &&
        <Switch>
          <Route path={`/`} component={Lander}></Route>
        </Switch>
      }
      {/* <Switch>
          <Route path={`/`} component={Lander}></Route>
      </Switch> */}
    </>
  );
}

export default App;
