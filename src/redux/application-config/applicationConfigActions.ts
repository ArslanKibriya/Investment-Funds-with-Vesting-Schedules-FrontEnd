import { applicationConfigSlice } from "./applicationConfigSlice";
import * as requestFromServer from "../../common-client/axiosApiClient";
import { APPLICATION_LOCALE } from "../../interfaces/ApplicationContext";
const { actions } = applicationConfigSlice;

export const loadApplicationConfig = () => (dispatch: any) => {
  dispatch(actions.loadApplicationConfig());
  return requestFromServer
    .loadApplicationConfig()
    .then((response) => {
      let applicationLocale: any = {} as APPLICATION_LOCALE;
      let data = response.data.map((item: any) => {
        return {
          keyName: item.key.name,
          keyValue: item.content,
        };
      });
      data.forEach((item: any) => {
        applicationLocale[`${item.keyName}`] = item.keyValue;
      });
      dispatch(
        actions.applicationConfigLoaded({
          applicationLocale: { ...applicationLocale },
        })
      );
    })
    .catch((error) => { });
};
