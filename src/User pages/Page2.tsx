import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

type Break = {
  breakStart: string;
  breakEnd: string;
};

type Availability = {
  day: string;
  isWorking: boolean;
  shiftStart: string;
  shiftEnd: string;
  breaks: Break[];
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Page2() {
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate
  const [availability, setAvailability] = useState<Availability[]>(
    daysOfWeek.map((day) => ({
      day,
      isWorking: true,
      shiftStart: "09:00",
      shiftEnd: "18:00",
      breaks: [],
    }))
  );

  const handleToggleWorking = (index: number) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isWorking: !item.isWorking } : item
      )
    );
  };

  const handleTimeChange = (index: number, field: "shiftStart" | "shiftEnd", value: string) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddBreak = (index: number) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              breaks: [...item.breaks, { breakStart: "12:00", breakEnd: "12:30" }],
            }
          : item
      )
    );
  };

  const handleBreakTimeChange = (
    dayIndex: number,
    breakIndex: number,
    field: "breakStart" | "breakEnd",
    value: string
  ) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === dayIndex
          ? {
              ...item,
              breaks: item.breaks.map((b, j) =>
                j === breakIndex ? { ...b, [field]: value } : b
              ),
            }
          : item
      )
    );
  };

  const handleDeleteBreak = (dayIndex: number, breakIndex: number) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === dayIndex
          ? {
              ...item,
              breaks: item.breaks.filter((_, j) => j !== breakIndex),
            }
          : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://09rhn7dm-5000.inc1.devtunnels.ms/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          availability,
        }),
      });

      if (response.ok) {
        toast.success("Availability submitted successfully!");
        setTimeout(() => {
          navigate("/dashbored");
        }, 2000);



      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit availability");
      }
    } catch (error) {
      toast.error("Failed to submit availability");
    }
  };
  

  return (
    <div className="min-h-[100vh] w-[100%] flex justify-center items-center bg-[#333434] p-32">
      <Toaster position="bottom-right" />
      <div className="min-w-[60vw] min-h-[80vh] bg-white rounded-3xl border p-5">
        <div className="flex items-center gap-2 mb-4">
          <UserButton />
          <p className="text-black">{user?.username}</p>
        </div>
        <h1 className="text-2xl font-semibold mb-6">Enter your availability details</h1>

        <div className="space-y-6 ">
          {availability.map((item, index) => (
            <div key={item.day} className="flex items-center gap-4  border p-4 rounded">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isWorking}
                  onChange={() => handleToggleWorking(index)}
                />
                <span className="font-medium">{item.day}</span>
              </label>

              {item.isWorking ? (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label>Day Start:</label>
                      <input
                        type="time"
                        value={item.shiftStart}
                        onChange={(e) =>
                          handleTimeChange(index, "shiftStart", e.target.value)
                        }
                        className="p-2 border rounded"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label>Day End:</label>
                      <input
                        type="time"
                        value={item.shiftEnd}
                        onChange={(e) =>
                          handleTimeChange(index, "shiftEnd", e.target.value)
                        }
                        className="p-2 border rounded"
                      />
                    </div>
                    <button
                    onClick={() => handleAddBreak(index)}
                    className="text-blue-500 underline"
                  >
                    + Add Break
                  </button>
                  </div>

               

                  <div className="flex flex-col gap-2 mt-2">
                    {item.breaks.map((b, breakIndex) => (
                      <div key={breakIndex} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <label>Break Start:</label>
                          <input
                            type="time"
                            value={b.breakStart}
                            onChange={(e) =>
                              handleBreakTimeChange(
                                index,
                                breakIndex,
                                "breakStart",
                                e.target.value
                              )
                            }
                            className="p-2 border rounded"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label>Break End:</label>
                          <input
                            type="time"
                            value={b.breakEnd}
                            onChange={(e) =>
                              handleBreakTimeChange(
                                index,
                                breakIndex,
                                "breakEnd",
                                e.target.value
                              )
                            }
                            className="p-2 border rounded"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteBreak(index, breakIndex)}
                          className="text-red-500 ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span className="text-gray-500 italic">Day off</span>
              )}
            </div>
          ))}
        </div>

        <button
          className="mt-6 bg-black text-white py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Page2;