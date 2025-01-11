import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Shop {
  shopName: string;
  shopType: string;
  phoneNumber: string;
  fullAddress: string;
  image: string;
  upiId: string;
}

// interface Availability {
//   day: string;
//   openingTime: string;
//   closingTime: string;
// }

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const shop = location.state?.shop as Shop;
  // const availability = location.state?.availability as Availability[];

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    selectedSlot: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.selectedSlot) {
      alert('Please fill out all fields');
      return;
    }
    alert(`Booking confirmed for ${formData.name} at ${formData.selectedSlot}`);
    navigate('/');
  };

  if (!shop) {
    return (
      <div className="min-h-[100vh] w-screen bg-[#333434] text-white flex justify-center items-center">
        <p className="text-xl">No shop details available</p>
        <button
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className='bg-[#333434] min-h-[100vh] flex justify-center items-center'>
      <div className="min-h-[60vh] min-w-[50vw] bg-[#fff] rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4">Book an Appointment at {shop.shopName}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your contact number"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Select Time Slot</label>
            {/* <select
              name="selectedSlot"
              value={formData.selectedSlot}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select a time slot</option>
              {availability.map((slot, index) => (
                <option key={index} value={`${slot.day} ${slot.openingTime} - ${slot.closingTime}`}>
                  {slot.day}: {slot.openingTime} - {slot.closingTime}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Book;
