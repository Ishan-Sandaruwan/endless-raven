import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../css/testimonials.css";

export default function Testimonials() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("loading testimonials");
      try {
        const res = await fetch("/api/review/get-reviews");
        const responseData = await res.json();
        if (res.ok) {
          if (Array.isArray(responseData.reviews)) {
            setData(responseData.reviews);
            setDisplayData(responseData.reviews.slice(0, 3));
          } else {
            console.error("Invalid data structure:", responseData);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjects();
  }, []);

  const viewMore = () => {
    const remainingData = data.slice(displayData.length);
    if (remainingData.length >= 1) {
      const newData = remainingData.slice(0, Math.min(remainingData.length, 3));
      setDisplayData((prevData) => [...prevData, ...newData]);
    } else {
      setShowMore(false);
    }
  };

  return (
    <div
      id="reviews"
      className="max-w-5xl w-[80%] mx-auto mb-20 lg:mb-32 lg:flex lg:gap-4 lg:justify-between "
    >
      <div className="lg:w-[30%]">
        <h2 className="heading">Hear why work makes a difference</h2>
        <p className="hidden lg:block">
          Satisfied customers have shared their genuine words about how our work has helped them to elevate 
          their businesses and solo projects. Delve into those testimonials to catch a glimpse of what our team 
          has to offer inorder to bring a drastic evolution to your businesses and projects.
        </p>
      </div>

      <div className="lg:W-[70%] ">
        <div className="flex flex-wrap items-center justify-center w-full gap-10 mt-8 md:gap-4 md:justify-between lg:justify-end ">
          {displayData.length > 0 ? (
            displayData.map((user, index) => (
              <div
                className="w-full md:w-48 lg:w-40 xl:w-52 md:h-[400px] rounded-lg shadow-md hover:shadow-red-300 bg-white p-4 md:p-1 xl:p-3 mt-10"
                key={index}
              >
                <div className="w-full h-[40%] flex flex-col gap-1 items-center justify-between -translate-y-12">
                  <img
                    src={user.img}
                    className="w-20 h-20 border-4 border-white rounded-full shadow-md shadow-slate-400 "
                  />
                  <strong className="text-sm">{user.name}</strong>
                  <span className="text-xs">{user.mail}</span>
                  <div className="flex text-red-600">
                    {Array.from({ length: user.stars }).map((_, starIndex) => (
                      <FaStar key={starIndex} />
                    ))}
                  </div>
                </div>

                <div className="h-[60%] bg-red-100 border-4 border-white rounded-lg p-2 overflow-hidden text-sm">
                  <p>{user.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div>loading</div>
          )}
        </div>
        <div className="pb-8 text-center">
          <button
            className={`view-more-button ${
              !showMore ? "cursor-not-allowed" : ""
            }`}
            onClick={viewMore}
            disabled={!showMore}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
