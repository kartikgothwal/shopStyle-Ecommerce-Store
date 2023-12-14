import React from "react";

const PaddingGiverHoc = (OriginalComponent) => {
  function PaddingGiver(props) {
    return (
      <div className="sm:px-16 px-6 sm:py-16 py-10">
        <OriginalComponent {...props} />
      </div>
    );
  }
  return PaddingGiver;
};

export default PaddingGiverHoc;
