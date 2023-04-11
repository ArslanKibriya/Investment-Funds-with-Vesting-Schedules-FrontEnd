import React, { createContext, useContext } from "react";
import {
  APPLICATION_CONTEXT,
  APPLICATION_LOCALE,
  defaultApplcationContext,
} from "./interfaces/ApplicationContext";

const ApplicationUIContext = createContext(defaultApplcationContext);

export function useApplicationUIContext() {
  return useContext(ApplicationUIContext);
}

export const ApplicationUIConsumer = ApplicationUIContext.Consumer;

export function ApplicationUIProvider(ApplicationUIContents: any) {
  const locale: APPLICATION_LOCALE = ApplicationUIContents.ApplicationUIContents.locale;
  const openConnectWalletDialog = ApplicationUIContents.ApplicationUIContents.openConnectWalletDialog;

  const value: APPLICATION_CONTEXT = {
    locale,
    openConnectWalletDialog,
    isMobile: ApplicationUIContents.isMobile,
  };
  return (
    <ApplicationUIContext.Provider value={value}>
      {ApplicationUIContents.children}
    </ApplicationUIContext.Provider>
  );
}
