import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./progressBar.css"; // Import your CSS file for styles

function App() {
  const [progressedDays, setProgressedDays] = useState(0);
  const progressPercent = Math.ceil((progressedDays / 21) * 100);
  const [width, setWidth] = useState(0);

  const handleIncrement = () => {
    if (progressedDays < 21) {
      const newDays = progressedDays + 1;
      setProgressedDays(newDays);
      localStorage.setItem("progressedDays", newDays);
    }
  };

  const handleDecrement = () => {
    if (progressedDays > 0) {
      const newDays = progressedDays - 1;
      setProgressedDays(newDays);
      localStorage.setItem("progressedDays", newDays);
    }
  };
  useEffect(() => {
    localStorage.getItem("progressedDays") &&
      setProgressedDays(Number(localStorage.getItem("progressedDays")));
  }, []);

  useEffect(() => {
    // Delay the width update to the next tick
    const timeout = setTimeout(() => {
      setWidth(progressPercent);
    }, 10); // 10ms ensures layout completes first

    return () => clearTimeout(timeout);
  }, [progressPercent]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-slate-800 px-4">
      {/* Head and day count */}
      <div className="mb-2 flex w-full max-w-[700px] items-center justify-between sm:w-3/5">
        {/* Head */}
        <h1 className="text-left text-xl font-bold text-gray-300">
          21-Day Streak
        </h1>
        {/* Day container */}
        <div className="mr-[71px] flex items-center gap-1 text-xl">
          <button onClick={handleDecrement} disabled={progressedDays <= 0}>
            <IoIosArrowBack
              className={`scale-120 text-xl text-white hover:cursor-pointer ${progressedDays <= 0 ? "opacity-60" : 0}`}
            />
          </button>
          <p className="min-w-[34px] text-center text-gray-300">
            {progressedDays}
          </p>
          <button onClick={handleIncrement} disabled={progressedDays >= 21}>
            <IoIosArrowForward
              className={`scale-120 text-xl text-white hover:cursor-pointer ${progressedDays >= 21 ? "opacity-60" : 0}`}
            />
          </button>
        </div>
      </div>
      {/* Progress bar container */}
      <div className="flex w-full max-w-[700px] items-center justify-between gap-4 sm:w-3/5">
        <div className="h-10 w-full border-3 border-teal-400 p-1">
          <div className="progress-bar" style={{ width: `${width}%` }}></div>
        </div>
        <p className="min-w-[55px] text-center text-xl font-medium tracking-wide text-emerald-400">
          {progressPercent}%
        </p>
      </div>
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform flex-col items-center">
        <img
          src="https://count.getloli.com/@hitCounter?name=hitCounter&theme=sketch-1&padding=16&offset=0&align=top&scale=1&pixelated=1&darkmode=auto"
          alt="Hit Counter"
        />
      </div>
    </div>
  );
}

export default App;

//<div className="flex h-screen items-center justify-center bg-gray-100">
//   <div className="w-1/2 rounded-lg bg-white p-6 shadow-md">
//     <h1 className="mb-4 text-2xl font-bold">Progress Bar Animation</h1>
//     <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-200">
//       <div
//         className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-in-out"
//         style={{ width: "70%" }}
//       ></div>
//     </div>
//   </div>
// </div>
