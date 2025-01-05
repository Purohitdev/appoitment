import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Shop {
  shopName: string;
  shopType: string;
  phoneNumber: string;
  fullAddress: string;
  image: string;
  upiId: string;
}

function Main() {
  const [shops, setShops] = useState<Shop[]>([]);
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://09rhn7dm-5000.inc1.devtunnels.ms/api/onboard');
        if (response.ok) {
          const data: Shop[] = await response.json();
          setShops(data); 
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (shop: Shop) => {
    navigate(`/shop/${shop.shopName}`, { state: { shop } }); 
  };

  return (
    <div className="min-h-[100vh] w-screen bg-[#333434] text-white p-5">
      <h1 className="text-2xl font-bold mb-4">All Services Available</h1>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.length > 0 ? (
          shops.map((shop, index) => (
            <div
              key={index}
              className="border border-gray-500 p-4 rounded-md bg-[#444444] cursor-pointer hover:bg-[#555555]"
              onClick={() => handleCardClick(shop)}
            >
              <h2 className="text-xl font-semibold">{shop.shopName}</h2>
              <p>Type: {shop.shopType}</p>
              <p>Phone: {shop.phoneNumber}</p>
              <p className="truncate">Address: {shop.fullAddress}</p>
            </div>
          ))
        ) : (
          <p>Loading services...</p>
        )}
      </div>
    </div>
  );
}

export default Main;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface Shop {
//   shopName: string;
//   shopType: string;
//   phoneNumber: string;
//   fullAddress: string;
//   image: string;
//   upiId: string;
// }

// interface Availability {
//   shopName: string;
//   day: string;
//   openingTime: string;
//   closingTime: string;
// }

// function Main() {
//   const [shops, setShops] = useState<Shop[]>([]);
//   const [availability, setAvailability] = useState<Availability[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch shop data
//         const shopResponse = await fetch(
//           "https://09rhn7dm-5000.inc1.devtunnels.ms/api/onboard"
//         );
//         const availabilityResponse = await fetch(
//           "https://09rhn7dm-5000.inc1.devtunnels.ms/api/availability"
//         );

//         if (shopResponse.ok && availabilityResponse.ok) {
//           const shopData: Shop[] = await shopResponse.json();
//           const availabilityData: Availability[] = await availabilityResponse.json();

//           setShops(shopData);
//           setAvailability(availabilityData);
//         } else {
//           console.error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCardClick = (shop: Shop) => {
//     const shopAvailability = availability.filter(
//       (slot) => slot.shopName === shop.shopName
//     ); // Filter availability for the clicked shop

//     navigate(`/shop/${shop.shopName}`, {
//       state: { shop, availability: shopAvailability },
//     });
//   };

//   return (
//     <div className="min-h-[100vh] w-screen bg-[#333434] text-white p-5">
//       <h1 className="text-2xl font-bold mb-4">All Services Available</h1>

//       {loading ? (
//         <p>Loading services...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {shops.length > 0 ? (
//             shops.map((shop, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-500 p-4 rounded-md bg-[#444444] cursor-pointer hover:bg-[#555555]"
//                 onClick={() => handleCardClick(shop)}
//               >
//                 <h2 className="text-xl font-semibold">{shop.shopName}</h2>
//                 <p>Type: {shop.shopType}</p>
//                 <p>Phone: {shop.phoneNumber}</p>
//                 <p className="truncate">Address: {shop.fullAddress}</p>
//               </div>
//             ))
//           ) : (
//             <p>No services available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Main;


