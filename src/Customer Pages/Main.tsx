// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
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
//   const { user } = useUser();
//   const userId = user?.id;

//   useEffect(() => {
 

//     const fetchData = async () => {
    
//       if (!userId) {
//         console.error("User ID is not available");
//         setLoading(false);
//         return;
//       }
    
//       try {
//         const [shopResponse, availabilityResponse] = await Promise.all([
//           fetch("https://09rhn7dm-5000.inc1.devtunnels.ms/api/onboard"),
//           fetch(`https://09rhn7dm-5000.inc1.devtunnels.ms/api/availability/${userId}`),
//         ]);
    
//         if (shopResponse.ok && availabilityResponse.ok) {
//           const shopData: Shop[] = await shopResponse.json();
//           const availabilityData: Availability[] = await availabilityResponse.json();
    
//           setShops(shopData);
//           setAvailability(availabilityData);
//         } else {
//           const shopError = await shopResponse.text();
//           const availabilityError = await availabilityResponse.text();
//           console.error("Failed to fetch data:", { shopError, availabilityError });
//           alert("Failed to fetch data. Please try again later.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("An error occurred while fetching data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCardClick = (shop: Shop) => {
//     const shopAvailability = availability.filter(
//       (slot) => slot.shopName === shop.shopName
//     );

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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
interface Shop {
  shopName: string;
  shopType: string;
  phoneNumber: string;
  fullAddress: string;
  image: string;
  upiId: string;
}

interface Availability {
  shopName: string;
  day: string;
  openingTime: string;
  closingTime: string;
}

function Main() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
 

    const fetchData = async () => {
    
      if (!userId) {  
        console.error("User ID is not available");
        setLoading(false);
        return;
      }
    
      try {
        const [shopResponse,] = await Promise.all([
          fetch("https://server-ello.onrender.com/api/onboard"),
          // fetch(`https://09rhn7dm-5000.inc1.devtunnels.ms/api/availability/${userId}`),
        ]);
    
        if (shopResponse.ok ) {
          const shopData: Shop[] = await shopResponse.json();
          // const availabilityData: Availability[] = await availabilityResponse.json();
    
          setShops(shopData);
          // setAvailability(availabilityData);
        } else {
          const shopError = await shopResponse.text();
          // const availabilityError = await availabilityResponse.text();
          console.error("Failed to fetch data:", { shopError});
          alert("Failed to fetch data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (shop: Shop) => {
    const shopAvailability = availability.filter(
      (slot) => slot.shopName === shop.shopName
    );

    navigate(`/shop/${shop.shopName}`, {
      state: { shop, availability: shopAvailability },
    });
  };

  return (
    <div className="min-h-[100vh] w-screen bg-[#333434] text-white p-5">
      <h1 className="text-2xl font-bold mb-4">All Services Available</h1>

      {loading ? (
        <p>Loading services...</p>
      ) : (
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
            <p>No services available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;

