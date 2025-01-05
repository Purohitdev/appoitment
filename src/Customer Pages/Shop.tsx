import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Shop {
    shopName: string;
    shopType: string;
    phoneNumber: string;
    fullAddress: string;
    image: string;
    upiId: string;
}

function ShopDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const shop = location.state?.shop as Shop;

    if (!shop) {
        return (
            <div className="min-h-[100vh] w-screen bg-[#333434] text-white flex justify-center items-center">
                <p className="text-xl">No shop details available</p>
                <button
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => navigate("/")}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-[100vh] w-screen bg-[#333434] text-white p-5 flex justify-center items-center">

            <div className="min-h-[50vh] min-w-[60vw] bg-white text-black p-5 rounded-3xl">


                <h1 className="text-3xl font-bold mb-4">{shop.shopName}</h1>
                <p className="text-xl mb-2">Service: {shop.shopType}</p>
                <p className="text-xl mb-2">Phone: {shop.phoneNumber}</p>
                <p className="text-xl mb-2">Address: {shop.fullAddress}</p>
                <p className="text-xl mb-2">UPI ID: {shop.upiId}</p>
                {shop.image && (
                    <img
                        src={shop.image}
                        alt={`${shop.shopName} Image`}
                        className="mt-4 max-w-md rounded shadow"
                    />
                )}

                <button
                    className="mb-5 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                    Back
                </button>
            </div>

        </div>
    );
}

export default ShopDetails;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// interface Shop {
//   shopName: string;
//   shopType: string;
//   phoneNumber: string;
//   fullAddress: string;
//   image: string;
//   upiId: string;
// }

// interface Availability {
//   day: string;
//   openingTime: string;
//   closingTime: string;
// }

// function ShopDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const shop = location.state?.shop as Shop;
//   const availability = location.state?.availability as Availability[];

//   if (!shop) {
//     return (
//       <div className="min-h-[100vh] w-screen bg-[#333434] text-white flex justify-center items-center">
//         <p className="text-xl">No shop details available</p>
//         <button
//           className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
//           onClick={() => navigate("/")}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[100vh] w-screen bg-[#333434] text-white p-5 flex justify-center items-center">
//       <div className="min-h-[50vh] min-w-[60vw] bg-white text-black p-5 rounded-3xl">
//         <h1 className="text-3xl font-bold mb-4">{shop.shopName}</h1>
//         <p className="text-xl mb-2">Service: {shop.shopType}</p>
//         <p className="text-xl mb-2">Phone: {shop.phoneNumber}</p>
//         <p className="text-xl mb-2">Address: {shop.fullAddress}</p>
//         <p className="text-xl mb-2">UPI ID: {shop.upiId}</p>
//         {shop.image && (
//           <img
//             src={shop.image}
//             alt={`${shop.shopName} Image`}
//             className="mt-4 max-w-md rounded shadow"
//           />
//         )}

//         {/* Display Availability */}
//         <h2 className="text-2xl font-semibold mt-6">Availability</h2>
//         {availability.length > 0 ? (
//           <ul className="mt-4">
//             {availability.map((slot, index) => (
//               <li key={index} className="text-lg">
//                 {slot.day}: {slot.openingTime} - {slot.closingTime}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No availability details available</p>
//         )}

//         <button
//           className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
//           onClick={() => navigate(-1)} // Navigate back to the previous page
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ShopDetails;
