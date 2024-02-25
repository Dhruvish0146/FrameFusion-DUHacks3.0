import React from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDetails } from "../../store";


const PaymentOptionSelected = ({ art, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePay = async () => {
        const amount = art.price + "00";
        const currency = "INR";
        const receiptId = art._id;

        const response = await fetch("http://localhost:5001/order", {
            method: "POST",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const order = await response.json();

        var options = {
            "key": "rzp_test_cpQCkptOoWacuj", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "FrameFusion", //your business name
            "description": `Transaction for ${art.title}`,
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {

                const body = { ...response };
                console.log(body);
                const validateRes = await fetch("http://localhost:5001/order/validate", {
                    method: "POST",
                    body: JSON.stringify(body), //stringify is used to convert js Object to JSON string
                    headers: { //header contain additional info about request
                        "Content-Type": "application/json" //data being sent in the body is in the JSON format
                    }
                });
                const jsonRes = await validateRes.json();
                console.log(jsonRes);

                const updateArtworkAndUserResponse = await fetch("http://localhost:5001/order/updateAfterPayment", {
                    method: "POST",
                    body: JSON.stringify({
                        art: art,
                        userId: user._id,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Parsing the JSON response
                const {updatedUser} = await updateArtworkAndUserResponse.json();
                console.log(555,updatedUser);


                if (jsonRes.msg === "success") {
                    dispatch(updateDetails(updatedUser))
                    navigate("/orders")
                }
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": user.name, //your customer's name
                "email": user.email,
                "contact": user.phoneNumber  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": user.address
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();

    }
    return (
        <>
            <div className="">
                <h3 className="text-xl font-bold mb-2 text-gray-50 bg-blue-500 py-2 px-6 ">
                    PAYMENT OPTION
                </h3>
            </div>
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handlePay}
                >
                    Pay
                </button>
            </div>

        </>
    )
};

export default PaymentOptionSelected;
