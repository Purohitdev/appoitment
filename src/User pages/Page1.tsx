import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate(); 
  const [shopName, setShopName] = useState<string>("");
  const [shopType, setShopType] = useState<string>("Barber");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [upiId, setUpiId] = useState<string>("");

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value);
  };

  const handleShopTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShopType(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleFullAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullAddress(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiId(e.target.value);
  };

  const handleSubmit = async () => {
    if (!shopName || !shopType || !phoneNumber || !fullAddress || !image || !upiId) {
      toast.error("All fields are required!");
      return;
    }

    const data = {
      shopName,
      shopType,
      phoneNumber,
      fullAddress,
      image: image.split(',')[1],
      upiId,
    };

    try {
      const response = await fetch('https://server-ello.onrender.com/api/onboard ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!");

        setTimeout(() => {
          navigate("/page2");
        }, 2000);
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit form");
      }
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#333434]">
      <Toaster position="bottom-right" />
      <div className="h-[fit] w-[50vw] bg-[#fff] rounded-3xl border flex flex-col p-5">
        <div className="flex items-center gap-2">
          <UserButton />
          <p className="text-black">{user?.username}</p>
        </div>
        <h1 className="px-2 mt-5 text-2xl font-semibold capitalize">
          Enter your business details
        </h1>

        <div className="flex flex-col mt-3 gap-3 p-3">
          <div className="flex flex-col w-full">
            <label className="text-black mb-1">Shop Name:</label>
            <input
              type="text"
              value={shopName}
              onChange={handleShopNameChange}
              placeholder="Enter shop name"
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-black mb-1">Shop Type:</label>
            <select
              value={shopType}
              onChange={handleShopTypeChange}
              className="p-2 border rounded"
              required
            >
              <option value="Barber">Barber</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-black mb-1">Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number"
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-black mb-1">Full Address:</label>
            <input
              type="text"
              value={fullAddress}
              onChange={handleFullAddressChange}
              placeholder="Enter full address"
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-black mb-1">UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={handleUpiIdChange}
              placeholder="Enter UPI ID"
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-black mb-1">Upi Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-black text-white rounded-sm py-2 px-4 mx-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;