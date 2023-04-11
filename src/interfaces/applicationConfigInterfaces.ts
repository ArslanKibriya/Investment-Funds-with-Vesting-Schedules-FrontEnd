export interface APPLICATION_CONFIG_STATE {
  isConfigLoading: Boolean;
  isConfigLoaded: Boolean;
  applicationLocale: any;
}

export const defaultApplicationConfigState: APPLICATION_CONFIG_STATE = {
  isConfigLoaded: false,
  isConfigLoading: false,
  applicationLocale: undefined,
};
