import React, { useEffect, useLayoutEffect, useState } from "react";
import logo from "../assets/img/ferrum-brand-logo.png";
import "../assets/_Fsider-styles.scss";

interface FsiderProps {
  siderLogo?: string;
  showLogo?: boolean;
  FButton?: any;
  children?: any;
  variant?: any;
}

export const FSider = ({
  siderLogo = logo,
  showLogo = true,
  children = undefined,
  variant,
}: FsiderProps) => {
  const [asideToggle, setAsideToggler] = useState<boolean>(true);
  const [FsilderLayoutState, setFsilderLayoutState] = useState<boolean>(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const fLayout = document.querySelector<any>(".f-layout");
    if (FsilderLayoutState) {
      fLayout.classList.add("f-layout-expanded");
      fLayout.classList.remove("f-layout-collapsed");
    } else {
      fLayout.classList.remove("f-layout-expanded");
      fLayout.classList.add("f-layout-collapsed");
    }
  }, [FsilderLayoutState]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;

      setWindowDimensions({ width, height });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions.width < 991) {
      setAsideToggler(false);
    } else {
      setAsideToggler(true);
    }
  }, [windowDimensions]);

  return (
    <div className={`f-sider-outer ${variant && `f-sider-outer-${variant}`}`}>
      {variant && variant === "whiteLabeled" ? null : (
        <div
          className={`desktop-aside-toggler btn btn-primary ${
            asideToggle ? "open" : ""
          }`}
          onClick={() => {
            setAsideToggler(!asideToggle);
            setFsilderLayoutState(!FsilderLayoutState);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <aside
        className={`f-sider f-layout-component ${
          asideToggle ? "sider-expanded" : "sider-collapsed"
        }`}
      >
        <div
          className={`f-mobile mobile-aside-toggler ${
            asideToggle ? "open" : ""
          }`}
          onClick={() => setAsideToggler(!asideToggle)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        {showLogo === true && siderLogo && (
          <>
            <div style={{ fontSize: "25px" }} className="text-blue-lm   f-pl-1">
              <img
                src="	https://app.team.finance/Blue_TF_Logotype.svg"
                alt="Logo"
              />
            </div>
            <div className="sider-bottom"></div>
          </>
        )}
        <div
          className={`f-sider-items ${variant && `f-sider-items-${variant}`}`}
        >
          {children}
        </div>
      </aside>
    </div>
  );
};
