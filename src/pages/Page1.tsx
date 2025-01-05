import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const { user } = useUser();
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState("Barber");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiPic, setUpiPic] = useState<File | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiId(e.target.value);
  };

  const handleUpiPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUpiPic(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!shopName || !shopType || !phoneNumber || !fullAddress || !upiId || !upiPic) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("shopName", shopName);
    formData.append("shopType", shopType);
    formData.append("phoneNumber", phoneNumber);
    formData.append("fullAddress", fullAddress);
    formData.append("upiId", upiId);
    formData.append("upiPic", upiPic);

    try {
      const response = await fetch('https://09rhn7dm-5000.inc1.devtunnels.ms/api/onboard', {
        method: 'POST',
        body: formData,
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
              type="email"
              value={upiId}
              onChange={handleUpiIdChange}
              placeholder="Enter UPI ID"
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-black mb-1">UPI Picture:</label>
            <input
              type="file"
              onChange={handleUpiPicChange}
              className="p-2 border rounded"
              accept="image/*"
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

export default Page1;



