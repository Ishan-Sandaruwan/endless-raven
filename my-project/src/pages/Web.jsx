import React, { useEffect, useState } from "react";

export default function Web() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects/get-all?type=web");
        const data = await res.json();
        if (res.ok) {
          setProjects(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full min-h-[70vh] bg-gradient-to-r from-fuchsia-200 via-white to-rose-100 p-12 ">
      {loading ? (
        <span className="max-w-5xl w-[80%] mx-auto">Loading</span>
      ) : (
        <div className="max-w-5xl md:w-[80%] w-[90%] mx-auto mt-12">
          <div className="flex gap-2 lg:h-[50vh] flex-col lg:flex-row">
            <div className="flex-1 flex flex-col gap-4 justify-center py-4 ">
              <h1 className="xl:text-5xl text-3xl font-semibold text-red-700 drop-shadow-md lg:pb-8 pb-2">
                {" "}
                Discover The <span className="font-bold">Web Apps</span> That We
                Are Proud Of
              </h1>
              <p className="xl:text-base text-sm md:text-left text-justify">
                asdgv aDUYIFG iuykasdgfc AIDSOUFG afoIAUSGDF oai8sdfhu
                ASDFoilausdf AIUSDFGH asoiudg ASDF iausdfh AIUSDFH asid
                ASPUI9HDFH asdiu AILSUDH
              </p>
              <div className="flex flex-wrap gap-3 text-white text-xs md:text-base">
                <p className="bg-red-600 hover:bg-red-500 cursor-pointer p-2 rounded-md ">
                  php
                </p>
                <p className="bg-orange-600 hover:bg-orange-500 cursor-pointer p-2 rounded-md ">
                  javascript
                </p>
                <p className="bg-cyan-600 hover:bg-cyan-500 cursor-pointer p-2 rounded-md ">
                  react js
                </p>
                <p className="bg-blue-600 hover:bg-blue-500 cursor-pointer p-2 rounded-md ">
                  tailwind css
                </p>
                <p className="bg-green-600 hover:bg-green-500 cursor-pointer p-2 rounded-md ">
                  springboot
                </p>
              </div>
            </div>
            <img
              src="./web3.png"
              alt=""
              className="flex-1 mx-auto w-full md:w-[80%] lg:w-full lg:h-full object-cover "
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-red-500 text-right mb-8 ">
              Latest Projects
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {projects.map((project, index) => {
                return (
                  <div
                    key={index}
                    className="relative w-full lg:w-96 flex-grow  h-60 bg-white rounded-md shadow-md p-4 cursor-pointer hover:shadow-lg"
                  >
                    <h3 className="absolute top-4 left-5 z-10 drop-shadow-xl shadow-red-700 text-xl text-white stroke-black stroke-2 font-semibold uppercase">
                      {project.name}
                    </h3>
                    <img
                      className="bg-slate-200 h-1/2 w-full object-cover mb-2 brightness-50"
                      src={project.photoUrl}
                      alt={project.name}
                    />
                    <p className="text-sm max-h-24 overflow-y-scroll ">
                      {project.description}
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.link}
                      className="absolute right-4 bottom-4 text-red-600 bg-white border-2 border-red-300 smooth hover:bg-red-600 hover:text-white p-2 text-sm rounded-md "
                    >
                      View Project
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
