import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DeliveryAddress from './deliveryAddress';
import OrderSummary from './orderSummary';
import { useParams } from 'react-router-dom';
import PaymentOption from './paymentOption';

function CheckoutPage() {
    const [selectedItem, setSelectedItem] = useState("DELIVERY ADDRESS");

    const user = useSelector(state => state.user);
    const arts = useSelector(state => state.arts);
    const { artId } = useParams();

    const art = arts.find(art => art._id === artId);

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
                            <DeliveryAddress user={user} selectedItem={selectedItem} changeSelected={handleChangeSelected} />
                        </div>
                        <div className="bg-gray-100 mb-3 shadow-md p-0 m-0">
                            <OrderSummary user={user} selectedItem={selectedItem} changeSelected={handleChangeSelected} art={art} />
                        </div>
                        <div className="bg-gray-100 mb-3 shadow-md p-0 m-0">
                            <PaymentOption selectedItem={selectedItem} art={art} user={user}/>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="bg-gray-200 p-4">5</div>
                        <div className="bg-gray-200 p-4">6</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
