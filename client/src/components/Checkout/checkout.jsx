import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DeliveryAddress from "./deliveryAddress";
import OrderSummary from "./orderSummary";
import { useParams } from "react-router-dom";
import PaymentOption from "./paymentOption";

function CheckoutPage() {
  const [selectedItem, setSelectedItem] = useState("DELIVERY ADDRESS");
  const [arts, setArts] = useState([]);

  const user = useSelector((state) => state.user);

  const { artId } = useParams();

  const art = arts.find((art) => art._id === artId);

  useEffect(() => {
    // Fetch arts from the server
    const fetchArts = async () => {
      try {
        const response = await fetch("http://localhost:5001/art/getArts"); // Replace with your API endpoint
        const data = await response.json();
        setArts(data);
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };

    fetchArts();
  }, []);
  const handleChangeSelected = (e) => {
    console.log("Changing selected item to ORDER SUMMARY...");
    setSelectedItem(e);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mx-20">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="bg-gray-100  mb-3 shadow-md p-0 m-0">
              <DeliveryAddress
                user={user}
                selectedItem={selectedItem}
                changeSelected={handleChangeSelected}
              />
            </div>
            <div className="bg-gray-100 mb-3 shadow-md p-0 m-0">
              <OrderSummary
                user={user}
                selectedItem={selectedItem}
                changeSelected={handleChangeSelected}
                art={art}
              />
            </div>
            <div className="bg-gray-100 mb-3 shadow-md p-0 m-0">
              <PaymentOption
                selectedItem={selectedItem}
                art={art}
                user={user}
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold mb-4 ">PRICE DETAILS</div>
              <div className="border-t border-gray-200 mb-4"></div>{" "}
              {/* Line in light gray color */}
              <div className="flex justify-between mb-4">
                <div className="text-lg text-gray-600">Price</div>
                {art && (
                  <div className="text-xl text-gray-700">₹{art.price}</div>
                )}
              </div>
              <div className="flex justify-between mb-4">
                <div className="text-lg text-gray-600">Delivery Charges</div>
                <div className="relative">
                  <div className="text-lg text-gray-500 line-through">₹30</div>
                </div>
              </div>
              <div className="border-t border-dashed border-gray-200 mb-4"></div>{" "}
              {/* Dashed line */}
              <div className="flex justify-between mb-4">
                <div className="font-bold text-xl text-gray-700">
                  Total Payable
                </div>
                {art && (
                  <div className="font-bold text-2xl text-gray-800">
                    ₹{art.price}
                  </div>
                )}
              </div>
            </div>

            {/* <div className="bg-gray-200 p-4">6</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;