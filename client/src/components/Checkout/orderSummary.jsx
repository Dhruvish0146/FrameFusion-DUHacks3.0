import React from "react"

import OrderSummarySelected from "./orderSummarySelected";

const OrderSummary = ({ user, selectedItem, changeSelected, art }) => {
  return (
    <>
      {selectedItem === "ORDER SUMMARY" && (
        <OrderSummarySelected
          art={art}
          changeSelected={changeSelected}
        />
      )}

      {selectedItem !== "ORDER SUMMARY" && selectedItem === "DELIVERY ADDRESS" && (
        <>
          <div className="flex justify-between">
            <div className="ml-4 p-2">
              <div className="font-bold text-xl text-gray-500">
                <div className="flex items-center">
                  ORDER SUMMARY
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedItem !== "ORDER SUMMARY" && selectedItem !== "DELIVERY ADDRESS" &&(
        <>
          <div className="flex justify-between">
            <div className="ml-4 p-2">
              <div className="font-bold text-xl text-gray-500">
                <div className="flex items-center">
                  ORDER SUMMARY
                  <svg
                    height="20" // Increased height
                    width="20" // Increased width
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-6 w-6 text-blue-500" // Adjusted size with h-6 and w-6 classes
                  >
                    <path
                      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      stroke="#2974f0"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSummary;
