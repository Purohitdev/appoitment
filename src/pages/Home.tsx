import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {toast,Toaster} from "react-hot-toast";

const Home = () => {
  const { user } = useUser();
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState("Barber");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");

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

  const handleSubmit = () => {
    if (!shopName || !shopType || !phoneNumber || !fullAddress) {
      toast.error("All fields are required!");
      return;
    }
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#333434]">
      <Toaster position="bottom-right" />
      <div className="h-[fit] w-[50vw] bg-[#fff] rounded-3xl border flex flex-col p-5">
        <div className="flex items-center gap-2">
          <UserButton />
          <p className="text-black">{user?.username}</p>
        </div>
        <h1 className="px-2  mt-5 text-2xl font-semibold capitalize">
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
