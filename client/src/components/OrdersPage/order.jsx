import React from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";

const Orders = () => {
    const user = useSelector(state => state.user);
    const arts = useSelector(state => state.arts);

    // Filter arts to include only the ones present in user.orders
    const orderedArts = arts.filter(art => user.orders.includes(art._id));

    // Reverse the orderedArts array
    const reversedOrderedArts = [...orderedArts].reverse();

    // Define the breakpoints for the Masonry grid
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Orders</h1>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-column"
            >
                {reversedOrderedArts.length === 0 ? (
                    <p className="text-gray-600">No orders yet</p>
                ) : (
                    reversedOrderedArts.map(art => (
                        <div key={art._id} className="masonry-item bg-gray-100 rounded-md p-4">
                            <img src={art.artPath} alt={art.title} className="w-full h-auto rounded-md mb-2" />
                            <div>
                                <h2 className="text-lg font-semibold">{art.title}</h2>
                                <p className="text-gray-700">Price: ₹{art.price}</p>
                            </div>
                        </div>
                    ))
                )}
            </Masonry>
        </div>
    );
};

export default Orders;
