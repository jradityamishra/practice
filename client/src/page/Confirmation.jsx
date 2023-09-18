import React from "react";

const Confirmation = () => {
  return (
    <div className="flex flex-col justify-center p-8">
      <div className="flex justify-center font-semibold text-3xl mt-8">
        Your vote has been recorded successfully.
      </div>
      <div className="flex justify-center my-8">
        <img
          className="h-72"
          src="https://static.vecteezy.com/system/resources/previews/023/527/506/non_2x/abstract-green-check-mark-circle-icon-sign-symbol-transparent-background-free-png.png"
          alt=""
        />
      </div>
      <div className="flex justify-center font-semibold text-3xl">
        Thank you
      </div>
    </div>
  );
};

export default Confirmation;
