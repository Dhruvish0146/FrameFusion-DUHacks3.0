import React from "react";

const OrderSummarySelected = ({ art, changeSelected }) => {

    return (
        <div>
            <div className="">
                <h3 className="text-xl font-bold mb-2 text-gray-50 bg-blue-500 py-2 px-6 ">
                    ORDER SUMMARY
                </h3>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-5">
                    <img src={art.artPath} alt={art.title} className="w-full rounded" />
                </div>
                <div className="w-full md:w-1/2 px-4 py-2 pt-5">
                    <h3 className="text-xl font-bold mb-2">{art.title}</h3>
                    <p className="mb-2">{art.description}</p>
                    <p className="text-sm font-bold mb-2 overflow-auto">Artist: {art.artistId}</p>

                </div>
            </div>
            <div className=" pb-4 flex justify-center">
                <button
                    className="bg-orange-500 shadow-lg rounded text-white font-medium py-2 px-8  overflow-auto focus:outline-none focus:shadow-outline"
                    onClick={() => changeSelected("PAYMENT OPTION")}
                >
                    CONFORM ORDER
                </button>
            </div>
        </div>
    );
};

export default OrderSummarySelected;
