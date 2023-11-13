import {
  FContainer,
  FGrid,
  FGridItem,
  FButton,
  FTypo,
} from "ferrum-design-system";

import toast, { Toaster } from "react-hot-toast";

const VestingForm = () => {
  const removeOrOpenSampleUrl = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1ZLEzTLY_0sQ_0uQ1hWRV7ddgrsRPtYk3y3N7cqWNKwg/edit#gid=690340236"
    );
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <FContainer type="fluid">
        <FContainer></FContainer>
      </FContainer>
    </>
  );
};

export default VestingForm;
