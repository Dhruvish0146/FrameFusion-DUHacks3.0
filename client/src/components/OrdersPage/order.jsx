import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import ArtCard from "../ArtCart"; // Import the ArtCard component

const Orders = () => {
    const user = useSelector(state => state.user);
    const [arts, setArts] = useState([]);

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
                        <ArtCard
                            key={art._id}
                            price={art.price}
                            title={art.title}
                            artistId={art.artistId}
                            imageUrl={art.artPath}
                            isAvailable={art.isAvailable}
                            _id={art._id}
                        />
                    ))
                )}
            </Masonry>
        </div>
    );
};

export default Orders;
