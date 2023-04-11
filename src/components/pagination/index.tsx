import { FButton, FTypo } from "ferrum-design-system";
import React, { useState } from "react";
interface Props {
    offSet: any;
    setOffSet: any;
    dataLimit: any;
    dataLength: any;
    isTable?: any;
}
export const Pagination = ({ offSet, dataLength, dataLimit, setOffSet, isTable }: Props) => {
    // const [activeOffSet, setActiveOffSet] = useState(offSet + 1);
    return (
        <div className={'d_flex justify_end align_center f-mb-2 nextprev-m'}>
            {offSet > 0 &&
                <div className={' prev-m cursor_pointer'} onClick={() => { setOffSet(offSet - 1); }}>
                    <FTypo size={14} weight={400} color={`${isTable ? '#ffffff' : '#ffffff'}`} className={''} >
                        Prev
                    </FTypo>
                </div>
            }

            <div className={`active-page-btn f-ml-1${isTable && 'bg_white clr_black'}`}>{offSet + 1}</div>
            {dataLength === dataLimit &&
                <div className={'cursor_pointer f-ml-1'} onClick={() => { setOffSet(offSet + 1); }}>
                    <FTypo size={14} weight={400} color={`${isTable ? '#ffffff' : '#ffffff'}`} className={''} >
                        Next
                    </FTypo>
                </div>
            }
        </div>
    );
};
