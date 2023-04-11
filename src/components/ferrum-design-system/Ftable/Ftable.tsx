import React, { useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../assets/_Ftable-styles.scss";

interface FTableProps {
  className?: String;
  children?: any;
  variant?: string;
  onScroll?: UIEvent;
}
export const FTable = ({ className = "", variant = "primary", children = undefined }: FTableProps) => {
  const [headerFixed, setHeaderFixed] = useState<boolean>(false);
  const scrollRef = useRef(null);
  return (
    <>
      {children && (
        <div className={`f-table-wrapper ${variant.includes("futuristic") && "f-table-futuristic-wrapper"} ${variant === 'whiteLabeled' && 'f-table-whiteLabeled-wrapper'}`}>
          <PerfectScrollbar onScroll={(e: any) => (e.target.scrollTop > 50 ? setHeaderFixed(true) : setHeaderFixed(false))}>
            <div className={`f-table f-table-${variant} ${headerFixed && !variant.includes("futuristic") ? "sticky-header" : ""} ${className}`}>
              <div ref={scrollRef}></div>
              {children}
            </div>
          </PerfectScrollbar>
        </div>
      )}
    </>
  );
};
